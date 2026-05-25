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
active_repos=$(jq -r '.totals.active_repos' "${DATA}")
lines_added_30d=$(jq -r '.totals.lines_added_30d' "${DATA}")
lines_removed_30d=$(jq -r '.totals.lines_removed_30d' "${DATA}")

# Format big numbers compactly: 924065 → 924k, 1238710 → 1.24M
abbr() {
  awk -v n="$1" 'BEGIN {
    if (n >= 1000000) printf "%.2fM", n/1000000;
    else if (n >= 1000) printf "%dk", n/1000;
    else printf "%d", n;
  }'
}
added_abbr=$(abbr "${lines_added_30d}")
removed_abbr=$(abbr "${lines_removed_30d}")
commits_7d_fmt=$(printf "%'d" "${commits_7d}" 2>/dev/null || echo "${commits_7d}")
commits_30d_fmt=$(printf "%'d" "${commits_30d}" 2>/dev/null || echo "${commits_30d}")

# Top 5 most-active repos in the last 30 days, as a single dot-separated line.
top_repos=$(jq -r '
  [.by_repo[] | select(.commits_30d > 0)] | .[0:5] |
  map("\(.name) (\(.commits_30d))") | join(" · ")
' "${DATA}")

# Top 4 languages with percentages.
top_langs=$(jq -r '
  .by_language[0:4] |
  map("\(.language) \(.percent)%") | join(" · ")
' "${DATA}")

# Compact, scannable block. Big numbers in a centered 4-cell HTML table;
# repos and stack as single-line dot-separated lists; one-line disclaimer.
{
  echo "<!-- METRICS-START -->"
  echo ""
  echo "<table align=\"center\">"
  echo "  <tr>"
  echo "    <td align=\"center\" width=\"160\"><h2>${commits_7d_fmt}</h2><sub>commits this week</sub></td>"
  echo "    <td align=\"center\" width=\"160\"><h2>${commits_30d_fmt}</h2><sub>this month</sub></td>"
  echo "    <td align=\"center\" width=\"160\"><h2>+${added_abbr} −${removed_abbr}</h2><sub>lines, 30d</sub></td>"
  echo "    <td align=\"center\" width=\"160\"><h2>${active_repos}</h2><sub>active repos</sub></td>"
  echo "  </tr>"
  echo "</table>"
  echo ""
  echo "<p align=\"center\"><sub><b>Most active (30d)</b> · ${top_repos}<br><b>Stack</b> · ${top_langs}</sub></p>"
  echo ""
  echo "<p align=\"center\"><sub>Aggregates only — no commit messages, file paths, branches, hashes, or PR/issue contents. <a href=\"https://monolythium.com/github\">Live dashboard ↗</a> · updated nightly.</sub></p>"
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
