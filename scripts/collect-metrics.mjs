#!/usr/bin/env node
//
// Aggregate engineering activity across all repos in a GitHub org using
// GraphQL. Reads commits with per-commit additions/deletions, plus
// language and metadata. No commit messages, file paths, branch names,
// hashes, or PR/issue contents are read or emitted.
//
// Auth: GH_TOKEN env var. Locally, `gh auth token` can supply it.
//
// Output:
//   metrics/data.json
//   metrics/badges/*.json (shields.io endpoint format)
//
// Usage: node scripts/collect-metrics.mjs [org]

import { mkdir, writeFile } from 'node:fs/promises';
import { argv, env, exit } from 'node:process';

const ORG = argv[2] ?? 'monolythium';
const OUT_DIR = 'metrics';
const BADGE_DIR = `${OUT_DIR}/badges`;
const TOKEN = env.GH_TOKEN ?? env.GITHUB_TOKEN;
const COMMITS_PAGE_SIZE = 100;
const MAX_PAGES = 60; // up to 6000 commits per repo per 90d window

if (!TOKEN) {
  console.error('ERROR: GH_TOKEN or GITHUB_TOKEN required');
  exit(1);
}

const now = new Date();
const since90 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
const sinceISO = since90.toISOString();

const SEC_PER_DAY = 86400 * 1000;
const epochToday = Math.floor(now.getTime() / SEC_PER_DAY) * SEC_PER_DAY;
const cutoff7d = epochToday - 7 * SEC_PER_DAY;
const cutoff30d = epochToday - 30 * SEC_PER_DAY;
const cutoff90d = epochToday - 90 * SEC_PER_DAY;

