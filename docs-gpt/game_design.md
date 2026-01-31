# Game Design

## Core Loop

- Plan actions for the turn (build, recruit, trade, diplomacy, conversion, military moves).
- End turn → resolve outcomes asynchronously.
- Review results → adjust strategy based on devotion/economy/military state.

## Key Systems (Work Breakdown)

### Turns & Multiplayer Rules

- Turn cadence, timeouts, and “all players finalize” vs. fixed schedule.
- Resolution order (movement/combat/economy/events) and determinism rules.
- Matchmaking / world model:
  - shared persistent world vs. shards/servers
  - alliance structures and diplomacy visibility

### City Building

- Building types: farms, houses, temples/shrines, fortifications, production.
- Placement vs. menu-based building (impacts UI/tech).
- Upgrade trees and dependencies.

### Units & Combat

- Unit roster per faction (baseline + unique).
- Combat model:
  - tactical (grid/battlefield) vs. strategic (auto-resolve with modifiers)
  - readability and counterplay (scouting, terrain, morale)
- Attrition and logistics (upkeep, supply, sieges).

### Faith, Devotion, and “Miracles”

- Define measurable effects for blessings/curses (buffs, heals, plagues, wards).
- Cooldowns, costs, and counterplay (dispels, fortifications, doctrine tech).
- Devotion impacts: moral choices, oppression, mercy, aid, pilgrimage, etc.

### Conversion & Influence

- Shrines, missionaries, events, propaganda/espionage.
- Conversion rules for:
  - neutral villages
  - occupied territories (rebellion risk)
  - holy sites (special rules and treaties)

### Diplomacy & Intrigue

- Treaty types: trade, non-aggression, alliance, tribute, holy site access.
- Trust & reputation model (betrayal costs, sanctions).
- Espionage actions: sow doubt, sabotage supply, misinformation.

### World & PvE Pressure

- Neutral factions/raiders to prevent “snowballing only through PvP.”
- Global events (famine, crusade-like campaigns, pilgrimages).

## UX / UI Deliverables

- Turn planner screen (clear action budget/costs).
- City overview (resources + devotion + risk indicators).
- World map (territory, routes, holy sites, diplomacy state).
- Combat report viewer (what happened and why).
- Onboarding/tutorial: teach devotion/economy before PvP consequences.

## Content Scope (MVP vs. Launch)

- MVP (vertical slice):
  - 1–2 factions fully playable
  - limited building set, 6–10 units, core devotion loop
  - basic diplomacy + basic conversion
- Launch scope:
  - 3 factions, full roster, seasons/events, holy sites, richer diplomacy

