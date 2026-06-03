<p align="center"><img src="https://raw.githubusercontent.com/monolythium/.github/prod/logo/monolythium/svg/Monolythium-Monolythium.svg" alt="Monolythium" width="280"></p>

<div align="center">

[![Chain registry](https://img.shields.io/badge/registry-testnet--69420-blue)](https://github.com/monolythium/chain-registry)
[![SDK](https://img.shields.io/badge/sdk-mono--core--sdk-blue)](https://github.com/monolythium/mono-core-sdk)

</div>

---

<!-- METRICS-START -->

<table align="center">
  <tr>
    <td align="center" width="160"><h2>670</h2><sub>commits this week</sub></td>
    <td align="center" width="160"><h2>2669</h2><sub>this month</sub></td>
    <td align="center" width="160"><h2>+1.11M −271k</h2><sub>lines, 30d</sub></td>
    <td align="center" width="160"><h2>22</h2><sub>active repos</sub></td>
  </tr>
</table>

<p align="center"><sub><b>Most active (30d)</b> · mono-core (1203) · browser-wallet (577) · mono-core-sdk (168) · desktop-wallet (148) · monoscan (147)<br><b>Stack</b> · Rust 59.7% · TypeScript 23.8% · JavaScript 5.2% · Shell 3.7%</sub></p>

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

### Public

| Repository | Role |
|------------|------|
| [chain-registry](https://github.com/monolythium/chain-registry) | Source of truth for current network metadata, RPC endpoints, peers, and explorers. |
| [mono-core-sdk](https://github.com/monolythium/mono-core-sdk) | Official Rust and TypeScript SDK for current Monolythium integrations. |
| [mono-studio](https://github.com/monolythium/mono-studio) | Developer toolchain — `mono-dev` CLI, Studio React shell, and native-dev MCP descriptor for AI dev tools. Hosted as a sidecar tab in the Monolythium desktop wallet. |
| [lyth_mcp](https://github.com/monolythium/lyth_mcp) | MCP server for live-chain reads, agent runbooks, and local agent wallets. |
| [monoscan](https://github.com/monolythium/monoscan) | Canonical explorer for `testnet-69420`. |
| [browser-wallet](https://github.com/monolythium/browser-wallet) | MV3 browser extension (Chrome / Firefox / Brave) — PQM-1 / ML-DSA-65 keystore, EIP-1193 provider. Preview. |
| [desktop-wallet](https://github.com/monolythium/desktop-wallet) | Tauri 2 + Rust + React 19 desktop wallet — OS-keychain vault, Ledger hardware signer, Operations drawer. Preview. |
| [mobile-wallet](https://github.com/monolythium/mobile-wallet) | Tauri 2 iOS + Android wallet. Preview. |
| [monarch-desktop](https://github.com/monolythium/monarch-desktop) | Operator console for Monolythium nodes and clusters — Tauri 2 + Rust + React 19 + native Talos API mTLS client. Preview. |
| [monarch-mobile](https://github.com/monolythium/monarch-mobile) | Phone companion for Monarch OS and Monarch Desktop. Preview. |
| [monarch-os-talos](https://github.com/monolythium/monarch-os-talos) | Talos-based immutable node OS for Monolythium operator nodes — auditable source, signed-release pipeline in flight. |
| [protocore](https://github.com/monolythium/protocore) | Signed binary releases for the Monolythium protocore node. Source remains private until mainnet (BSL-1.1 commitment). |
| [mono-blog-content](https://github.com/monolythium/mono-blog-content) | Markdown source for `monolythium.com/blog` posts. |
| [.github](https://github.com/monolythium/.github) | Organization profile, security policy, and default contribution templates. |

### Private (open at mainnet)

| Repository | Role |
|------------|------|
| [mono-core](https://github.com/monolythium/mono-core) | Core node, consensus, runtime, execution, networking, and indexer workspace. Opens under BSL-1.1 at mainnet. |
| [docs](https://github.com/monolythium/docs) | Source for `docs.monolythium.com` — developer, operator, and agent documentation. |
| [monolythium.com](https://github.com/monolythium/monolythium.com) | Source for the public marketing site. |
| [whitepaper](https://github.com/monolythium/whitepaper) | Protocol whitepaper and lightpaper drafts. |
| [designs](https://github.com/monolythium/designs) | Design archive and product prototypes. |
| [guardian](https://github.com/monolythium/guardian) | Autonomous security monitoring pipeline. |
| [rpc-proxy](https://github.com/monolythium/rpc-proxy) | TLS-terminating reverse proxy for `rpc.monolythium.com`. |

---

## Network

| Network | Chain ID | Status | Source |
|---------|---------:|--------|--------|
| `testnet-69420` | `69420` | Live development testnet | [`chains/testnet-69420.toml`](https://github.com/monolythium/chain-registry/blob/master/chains/testnet-69420.toml) |
| `mainnet-69422` | `69422` | Reserved · genesis hash and launch date not announced | [`chains/mainnet-69422.toml`](https://github.com/monolythium/chain-registry/blob/master/chains/mainnet-69422.toml) |

No mainnet network is running on the reserved chain id today. Do not connect production wallets to anything claiming to be Monolythium mainnet until the registry publishes the matching `genesis_hash`.

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
