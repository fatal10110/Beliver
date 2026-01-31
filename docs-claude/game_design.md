# Game Design Document

## Core Gameplay Loop

### Turn Structure (24-48 Hour Turns)

**Player Actions Per Turn:**
1. Review turn report (what happened since last turn)
2. Allocate population to roles (farmers, devout, soldiers)
3. Queue building construction/upgrades
4. Manage military units (movement, positioning)
5. Cast spells/blessings
6. Conduct diplomacy (trade offers, alliances, declarations)
7. Confirm turn submission

**Turn Resolution Sequence:**
```
1. Resource Generation Phase
   - Farms produce Food
   - Devout population generates Faith
   - Forests produce Wood

2. Construction Phase
   - Buildings complete if requirements met
   - Resources consumed

3. Population Phase
   - Natural growth based on Food surplus
   - Happiness/Devotion recalculated
   - Emigration/immigration processed

4. Military Phase
   - Unit movement
   - Combat resolution (if applicable)
   - Siege progress

5. Divine Phase
   - Spell effects applied
   - Divine events triggered

6. Diplomatic Phase
   - Trade executed
   - Alliance effects applied

7. Event Phase
   - Random events (plague, festival, prophet)
   - Environmental effects (drought, harvest)

8. Turn Report Generation
   - Summarize all changes for each player
```

## Faction Design

### Yahud - The Covenant of the First Son

**Playstyle:** Defensive, Law-based, Traditional

**Faction Bonuses:**
- +15% Faith generation from temples
- -20% cost for walls and defensive structures
- "Covenant Protection" passive: Enemy spells cost 25% more Faith to cast on your territories

**Unique Units:**
- **Temple Guardian:** Defensive infantry, bonus when adjacent to temples
- **Lawkeeper:** Support unit that boosts nearby unit morale and reduces enemy Faith generation

**Unique Buildings:**
- **Torah House:** Generates Faith + small amounts of all resources, requires 3+ scholars
- **Sacred Wall:** Fortification that also generates Faith
- **House of Study:** Training building for religious and scholarly units

**Faction Spells:**
1. **Pillar of Fire** (150 Faith): Destroys enemy building or military unit, high visibility (devotion loss if used offensively)
2. **Covenant Shield** (100 Faith): Territory immune to spells for 3 turns
3. **Prophet's Vision** (75 Faith): Reveal enemy troop movements in adjacent territories for 2 turns
4. **Day of Atonement** (200 Faith): Mass devotion boost across all territories for 5 turns
5. **Manna from Heaven** (100 Faith): Generate emergency Food supply during famine

**Unique Mechanic: The Law System**
- Players choose from 3 interpretations of Abrim's laws each game
- Strict Law: +20% Faith generation, -15% population happiness
- Moderate Law: Balanced, no bonuses/penalties
- Progressive Law: +15% population happiness, -10% Faith generation
- Can change interpretation once per game (costs 500 Faith, 5-turn transition)

**Strategic Identity:**
- Turtle and defend early game
- Build tall (few territories, highly developed)
- Use Faith abundance for constant spell pressure
- Win through devotion/economic victory or outlasting opponents

### Kristan - The Promise of the Middle Son

**Playstyle:** Missionary, Expansionist, Diplomatic

**Faction Bonuses:**
- +25% population growth in newly converted territories
- -30% cost for missionary units and conversion actions
- "Universal Grace" passive: Allied players in same game get +5% to all resource generation

**Unique Units:**
- **Missionary:** Non-combat unit that converts population in adjacent territories
- **Crusader:** Offensive cavalry unit, bonus against non-believers
- **Pilgrim:** Economic unit that generates Faith and can establish trade routes

**Unique Buildings:**
- **Mission House:** Low-cost building (50 Wood) that slowly converts nearby neutral population
- **Cathedral:** Massive temple (3x3 tiles) that boosts Faith and happiness in wide radius
- **Hospice:** Building that heals injured units and boosts population growth

