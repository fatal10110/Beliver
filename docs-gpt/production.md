# Production

## Recommended Milestones

### 0) Pre-production (Proof of Fun)

- Align on scope (MVP vs. launch) and platform targets.
- Build playable prototype:
  - turn planner + turn resolution
  - basic city loop (food/housing/temple)
  - basic combat outcome and reporting
- Risk spikes:
  - deterministic simulation
  - UI for asynchronous turns

### 1) Vertical Slice

- 1 faction fully playable end-to-end.
- Core UX flows:
  - onboarding/tutorial
  - world map navigation
  - combat report viewer
- Live-ops config skeleton and basic telemetry.

### 2) Alpha

- All major systems implemented (even if unpolished):
  - 3 factions (content light)
  - diplomacy + alliances
  - conversion + rebellion
  - economy tuning loop
- Internal playtests + exploit hunting.

### 3) Beta / Soft Launch

- Content completion pass (units/buildings/events).
- Economy stabilization:
  - sinks/sources calibrated from telemetry
  - anti-snowball and catch-up systems tuned
- Backend hardening + load tests.
- Community tools and support ops ready.

### 4) Launch

- Season 1 content + pass cosmetics.
- Marketing beat + creator outreach.
- Post-launch incident response and hotfix playbook.

## Team / Roles (Minimum)

- Product/producer
- Game designer (systems/economy) + narrative designer
- Client engineer(s) + backend engineer(s)
- Tech artist + 2D/3D artists + UI/UX
- QA (in-house or outsourced)
- Community/support (at least part-time for soft launch)

## Key Risks (Track Early)

- Asynchronous turn cadence feels too slow/too fast.
- Snowballing dominates (winner keeps winning).
- Economy inflation (faith/food runaway) or frustration spirals (famine → devotion collapse).
- Sensitive theme backlash; insufficient moderation.
- Cheating/exploits if server authority is weak.

## Definition of Done (Per Feature)

- Design spec + acceptance criteria
- Telemetry events
- Tests (unit/sim where applicable)
- UX states (loading, error, offline, retries)
- Live-ops knobs (configurable tuning)