async function gql(query, variables = {}) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'monolythium-metrics-collector',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`GraphQL ${res.status}: ${await res.text()}`);
  }
  const body = await res.json();
  if (body.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(body.errors)}`);
  }
  return body.data;
}

async function listRepos(org) {
  const out = [];
  let cursor = null;
  while (true) {
    const data = await gql(
      `
      query($org: String!, $cursor: String) {
        organization(login: $org) {
          repositories(first: 100, after: $cursor, orderBy: {field: PUSHED_AT, direction: DESC}) {
            pageInfo { hasNextPage endCursor }
            nodes {
              name
              visibility
              isArchived
              isFork
              isEmpty
              stargazerCount
              pushedAt
              updatedAt
              defaultBranchRef { name }
              languages(first: 30, orderBy: {field: SIZE, direction: DESC}) {
                edges { size node { name } }
              }
            }
          }
        }
      }
    `,
      { org, cursor },
    );
    const conn = data.organization.repositories;
    out.push(...conn.nodes);
    if (!conn.pageInfo.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
  }
  return out;
}

async function fetchCommits(org, repo, branch, since) {
  if (!branch) return [];
  const commits = [];
  let cursor = null;
  for (let page = 0; page < MAX_PAGES; page++) {
    const data = await gql(
      `
      query($org: String!, $repo: String!, $branch: String!, $since: GitTimestamp!, $cursor: String) {
        repository(owner: $org, name: $repo) {
          ref(qualifiedName: $branch) {
            target {
              ... on Commit {
                history(since: $since, first: ${COMMITS_PAGE_SIZE}, after: $cursor) {
                  pageInfo { hasNextPage endCursor }
                  nodes {
                    committedDate
                    additions
                    deletions
                    author { user { login } email }
                  }
                }
              }
            }
          }
        }
      }
    `,
      { org, repo, branch: `refs/heads/${branch}`, since, cursor },
    );
    const target = data.repository?.ref?.target;
    if (!target?.history) return commits;
    commits.push(...target.history.nodes);
    if (!target.history.pageInfo.hasNextPage) break;
    cursor = target.history.pageInfo.endCursor;
  }
  return commits;
}

function weekStart(date) {
  // Sunday-anchored UTC week start, returned as epoch seconds (matching
  // GitHub's /stats/commit_activity week semantics).
  const d = new Date(date);
  const day = d.getUTCDay();
  const sunday = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day),
  );
  return Math.floor(sunday.getTime() / 1000);
}

function aggregateRepo(commits) {
  let commits7 = 0;
  let commits30 = 0;
  let commits90 = 0;
  let added30 = 0;
  let removed30 = 0;
  let added90 = 0;
  let removed90 = 0;
  const authors90 = new Set();
  const authors30 = new Set();
  const weeklyMap = new Map(); // weekStartEpoch -> {commits,added,removed}

  for (const c of commits) {
    const ts = new Date(c.committedDate).getTime();
    const adds = c.additions ?? 0;
    const dels = c.deletions ?? 0;
    const login = c.author?.user?.login ?? c.author?.email ?? 'unknown';

    if (ts >= cutoff90d) {
      commits90 += 1;
      added90 += adds;
      removed90 += dels;
      authors90.add(login);
    }
    if (ts >= cutoff30d) {
      commits30 += 1;
      added30 += adds;
      removed30 += dels;
      authors30.add(login);
    }
    if (ts >= cutoff7d) {
      commits7 += 1;
    }

    const wk = weekStart(c.committedDate);
    const bucket = weeklyMap.get(wk) ?? { commits: 0, added: 0, removed: 0 };
    bucket.commits += 1;
    bucket.added += adds;
    bucket.removed += dels;
    weeklyMap.set(wk, bucket);
  }

  return {
    commits_7d: commits7,
    commits_30d: commits30,
    commits_90d: commits90,
    lines_added_30d: added30,
    lines_removed_30d: removed30,
    lines_added_90d: added90,
    lines_removed_90d: removed90,
    authors_30d: [...authors30],
    authors_90d: [...authors90],
    weekly: [...weeklyMap.entries()].map(([wk, v]) => ({ week: wk, ...v })),
  };
}

function ensureDir(dir) {
  return mkdir(dir, { recursive: true });
}

async function writeBadge(file, label, message, color) {
  const body = {
    schemaVersion: 1,
    label,
    message,
    color,
    cacheSeconds: 3600,
  };
  await writeFile(`${BADGE_DIR}/${file}`, JSON.stringify(body, null, 2) + '\n');
}

async function main() {
  await ensureDir(BADGE_DIR);

  console.error(`Listing repos under ${ORG}...`);
  const repos = await listRepos(ORG);
  console.error(`Found ${repos.length} repos.`);

  const perRepo = [];
  const aggAuthors30 = new Set();
  const aggAuthors90 = new Set();
  const aggWeekly = new Map();

  for (const r of repos) {
    if (r.isEmpty) {
      console.error(`  ${r.name} — empty, skipping`);
      continue;
    }
    const excluded = r.isFork || r.isArchived;
    const branch = r.defaultBranchRef?.name;
    process.stderr.write(`  ${r.name}${branch ? '' : ' (no branch)'}...`);

    let commits = [];
    if (branch) {
      try {
        commits = await fetchCommits(ORG, r.name, branch, sinceISO);
      } catch (e) {
        process.stderr.write(` ERR ${e.message}\n`);
        continue;
      }
    }
    const agg = aggregateRepo(commits);

    const repoEntry = {
      name: r.name,
      visibility: r.visibility.toLowerCase(),
      archived: r.isArchived,
      fork: r.isFork,
      default_branch: branch ?? null,
      pushed_at: r.pushedAt,
      stars: r.stargazerCount,
      languages: Object.fromEntries(
        r.languages.edges.map((e) => [e.node.name, e.size]),
      ),
      commits_7d: agg.commits_7d,
      commits_30d: agg.commits_30d,
      commits_90d: agg.commits_90d,
      lines_added_30d: agg.lines_added_30d,
      lines_removed_30d: agg.lines_removed_30d,
      lines_added_90d: agg.lines_added_90d,
      lines_removed_90d: agg.lines_removed_90d,
      excluded_from_totals: excluded,
    };
    perRepo.push(repoEntry);

    if (!excluded) {
      for (const a of agg.authors_30d) aggAuthors30.add(a);
      for (const a of agg.authors_90d) aggAuthors90.add(a);
      for (const w of agg.weekly) {
        const b = aggWeekly.get(w.week) ?? { commits: 0, added: 0, removed: 0 };
        b.commits += w.commits;
        b.added += w.added;
        b.removed += w.removed;
        aggWeekly.set(w.week, b);
      }
    }
    process.stderr.write(
      ` ${agg.commits_90d} commits (90d), +${agg.lines_added_90d} −${agg.lines_removed_90d}\n`,
    );
  }

  // Aggregate totals
  const active = perRepo.filter((r) => !r.excluded_from_totals);
  const totals = {
    repos: perRepo.length,
    active_repos: active.length,
    public_repos: active.filter((r) => r.visibility === 'public').length,
    private_repos: active.filter((r) => r.visibility === 'private').length,
    commits_7d: active.reduce((s, r) => s + r.commits_7d, 0),
    commits_30d: active.reduce((s, r) => s + r.commits_30d, 0),
    commits_90d: active.reduce((s, r) => s + r.commits_90d, 0),
    lines_added_30d: active.reduce((s, r) => s + r.lines_added_30d, 0),
    lines_removed_30d: active.reduce((s, r) => s + r.lines_removed_30d, 0),
    lines_added_90d: active.reduce((s, r) => s + r.lines_added_90d, 0),
    lines_removed_90d: active.reduce((s, r) => s + r.lines_removed_90d, 0),
    active_contributors_30d: aggAuthors30.size,
    active_contributors_90d: aggAuthors90.size,
  };

  // Weekly buckets (trailing 26 weeks)
  const weekly = [...aggWeekly.entries()]
    .sort((a, b) => a[0] - b[0])
    .slice(-26)
    .map(([wk, v]) => ({
      week: wk,
      week_start: new Date(wk * 1000).toISOString().slice(0, 10),
      commits: v.commits,
      added: v.added,
      removed: v.removed,
    }));

  // Languages aggregate
  const langMap = new Map();
  for (const r of active) {
    for (const [name, size] of Object.entries(r.languages)) {
      langMap.set(name, (langMap.get(name) ?? 0) + size);
    }
  }
  const langTotal = [...langMap.values()].reduce((s, v) => s + v, 0) || 1;
  const by_language = [...langMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([language, bytes]) => ({
      language,
      bytes,
      percent: Math.round((bytes / langTotal) * 1000) / 10,
    }));

  // Per-repo summary
  const by_repo = active
    .map((r) => ({
      name: r.name,
      visibility: r.visibility,
      commits_30d: r.commits_30d,
      commits_90d: r.commits_90d,
      lines_added_30d: r.lines_added_30d,
      lines_removed_30d: r.lines_removed_30d,
      pushed_at: r.pushed_at,
      stars: r.stars,
    }))
    .sort((a, b) => b.commits_30d - a.commits_30d);

  const payload = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    org: ORG,
    window_days: 90,
    notes:
      'Aggregate engineering activity. No commit messages, file paths, branch names, hashes, or PR/issue contents are exposed. Forks and archived repos excluded from totals.',
    totals,
    weekly,
    by_repo,
    by_language,
  };

  await writeFile(
    `${OUT_DIR}/data.json`,
    JSON.stringify(payload, null, 2) + '\n',
  );
  console.error(`Wrote ${OUT_DIR}/data.json`);

  await writeBadge('commits-7d.json', 'commits this week', String(totals.commits_7d), 'blue');
  await writeBadge('commits-30d.json', 'commits this month', String(totals.commits_30d), 'blue');
  await writeBadge('commits-90d.json', 'commits 90 days', String(totals.commits_90d), 'blue');
  await writeBadge(
    'loc-delta-30d.json',
    'lines (30d)',
    `+${totals.lines_added_30d} −${totals.lines_removed_30d}`,
    'brightgreen',
  );
  await writeBadge('active-repos.json', 'active repos', String(totals.active_repos), 'informational');
  console.error('Wrote badge files.');
}

main().catch((e) => {
  console.error(e);
  exit(1);
});