**Faction Spells:**
1. **Healing Miracle** (80 Faith): Restore units to full health, boost territory happiness for 3 turns
2. **Divine Retribution** (180 Faith): Deal damage to enemy army that recently attacked you, proportional to their aggression
3. **Sermon of Peace** (120 Faith): Prevent all combat in target territory for 2 turns (affects all players)
4. **Loaves and Fishes** (100 Faith): Generate Food surplus, shareable with allies
5. **Great Commission** (250 Faith): Instantly convert large population in target neutral or enemy territory

**Unique Mechanic: Apostolic Network**
- Each missionary unit creates "mission" markers on the map
- Missions connected by roads create network bonuses:
  - +10% Faith generation per connected mission
  - Free trade routes between connected territories
  - Faster unit movement along network
- Encourages territorial expansion and connectivity

**Strategic Identity:**
- Rapid early expansion through conversion
- Strong diplomatic game (help allies to help yourself)
- Win through cultural victory (convert 50% of all population)
- Vulnerable to aggressive military players early

### Issam - The Revelation of the Youngest Son

**Playstyle:** Aggressive, Resource-focused, Disciplined

**Faction Bonuses:**
- +20% Wood and material production
- Military units cost 15% less Food to maintain
- "Five Pillars" passive: Each turn, gain escalating bonus to one resource (rotates)

**Unique Units:**
- **Mujahedeen:** Fast cavalry unit, bonus in desert/arid terrain
- **Scholar:** Economic unit that boosts all resource production in territory
- **Qadi (Judge):** Administrative unit that increases tax efficiency and reduces corruption

**Unique Buildings:**
- **Madrasa:** School that trains scholars and generates research points
- **Caravanserai:** Trade hub that boosts trade route efficiency by 50%
- **Minaret:** Tall structure that increases Faith generation and provides vision over large area

**Faction Spells:**
1. **Plague of Doubt** (150 Faith): Reduce enemy devotion by 30% for 5 turns in target territory
2. **Swift Winds** (100 Faith): Double movement speed of all your units for 2 turns
3. **Drought Curse** (200 Faith): Reduce all resource generation in enemy territory by 50% for 4 turns
4. **Call to Prayer** (80 Faith): Boost devotion across all your territories for 3 turns
5. **Jihad** (300 Faith): All military units gain +50% combat strength for 3 turns, but lose devotion if you don't win battles

**Unique Mechanic: The Five Pillars**
- Each turn, one of five pillars is "active":
  1. **Shahada (Faith):** +30% Faith generation
  2. **Salat (Devotion):** +20% population happiness
  3. **Zakat (Charity):** +30% trade efficiency
  4. **Sawm (Discipline):** -30% unit upkeep costs
  5. **Hajj (Pilgrimage):** +50% Faith generation in holy cities
- Cycle repeats every 5 turns
- Advanced players plan strategies around pillar cycle

**Strategic Identity:**
- Aggressive expansion with strong economy to support it
- Excellent at long-distance trade (caravans)
- Win through conquest or economic domination
- Must balance aggression with devotion management (harsh tactics lower happiness)

## Combat System

### Unit Types

**Infantry:**
- High defense, low movement (1-2 tiles/turn)
- Bonus defending fortifications
- Counter: Cavalry charges, siege weapons
- Example: Spearmen, Temple Guardians (Yahud)

**Cavalry:**
- High movement (3-4 tiles/turn), moderate attack
- Bonus in open terrain
- Counter: Infantry formations, defensive positions
- Example: Light Cavalry, Crusaders (Kristan), Mujahedeen (Issam)

**Ranged:**
- Attack from distance (2-3 tile range)
- Weak in melee
- Counter: Cavalry charges, siege
- Example: Archers, Slingers

**Siege:**
- Destroy fortifications
- Slow movement (1 tile/turn), vulnerable to attacks
- Counter: Sorties, hit-and-run cavalry
- Example: Battering Rams, Catapults (late game)

**Support:**
- Boost nearby units (morale, healing, supply)
- Non-combat or weak combat
- Counter: Flanking, targeted elimination
- Example: Lawkeepers (Yahud), Pilgrims (Kristan), Scholars (Issam)

### Combat Resolution

**Turn-Based Combat Calculation:**

