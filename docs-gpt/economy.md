# Economy

## Core Pillars

- **Faith** as the primary “power” currency (spells, festivals, advanced upgrades).
- **Devotion** as the multiplier/constraint that ties economy to player behavior and stability.
- **Secondary resources** (Food, Wood/Materials, population/workforce) as the operational base.

## Resource Model (Sources / Sinks)

### Faith

- Sources: devout population, temples/shrines, holy sites, festivals, victories, moral actions.
- Sinks: spells/blessings, temple upgrades, festivals, diplomacy actions (treaties/aid), special projects.
- Balancing goals:
  - prevent “infinite spell loops”
  - ensure faith spend has meaningful opportunity cost

### Devotion

- Inputs: stability (food, safety), moral choices, victories/defeats, scandals, oppression.
- Effects: faith generation multiplier, unrest/rebellion chance, productivity modifiers.
- Design tasks:
  - define devotion bands (e.g., fervent/steady/doubtful/hostile)
  - clear player feedback and recovery paths

### Food

- Sources: farms, trade routes, events.
- Sinks: population upkeep, troop upkeep, festivals, sieges.
- Failure states: famine → devotion hit → unrest spiral (tune for drama, not frustration).

### Materials (Wood, stone, etc.)

- Sources: logging/quarries, trade, rewards.
- Sinks: buildings, upgrades, fortifications, unit production.

### Population / Workforce

- Growth drivers: housing, fertility/health systems, safety, food surplus.
- Sinks/constraints: housing caps, disease/war attrition, emigration events.

## Progression & Scaling

- City progression curve:
  - early game: “get stable” (food/housing/temple)
  - mid game: “specialize & expand” (trade, diplomacy, conversion tools)
  - late game: “macro strategy” (alliances, holy site control, high-tier spells)
- Tech/building tiers and prerequisites:
  - avoid hard locks that force one build order
  - provide catch-up mechanics for new/returning players (non-P2W)

## PvP / Multiplayer Fairness

- If asynchronous turns:
  - define turn cadence (e.g., 4h/8h/24h) and allowable “banking”
  - handle time zones and inactive players (AI governor? protection?)
- Balance levers:
  - soft caps on spell frequency
  - upkeep scaling for large armies
  - defender advantage / fortification efficiency

## Monetization Boundaries (Anti-P2W)

- Allowed:
  - cosmetics (skins, banners, temple visuals)
  - convenience (build queues, UI helpers) if not power
  - limited time-savers with hard caps and non-competitive modes
- Not allowed (recommendation):
  - direct combat power, rare units, forced conversions for money
  - “exclusive” economic multipliers in PvP

## Seasons / Pass Design

- Pass rewards: cosmetics-first, small non-inflationary consumables, profile customization.
- Seasonal goals: encourage diplomacy/events, not just conquest.
- Reset policy (if any): avoid wiping core progression; consider seasonal leaderboards instead.

## Economy Testing

- Spreadsheet/simulator of sources/sinks per tier.
- Bot-playtests:
  - detect runaway inflation/deflation
  - identify dominant strategies
- Telemetry-driven tuning plan post-launch.

