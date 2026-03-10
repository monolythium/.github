<!-- Banner placeholder: Replace with actual banner image once available -->
<!-- ![Monolythium Banner](https://raw.githubusercontent.com/monolythium/.github/main/profile/assets/banner.png) -->

<div align="center">

# Monolythium

**Cosmos SDK + CometBFT + EVM L1 with deterministic finality and EVM JSON-RPC**

[![Docs](https://img.shields.io/badge/docs-docs.monolythium.com-blue)](https://docs.monolythium.com)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](https://github.com/monolythium/mono-core/blob/main/LICENSE)

</div>

---

## Start Here

| Repository | Description |
|------------|-------------|
| [mono-core](https://github.com/monolythium/mono-core) | Protocol source, operator kits, and network configurations |
| [mono-commander](https://github.com/monolythium/mono-commander) | TUI-first CLI tool for node operators (`monoctl`) |
| [docs-monolythium](https://github.com/monolythium/docs-monolythium) | Documentation site source |

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
