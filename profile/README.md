![Monolythium](https://raw.githubusercontent.com/mono-labs-org/.github/prod/media/github-banners/monolythium/monolythium.png)

<div align="center">

# Monolythium

**Layer 1 blockchain powered by LythiumBFT — Cosmos SDK + EVM with deterministic finality**

[![Docs](https://img.shields.io/badge/docs-docs.monolythium.com-blue)](https://docs.monolythium.com)

</div>

---

## Repositories

### Chain

| Repository | Description |
|------------|-------------|
| [mono-chain](https://github.com/monolythium/mono-chain) | LythiumBFT chain node (`monod`) |
| [mono-commander](https://github.com/monolythium/mono-commander) | TUI-first CLI for node operators (`monoctl`) |
| [networks](https://github.com/monolythium/networks) | Network configurations and genesis files |
| [validators](https://github.com/monolythium/validators) | Validator dashboard and performance tracking |
| [mono-core-peers](https://github.com/monolythium/mono-core-peers) | Peer registry for network bootstrapping |
| [mono-chain-registry](https://github.com/monolythium/mono-chain-registry) | Chain metadata registry (chain IDs, RPCs, assets) |

### Apps & Tools

| Repository | Description |
|------------|-------------|
| [browser-wallet](https://github.com/monolythium/browser-wallet) | Browser extension wallet (Chrome, Firefox, Edge) |
| [desktop-wallet](https://github.com/monolythium/desktop-wallet) | Desktop wallet (macOS, Windows, Linux) |
| [mobile-wallet](https://github.com/monolythium/mobile-wallet) | Mobile wallet (iOS, Android) |
| [monoscan](https://github.com/monolythium/monoscan) | Block explorer with EVM and Cosmos support |
| [guardian](https://github.com/monolythium/guardian) | Automated security scanner |
| [api-utils](https://github.com/monolythium/api-utils) | Shared TypeScript utilities for Monolythium apps |

---

## Networks

| Network | Chain ID | EVM Chain ID | Hex |
|---------|----------|-------------:|-----|
| Localnet | `mono-local-1` | 262145 | `0x40001` |
| Sprintnet | `mono-sprint-1` | 262146 | `0x40002` |
| Testnet | `mono_6940-1` | 6940 | `0x1B1C` |
| Mainnet | `mono_6941-1` | 6941 | `0x1B1D` |

> **Important:** All networks require the official `genesis.json`. Do not start your own chain.

---

## Node Operators

### Seed Nodes

DNS-based seed discovery is available for all public networks:

```
seed1.<network>.mononodes.xyz
seed2.<network>.mononodes.xyz
seed3.<network>.mononodes.xyz
```

Replace `<network>` with `sprintnet`, `testnet`, or `mainnet`.

### Peer Registry

The peer registry (`peers.json`) provides bootstrap peers for each network. Each entry includes:
- `chain_id` for network identification
- `genesis_sha256` for genesis verification

> Peer registries are for operator convenience only and do not affect consensus.

### Quick Start

```bash
# Install Mono Commander
go install github.com/monolythium/mono-commander/cmd/monoctl@latest

# Launch the interactive TUI
monoctl

# Or join a network via CLI
monoctl join --network Sprintnet --home ~/.monod
```

---

## Developers

### EVM

- **MetaMask / Web3 wallets**: Connect using the EVM JSON-RPC endpoint
- **Chain ID**: Use the EVM Chain ID from the networks table above
- **RPC endpoints**: See network-specific documentation

### Cosmos Native

- **Keplr / Leap**: Native Cosmos wallet support for staking and governance
- **CLI**: Use `monod` for direct chain interaction

---

## Security

If you discover a security vulnerability in any Monolythium product:

1. **Report it** at [issues.monolythium.com](https://issues.monolythium.com) (preferred) or via [GitHub Security Advisories](https://github.com/monolythium/mono-core/security/advisories)
2. **Do NOT** open a public issue
3. **Test on testnet only** — all contracts are deployed 1:1 on testnet and mainnet

We provide [safe harbor](https://docs.monolythium.com/ecosystem/bug-bounty#safe-harbor) for good-faith security researchers under CFAA and equivalent laws. Valid findings are eligible for LYTH token rewards.

See our [Bug Bounty Program](https://docs.monolythium.com/ecosystem/bug-bounty) and [Security Policy](https://github.com/monolythium/.github/blob/prod/SECURITY.md) for full details.

---

## Contributing

We welcome contributions! Please review:

- [mono-core CONTRIBUTING.md](https://github.com/monolythium/mono-core/blob/main/CONTRIBUTING.md)
- [mono-commander CONTRIBUTING.md](https://github.com/monolythium/mono-commander/blob/main/CONTRIBUTING.md)

### Guidelines

- Follow Go conventions and formatting (`gofmt`)
- Add tests for new functionality
- Keep commits focused and atomic
- Update documentation as needed

---

## Status

### Emergency Protocol

> **No rollback.** Emergency response: **HALT → PATCH → UPGRADE → RESTART**

### Current Phase

- **Sprintnet**: Active development network
- **Testnet**: Coming soon (mainnet-mirror configuration)
- **Mainnet**: Planned

---

<div align="center">

**[Documentation](https://docs.monolythium.com)** · **[GitHub](https://github.com/monolythium)** · **[Discord](https://discord.gg/monolythium)**

</div>
