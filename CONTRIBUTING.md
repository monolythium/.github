# Contributing

## Current Status

The current Monolythium stack is still moving from research and private
implementation into public canonical repositories. Issues and pull requests are
welcome where a repository is public, but broad external contribution may be
deferred while protocol, SDK, and application surfaces stabilize.

## What You Can Do Today

- Report reproducible bugs in the affected repository.
- Report security issues privately through [SECURITY.md](SECURITY.md).
- Suggest concrete features or design changes with clear use-cases.
- Submit small documentation fixes and broken-link repairs.

## What Needs Prior Discussion

- Consensus-layer changes.
- Cryptography or signing changes.
- Economic-parameter changes.
- Wire-protocol, transaction-format, or chain-state changes.
- Large refactors across repository boundaries.

Uncoordinated changes in those areas may be closed even if the implementation is
technically sound, because they need design review before code review.

## Pull Requests

Keep pull requests focused, include a test plan, and update documentation when
behavior changes. Do not commit secrets, keys, private logs, or personally
identifying information.

## Code of Conduct

All project spaces are governed by the [Code of Conduct](CODE_OF_CONDUCT.md).
