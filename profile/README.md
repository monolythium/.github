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
| Testnet | `mono-test-1` | 262147 | `0x40003` |
| Mainnet | `mono-1` | 262148 | `0x40004` |

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

We take security seriously. If you discover a vulnerability:

1. **Do NOT** open a public issue
2. Use [GitHub Security Advisories](https://github.com/monolythium/mono-core/security/advisories) to report privately
3. Or email: `security@monolythium.com` (placeholder)

See [SECURITY.md](https://github.com/monolythium/mono-core/blob/main/SECURITY.md) for our full security policy.

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