```
When units from opposing players occupy same territory:

1. Determine Attacker vs. Defender (who moved in this turn)
2. Calculate Combat Strength:

   Base Strength = Unit Type Base × Number of Units
   Terrain Modifier = (0.7 - 1.5x depending on terrain and unit type)
   Fortification Modifier = (1.0 - 2.0x for defender if fortifications present)
   Devotion Modifier = (0.9 - 1.2x based on population devotion)
   Spell Effects = (Various bonuses from active spells)

   Total Strength = Base × Terrain × Fortification × Devotion × Spells

3. Compare Strengths:
   - If Attacker Strength > Defender Strength × 1.3: Decisive Victory (low casualties)
   - If Attacker Strength > Defender Strength: Victory (moderate casualties)
   - If Equal (within 10%): Stalemate (high casualties both sides)
   - If Defender Strength > Attacker Strength: Repelled (attacker retreats)
   - If Defender Strength > Attacker Strength × 1.5: Crushing Defeat (attacker routed)

4. Apply Casualties:
   - Winner loses 10-30% of units
   - Loser loses 40-80% of units
   - Surviving loser units retreat to adjacent friendly territory

5. Consequences:
   - Winner occupies territory (if attacker won)
   - Population in contested territory loses happiness
   - Devotion shifts based on outcome
```

**Terrain Effects:**
- **Mountains:** Infantry +30% defense, cavalry -30% attack
- **Desert:** Cavalry +20% movement, all units +15% Food consumption
- **Forest:** Ranged +20% attack, cavalry -20% movement
- **Rivers:** -50% movement to cross, defender +20% if positioned on far side
- **Fortified City:** Defender +100% (walls), attacker needs siege units

### Siege Warfare

**Sieging a Fortified Territory:**
1. Attacker positions army adjacent to enemy fortification
2. Each turn, siege progresses: Fortification HP decreases
3. Defender can:
   - Sortie (attack sieging army, risky)
   - Wait for reinforcements
   - Surrender (negotiate terms)
4. Siege duration: 3-10 turns depending on fortification strength and siege units
5. Consequences:
   - Besieged population suffers starvation (Food cut off)
   - Devotion drops rapidly in besieged territory
   - Attacker's army also consumes Food (supply lines matter)

**Breaking Sieges:**
- Allied reinforcements attack sieging army from outside
- Naval routes (if coastal) can supply besieged city
- Divine intervention (spells to teleport supplies or demoralize attackers)

## Diplomacy System

### Diplomatic Actions

**Trade Agreement (Lasts 5-10 Turns):**
- Propose trade: "I give X Food/Wood, you give Y Faith/Gold"
- Trade routes require connected territories or coastal access
- Breaking trade damages reputation (-10 Diplomatic Trust)

**Alliance (Lasts 20+ Turns):**
- Mutual defense pact (attack on one = war on both)
- Shared vision of territories
- Cannot attack each other's units or territories
- +15% boost to all resources when allied with same-faith player
- Breaking alliance = massive reputation loss (-50 Diplomatic Trust)

**Non-Aggression Pact (Lasts 10-15 Turns):**
- Cannot attack each other
- No shared benefits
- Low commitment, can expire naturally

**Declaration of War:**
- Formal war declaration (no surprise attacks in diplomatic games)
- Grants 1 turn of preparation for defender
- Ending war requires negotiation or surrender

**Tribute/Vassal System:**
- Defeated player can become vassal instead of being eliminated
- Vassal pays % of resources to overlord
- Overlord protects vassal from others
- Vassal can rebel if overlord weakens

### Reputation & Trust System

**Diplomatic Trust Score (0-100):**
- Starts at 50 (neutral)
- Increases with: Honoring agreements, sending aid, fair trades
- Decreases with: Breaking treaties, backstabbing, aggressive wars
- Visible to all players

**Effects of Trust:**
- High Trust (75+): +10% to all trades, easier to form alliances
- Neutral Trust (40-60): No bonuses or penalties
- Low Trust (25-): -20% to trades, AI players refuse diplomacy, other players wary

**Interfaith Diplomacy:**
- Same-faith alliances: +25% resource bonuses, easier to maintain
- Different-faith alliances: Normal bonuses, higher maintenance cost (distrust)
- Can form temporary alliances against common threat regardless of faith

