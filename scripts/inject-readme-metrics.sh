#!/usr/bin/env bash
#
# Replace the content between <!-- METRICS-START --> and <!-- METRICS-END -->
# in profile/README.md with a freshly rendered metrics block read from
# metrics/data.json.
#
# Idempotent. If the markers don't exist, exits 0 with a warning so the
# workflow doesn't fail on first deploy.

set -euo pipefail

README="profile/README.md"
DATA="metrics/data.json"
TMP=$(mktemp)

if [ ! -f "${README}" ]; then
  echo "::warning::${README} not found"
  exit 0
fi
if [ ! -f "${DATA}" ]; then
  echo "::warning::${DATA} not found — run collect-metrics.sh first"
  exit 0
fi

if ! grep -q "<!-- METRICS-START -->" "${README}"; then
  echo "::warning::No <!-- METRICS-START --> marker in ${README}; nothing to inject"
  exit 0
fi

commits_7d=$(jq -r '.totals.commits_7d' "${DATA}")
commits_30d=$(jq -r '.totals.commits_30d' "${DATA}")
commits_90d=$(jq -r '.totals.commits_90d' "${DATA}")
lines_added_30d=$(jq -r '.totals.lines_added_30d' "${DATA}")
lines_removed_30d=$(jq -r '.totals.lines_removed_30d' "${DATA}")
active_repos=$(jq -r '.totals.active_repos' "${DATA}")
generated_at=$(jq -r '.generated_at' "${DATA}")

# Top 5 most-active repos in the last 30 days.
top_repos=$(jq -r '
  [.by_repo[] | select(.commits_30d > 0)] | .[0:5] |
  map("- **\(.name)** — \(.commits_30d) commits") | join("\n")
' "${DATA}")

# Top 3 languages.
top_langs=$(jq -r '
  .by_language[0:3] |
  map("\(.language) (\(.percent)%)") | join(" · ")
' "${DATA}")

# Build the new block.
{
  echo "<!-- METRICS-START -->"
  echo ""
  echo "## Engineering activity"
  echo ""
  echo "[![commits this week](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/monolythium/.github/prod/metrics/badges/commits-7d.json)](https://github.com/monolythium)"
  echo "[![commits this month](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/monolythium/.github/prod/metrics/badges/commits-30d.json)](https://github.com/monolythium)"
  echo "[![lines 30d](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/monolythium/.github/prod/metrics/badges/loc-delta-30d.json)](https://github.com/monolythium)"
  echo "[![active repos](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/monolythium/.github/prod/metrics/badges/active-repos.json)](https://github.com/monolythium)"
  echo ""
  echo "**Trailing windows:** ${commits_7d} commits this week · ${commits_30d} this month · ${commits_90d} in the last 90 days."
  echo ""
  echo "**Code change (30d):** \`+${lines_added_30d} −${lines_removed_30d}\` across ${active_repos} active repositories."
  echo ""
  echo "**Most active (30d):**"
  echo ""
  echo "${top_repos}"
  echo ""
  echo "**Languages:** ${top_langs}"
  echo ""
  echo "_Aggregates only. No commit messages, file paths, branch names, or PR/issue contents are exposed. Updated nightly — last refresh ${generated_at}._"
  echo ""
  echo "<!-- METRICS-END -->"
} >"${TMP}"

# Replace block between markers in-place.
awk -v new_file="${TMP}" '
  BEGIN { in_block = 0 }
  /<!-- METRICS-START -->/ {
    while ((getline line < new_file) > 0) print line
    close(new_file)
    in_block = 1
    next
  }
  /<!-- METRICS-END -->/ {
    in_block = 0
    next
  }
  in_block == 0 { print }
' "${README}" >"${README}.new"

mv "${README}.new" "${README}"
rm -f "${TMP}"

echo "Injected metrics block into ${README}"
