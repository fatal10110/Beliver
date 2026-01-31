# Game Design Document (Core Mechanics)

## 1. Core Loop

1.  **Manage:** Assign population to jobs (Farmers, Scholars, Soldiers).
2.  **Expand:** Scout the map, claim resource nodes, build new settlements.
3.  **Faith:** Perform rituals to generate Faith and unlock Spells.
4.  **Conflict:** Engage in turn-based tactical combat or diplomatic maneuvering.

## 2. Faction Design

### A. Yahud (The Covenant)

- **Archetype:** Defensive, Economic, Traditional.
- **Unique Mechanic:** _The Ark._ A mobile holy relic unit that buffs nearby troops but causes instant loss if captured.
- **Bonuses:** +Defense on home territory, Higher resource gathering rates.
- **Spells:** _Divine Shield_ (Invulnerability for 1 turn), _Purification_ (Remove debuffs).

### B. Kristan (The Promise)

- **Archetype:** Expansionist, Conversion-focused, Crusader.
- **Unique Mechanic:** _Evangelism._ Can convert enemy units instead of killing them.
- **Bonuses:** Cheaper troop upkeep, Faster population growth.
- **Spells:** _Miracle Heal_ (Restore HP), _Crusade_ (Movement speed buff).

### C. Issam (The Revelation)

- **Archetype:** Scientific, Fast, Aggressive.
- **Unique Mechanic:** _Golden Age._ Trigger a temporary state of massive research/faith boost after winning battles.
- **Bonuses:** Cavalry movement bonus, Advanced trade routes.
- **Spells:** _Sandstorm_ (Reduces enemy accuracy), _Unity_ (Morale boost).

## 3. Map & Movement

- **Grid:** Hexagonal grid for tactical depth.
- **Terrain:**
  - _Desert:_ Attrition for non-native units.
  - _Hills:_ Defense bonus, movement penalty.
  - _Rivers:_ Crossing penalty unless bridged.

## 4. Combat System

- **Type:** Deterministic Turn-Based (like Advance Wars or Civ).
- **Rock-Paper-Scissors:**
  - Cavalry beats Archers.
  - Spearmen beat Cavalry.
  - Archers beat Spearmen.
- **Faith Integration:** Players can cast 1 Global Spell per turn during combat (e.g., calling lightning on a tile).

## 5. Diplomacy & Politics

- **Stances:** War, Neutral, Trade Agreement, Alliance, Vassalage.
- **Religious Pressure:**
  - Passive conversion of border cities.
  - Players can demand "Conversion" as a peace term.

## 6. Progression Systems

- **Tech Tree:** Not just "Science," but "Theology."
  - _Branch 1: Dogma_ (Unlocks Spells).
  - _Branch 2: Statecraft_ (Unlocks Diplomacy options).
  - _Branch 3: Architecture_ (Unlocks Buildings).

## 7. Multiplayer Modes

- **Duel:** 1v1 (Fast pace).
- **Grand Campaign:** 6-12 players on a massive map (Weeks-long matches).
- **Co-op Scenarios:** Defend the Holy City against AI barbarian hordes.