## Progression Systems

### Player Level & Rewards

**Experience Points (XP):**
- Earned from: Completing turns, winning battles, building structures, converting population
- Each level unlocks: Cosmetics, additional building slots, slight efficiency bonuses (max 5-10%)

**Levels 1-10:** Tutorial and learning phase
**Levels 11-30:** Core gameplay, unlock all game mechanics
**Levels 31-50:** Prestige levels, cosmetic rewards only (no gameplay advantage)

### Seasonal Content

**3-Month Seasons:**
- New narrative event each season (e.g., "The Great Schism", "Age of Prophets")
- Special challenges and objectives for extra rewards
- Seasonal leaderboard with cosmetic prizes
- Balance patches and new content drops

**Battle Pass (Free + Premium):**
- Free tier: Basic cosmetics, small resource bundles
- Premium tier ($9.99): Exclusive skins, emotes, profile customization
- Progress by playing games and completing objectives
- No gameplay advantages, purely cosmetic

### Unlockable Content

**Faction Variants (Earned through Play):**
- After 50 games as Yahud, unlock "Orthodox Yahud" with alternate bonuses
- After 50 games as Kristan, unlock "Apostolic Kristan"
- After 50 games as Issam, unlock "Sufi Issam"
- Variants offer different playstyles, not straight upgrades

**Cosmetic Customization:**
- Temple skins (Gothic, Byzantine, Moorish architectural styles)
- Unit armor colors and patterns
- Leader portraits and avatars
- Banner designs and emblems
- Environmental decorations (fountains, statues, gardens)

## Game Modes

### Ranked Mode (3-6 Players)

**Matchmaking:**
- ELO-based ranking system
- Bronze → Silver → Gold → Platinum → Diamond → Master tiers
- Seasonal rank resets with soft MMR reset

**Rules:**
- Standard map size (medium-large)
- All factions available
- Balanced starting positions
- 48-hour turn timer
- Surrender allowed after turn 10 (no penalty after turn 20)

**Rewards:**
- Rank-specific cosmetics at end of season
- Higher ranks earn more currency for store purchases

### Casual Mode (3-6 Players)

- Quick matchmaking, any skill level
- No rank impact
- 24-hour turn timers (faster pace)
- Experimental balance changes tested here first

### Custom Lobbies

- Create private games with friends
- Customizable rules:
  - Turn timer duration
  - Starting resources
  - Map size and type
  - Victory conditions
  - Faction restrictions
- Password-protected or invite-only

### Campaign Mode (Single-Player/Co-op)

**Historical Scenarios:**
- Playable retelling of lore events
- "The Brothers' Parting" (introductory tutorial)
- "Siege of the Sacred City" (defensive scenario)
- "The Great Conversion" (missionary focus)
- "Crusade of the Faithful" (military conquest)

**AI Difficulty:**
- Easy: AI makes suboptimal choices, lower resource bonuses
- Normal: Competent AI, balanced play
- Hard: Aggressive AI with +20% resource bonuses
- Expert: Advanced strategies, +40% bonuses, challenging even for veterans

**Co-op:**
- 2-3 players vs. AI opponents
- Shared objectives, separate territories
- Rewards for completing on higher difficulties

### Special Events

**Weekend Tournaments:**
- 16-32 player bracket tournaments
- Faster turn timers (12 hours)
- Prizes: Exclusive cosmetics, store currency

**Seasonal Events:**
- "Festival of Abrim": Bonus Faith generation, community goals
- "Holy Crusade": Military-focused event with special challenges
- "Age of Prophets": Random powerful divine events each turn

## Victory Conditions

### Religious Victory
- Convert 50% of all population on map to your faith
- Maintain for 3 consecutive turns
- Typical game length: 30-50 turns

### Economic Victory
- Accumulate 10,000 total Faith (cumulative across all turns)
- Control 70% of all trade routes on map
- Typical game length: 40-60 turns

### Military Victory (Domination)
- Eliminate all other players (control all territories)
- Most rare victory type (most games end in surrender before this)
- Typical game length: 50-80+ turns

