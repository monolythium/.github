<p align="center"><img src="https://raw.githubusercontent.com/monolythium/.github/prod/logo/monolythium/svg/Monolythium-Monolythium.svg" alt="Monolythium" width="280"></p>

<div align="center">

[![Chain registry](https://img.shields.io/badge/registry-testnet--69420-blue)](https://github.com/monolythium/chain-registry)
[![SDK](https://img.shields.io/badge/sdk-mono--core--sdk-blue)](https://github.com/monolythium/mono-core-sdk)

</div>

---

<!-- METRICS-START -->

<table align="center">
  <tr>
    <td align="center" width="160"><h2>852</h2><sub>commits this week</sub></td>
    <td align="center" width="160"><h2>2310</h2><sub>this month</sub></td>
    <td align="center" width="160"><h2>+933k −115k</h2><sub>lines, 30d</sub></td>
    <td align="center" width="160"><h2>22</h2><sub>active repos</sub></td>
  </tr>
</table>

<p align="center"><sub><b>Most active (30d)</b> · mono-core (1651) · browser-wallet (303) · monoscan (90) · lyth_mcp (42) · monolythium.com (38)<br><b>Stack</b> · Rust 67% · TypeScript 18% · JavaScript 6.6% · CSS 2.7%</sub></p>

<p align="center"><sub>Aggregates only — no commit messages, file paths, branches, hashes, or PR/issue contents. <a href="https://monolythium.com/github">Live dashboard ↗</a> · updated nightly.</sub></p>

<!-- METRICS-END -->

---

## Monolythium

Monolythium is the canonical GitHub organization for the current Monolythium
protocol, SDK, explorer, and shared infrastructure.

The active public network is `testnet-69420` with chain ID `69420`. Network
metadata, RPC endpoints, genesis hashes, and peer bootstrap data live in the
canonical [chain registry](https://github.com/monolythium/chain-registry).

Legacy v1 / Cosmos-EVM repositories that used `mono_6940-1`, `6940`, `6941`,
Monarch CLI, or the old Monoscan have been frozen under
[mono-labs-archive](https://github.com/mono-labs-archive).

---

## Canonical Repositories

| Repository | Visibility | Role |
|------------|------------|------|
| [chain-registry](https://github.com/monolythium/chain-registry) | Public | Source of truth for current network metadata, RPC endpoints, peers, and explorers. |
| [mono-core](https://github.com/monolythium/mono-core) | Private | Core node, consensus, runtime, execution, networking, and indexer workspace. |
| [mono-core-sdk](https://github.com/monolythium/mono-core-sdk) | Public | Official Rust and TypeScript SDK for current Monolythium integrations. |
| [lyth_mcp](https://github.com/monolythium/lyth_mcp) | Public | MCP server for live-chain reads, agent runbooks, and local agent wallets. |
| [monoscan](https://github.com/monolythium/monoscan) | Private | Current Monoscan explorer for `testnet-69420`. |
| [website](https://github.com/monolythium/website) | Private | Public website for Monolythium v4.1. |
| [browser-wallet](https://github.com/monolythium/browser-wallet) | Private | Browser extension wallet. |
| [desktop-wallet](https://github.com/monolythium/desktop-wallet) | Private | Desktop wallet. |
| [mobile-wallet](https://github.com/monolythium/mobile-wallet) | Private | Mobile wallet. |
| [monarch-desktop](https://github.com/monolythium/monarch-desktop) | Private | Validator and cluster operator GUI. |
| [monarch-mobile](https://github.com/monolythium/monarch-mobile) | Private | Phone companion for Monarch OS and Monarch Desktop. |
| [monarch-os-talos](https://github.com/monolythium/monarch-os-talos) | Private | Talos-based signed OS for Monolythium validators. |
| [whitepaper](https://github.com/monolythium/whitepaper) | Private | Protocol whitepaper and lightpaper drafts. |
| [designs](https://github.com/monolythium/designs) | Private | Design archive and product prototypes. |
| [monolythium-rs](https://github.com/monolythium/monolythium-rs) | Private | Legacy-compatible Rust crates; new integrations should use `mono-core-sdk`. |
| [guardian](https://github.com/monolythium/guardian) | Private | Security monitoring and repository hygiene automation. |
| [api-utils](https://github.com/monolythium/api-utils) | Private | Shared API utilities for current Monolythium services. |
| [.github](https://github.com/monolythium/.github) | Public | Organization profile, security policy, and default contribution templates. |

## Migration Queue

One current development repository remains in
[monolythium-vision](https://github.com/monolythium-vision) until they are ready
to become canonical under this organization: the Mono Labs corporate site.

When a repository graduates, the old v1 name is archived first if needed, then
the current repository is transferred here with its history intact.

---

## Network

| Network | Chain ID | Status | Source |
|---------|---------:|--------|--------|
| `testnet-69420` | `69420` | Live development testnet | [`chains/testnet-69420.toml`](https://github.com/monolythium/chain-registry/blob/master/chains/testnet-69420.toml) |

Quick registry check:

```bash
curl -s https://raw.githubusercontent.com/monolythium/chain-registry/master/chains/testnet-69420.toml
```

SDK consumers should prefer
[`@monolythium/core-sdk`](https://github.com/monolythium/mono-core-sdk) and its
registry helpers instead of hard-coding RPC endpoints.

---

## Security

Please report security issues privately through
[GitHub Security Advisories](https://github.com/monolythium/.github/security/advisories/new).
Do not open public issues for vulnerabilities.

See the [organization security policy](https://github.com/monolythium/.github/blob/prod/SECURITY.md)
for scope, reporting expectations, and safe-harbor terms.

---

## Contributing

The current protocol and application stack is still moving from research into
public implementation. Small documentation fixes and clear bug reports are
welcome. Consensus, cryptography, economic-parameter, and wire-protocol changes
need prior discussion before implementation.
