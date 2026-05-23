![Monolythium](https://raw.githubusercontent.com/monolythium/.github/prod/logo/monolythium/svg/Monolythium-Monolythium.svg)

<div align="center">

[![Chain registry](https://img.shields.io/badge/registry-testnet--69420-blue)](https://github.com/monolythium/chain-registry)
[![SDK](https://img.shields.io/badge/sdk-mono--core--sdk-blue)](https://github.com/monolythium/mono-core-sdk)

</div>

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
| [mono-core-sdk](https://github.com/monolythium/mono-core-sdk) | Public | Official Rust and TypeScript SDK for current Monolythium integrations. |
| [monoscan](https://github.com/monolythium/monoscan) | Private | Current Monoscan explorer for `testnet-69420`. |
| [monolythium-rs](https://github.com/monolythium/monolythium-rs) | Private | Legacy-compatible Rust crates; new integrations should use `mono-core-sdk`. |
| [guardian](https://github.com/monolythium/guardian) | Private | Security monitoring and repository hygiene automation. |
| [api-utils](https://github.com/monolythium/api-utils) | Private | Shared API utilities for current Monolythium services. |
| [.github](https://github.com/monolythium/.github) | Public | Organization profile, security policy, and default contribution templates. |

## Migration Queue

Some current development repositories remain in
[monolythium-vision](https://github.com/monolythium-vision) until they are ready
to become canonical under this organization. That queue includes the chain node,
wallets, operator tooling, websites, docs, and whitepaper work.

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