### Diplomatic Victory (Requires 5+ Players)
- Be elected "Leader of the Faithful" by majority vote
- Requires: High diplomatic trust, strong alliances, no recent wars
- Vote occurs at turn 50 (if no other victory yet)

### Time Limit Victory
- If turn 100 reached with no victory: Player with highest combined score wins
- Score = (Faith generated × 2) + (Population × 5) + (Territories × 10) + (Buildings × 3)

## User Interface & UX

### Main Game Screen

**Elements:**
1. **Map View (Center):**
   - Hex-based or regional map
   - Territories color-coded by owner
   - Military units visible
   - Fog of war for unexplored areas

2. **Resource Bar (Top):**
   - Current Faith, Food, Wood, Population
   - Generation rates (+X per turn)
   - Warning indicators if deficit

3. **Action Queue (Right Panel):**
   - Pending builds
   - Queued military movements
   - Active spells and effects

4. **Notifications (Left Panel):**
   - Turn report summary
   - Diplomatic messages
   - Combat results
   - Event notifications

5. **Turn Timer (Top Right):**
   - Countdown to turn resolution
   - "Ready" button to confirm turn early

6. **Faction Abilities (Bottom):**
   - Quick access to spells
   - Faction-specific mechanics UI

### Turn Report Screen

**Post-Turn Summary:**
- "What Happened This Turn"
- Expandable sections:
  - Resource changes (+/- for each resource)
  - Buildings completed
  - Population changes (births, deaths, conversions)
  - Combat results (if any)
  - Diplomatic updates
  - Rival player actions (visible ones)
- Interactive: Click any item to jump to relevant location on map

### Accessibility Features

- Colorblind modes (multiple palettes)
- Scalable UI (for various screen sizes)
- Tooltips on hover for all game elements
- Simplified UI mode (hides advanced stats)
- Audio cues for important events
- Keyboard shortcuts for power users

## Onboarding & Tutorials

### New Player Experience

**Tutorial Campaign (Required First Time):**
1. **Turn 1-3:** Learn basic controls, building placement
2. **Turn 4-7:** Population management, resource generation
3. **Turn 8-12:** Military basics, defend against AI attack
4. **Turn 13-15:** Diplomacy and trade introduction
5. **Turn 16-20:** Spells and faction abilities
6. **Victory:** Defeat tutorial AI, unlock multiplayer

**Guided Tips:**
- Contextual tooltips throughout first 5 games
- "Did you know?" facts during turn resolution
- Optional advanced tips (disable after level 10)

### Learning Curve Management

**Complexity Tiers:**
- **Tier 1 (Turns 1-10):** Food, basic buildings, simple combat
- **Tier 2 (Turns 11-30):** Faith, spells, diplomacy, advanced combat
- **Tier 3 (Turns 31+):** Faction abilities, late-game strategies, edge cases

**AI Assistance:**
- "AI Advisor" can be toggled on/off
- Suggests optimal actions (can be overridden)
- Explains why suggestions are made (educational)

## Balance Philosophy

### Core Principles

1. **Faction Balance:**
   - Each faction should win ~33% of games in skilled play
   - Different skill floors and ceilings okay (complexity variety)
   - Counter-play exists for all strategies

2. **Strategic Diversity:**
   - No single dominant strategy ("meta")
   - Peaceful/diplomatic builds should be as viable as military
   - Comeback mechanics prevent early-game snowballing

3. **Player Agency:**
   - Skill should matter more than luck
   - Random events should add flavor, not decide games
   - Clear feedback on why actions succeeded/failed

4. **Respect Player Time:**
   - Asynchronous turns accommodate busy schedules
   - No mandatory grinding for gameplay advantages
   - Concede option available (don't force lost games to drag on)

### Balancing Levers

**Tunable Per Faction:**
- Resource generation rates
- Building costs and construction times
- Unit stats (HP, attack, movement)
- Spell costs and effects
- Faction ability cooldowns

**Monitored Metrics:**
- Faction win rates (overall and by skill tier)
- Average game length
- Most/least used spells and units
- Surrender rates and timing
- Player satisfaction surveys

**Balance Patches:**
- Monthly minor tweaks
- Quarterly major balance updates
- Transparent patch notes with reasoning
- Community testing on separate balance beta servers
