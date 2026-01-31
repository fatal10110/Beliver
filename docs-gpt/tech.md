# Tech

## Architecture Decisions (Early)

- Platform targets (PC/mobile/web) and engine choice.
- World topology:
  - single shared world vs. shards/servers
  - deterministic turn resolution (recommended) for fairness and replayability
- Authoritative backend (recommended for online strategy):
  - server resolves turns, validates actions, enforces economy rules

## Backend (Services)

- Identity/auth:
  - platform login (Steam/Apple/Google) + email fallback
  - account linking, anti-fraud
- Game services:
  - turn submission API
  - turn resolution workers (queue-driven)
  - matchmaking/world assignment
  - alliance/diplomacy service
  - chat + moderation hooks (optional; often separate vendor/service)
- Live ops:
  - config service (events, balance knobs, drop tables)
  - feature flags, A/B tests
- Payments (if F2P):
  - store integration, receipt validation, entitlement service

## Data & Persistence

- Datastores:
  - relational for accounts/economy state
  - cache for hot state and matchmaking
  - event log / analytics pipeline
- Backups and disaster recovery.
- Migration strategy for schema evolution.

## Turn Resolution Engine

- Deterministic simulation:
  - explicit ordering of phases
  - seeded RNG recorded per turn
  - idempotent processing (safe retries)
- Anti-cheat:
  - server-side validation of all actions
  - rate limiting, exploit detection, rollback tools

## Client

- UI architecture for turn planning + reports.
- Offline-friendly turn planning (queue actions, validate locally, submit later).
- Networking:
  - robust retries
  - delta updates
  - push notifications (mobile) / email (optional) when turn resolves

## Security & Trust

- Input validation everywhere, signed requests, replay protection.
- Permissions model (alliances, roles, admin tooling).
- Moderation tooling for abuse reports and player-generated text.

## Tooling & DevOps

- CI for builds, lint, tests.
- Staging environments:
  - dev, staging, production
  - seeded test worlds
- Observability:
  - logs, metrics, traces
  - alerts for turn resolution failures, queue backlogs

## QA & Testing

- Simulation tests (economy invariants, determinism, regression).
- Load testing for:
  - turn resolution spikes
  - login/payment events during season starts

