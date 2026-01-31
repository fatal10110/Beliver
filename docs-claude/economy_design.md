# Economy Design

## Core Economic Principles

The Sons of Abrim economy is built on three pillars:
1. **Faith** - Primary strategic resource, generated through devotion
2. **Material Resources** - Food, Wood, and other tangible goods
3. **Population** - Living resource that consumes, produces, and generates devotion

All systems must maintain balance between these pillars to create meaningful strategic choices without creating dominant strategies.

## Resource Systems

### 1. Faith (Primary Resource)

**Generation:**
- Base generation: 1 Faith per turn per devout population unit
- Temple multipliers: +50% to +200% based on temple tier
- Devotion meter impact: 0.5x to 2.0x modifier based on population happiness
- Holy sites: Bonus generation in sacred cities (+25% to +100%)
- Religious festivals: Temporary surge (3-5 turns)

**Expenditure:**
- Religious spells/blessings: 10-500 Faith depending on power
- Temple construction/upgrades: 100-2000 Faith
- Converting neutral populations: 50-200 Faith per population unit
- Religious festivals: 100-500 Faith
- Training religious units (priests, missionaries): 50-150 Faith each

**Balance Considerations:**
- Faith should be abundant enough for regular spell use
- High costs for powerful abilities prevent spam
- Devotion modifier creates risk/reward for aggressive vs. peaceful play

**Formula:**
```
Faith Generation =
  (Base Population × Devotion Modifier × Temple Modifier × Holy Site Modifier) + Event Bonuses

Devotion Modifier Range: 0.5x (rebellious) to 2.0x (fanatical)
Temple Modifier: 1.0x (no temple) to 3.0x (grand temple)
Holy Site Modifier: 1.0x (normal) to 2.0x (sacred city)
```

### 2. Food (Survival Resource)

**Generation:**
- Farms: 5-20 Food per turn based on tier and climate
- Fishing villages: 3-10 Food per turn (coastal only)
- Hunting grounds: 2-5 Food per turn (decreases over time)
- Trade imports: Variable based on agreements

**Consumption:**
- Population: 1 Food per 2 population units per turn
- Military units: 1-3 Food per unit per turn (higher for elite units)
- Siege/campaign costs: Additional 10-30% consumption

**Storage & Spoilage:**
- Granaries store 100-500 Food
- Spoilage rate: 2-5% per turn without preservation
- Upgraded granaries reduce spoilage to 1%

**Starvation Effects:**
- Food deficit triggers rapid devotion loss (-10% per turn)
- Population begins dying after 3 turns of starvation
- Military units desert if unfed for 2 turns
- Cannot recruit new units during famine

**Balance Considerations:**
- Food should require attention but not dominate gameplay
- Seasonal variations create strategic planning needs
- Trade dependency creates diplomatic incentives

### 3. Wood & Materials (Construction Resource)

**Generation:**
- Forests: 3-10 Wood per turn (decreases with harvesting)
- Sawmills: Double Wood production from adjacent forests
- Trade: Import from wood-rich regions

**Expenditure:**
- Basic buildings (houses, farms): 10-30 Wood
- Advanced structures (temples, fortifications): 50-200 Wood
- Ships (if naval expansion): 100-300 Wood
- Siege equipment: 50-150 Wood

**Deforestation Mechanics:**
- Over-harvesting reduces generation rate
- Replanting option: Spend Wood now to increase future yield
- Barren lands have strategic consequences (no hiding places, erosion)

**Other Materials:**
- Stone: For fortifications and grand temples (regional availability)
- Clay: For pottery and trade goods
- Precious metals: For trade and high-tier religious artifacts

### 4. Population (Living Resource)

**Growth Mechanics:**
- Natural growth: 2-5% per turn with adequate food and housing
- Family/household system: 2-4 population units per household
- Growth rate modified by:
  - Food surplus: +1-3% bonus
  - Devotion level: +0-2% bonus
  - Overcrowding: -2-5% penalty
  - War casualties: -5-15% penalty

**Population Types:**
- Farmers: Generate Food
- Laborers: Construct buildings
- Devout: Generate Faith
- Soldiers: Combat units (consume more Food)
- Merchants: Generate trade goods
- Priests/Missionaries: Spread religion, boost devotion

**Workforce Allocation:**
- Player assigns population to roles each turn
- Reallocation takes 1-2 turns to take effect
- Specialized buildings (temples, barracks) attract specific types

**Happiness & Devotion:**
```
Happiness Score (0-100):
  + 20 points: Food surplus (no starvation)
  + 15 points: Adequate housing
  + 15 points: Religious buildings present
  + 10 points: Recent military victory
  + 10 points: Cultural/festival events
  + 10 points: Low taxation
  + 10 points: Trade prosperity
  + 10 points: Safety from raids

Devotion Modifier = (Happiness Score / 50)
  - 100 Happiness = 2.0x Faith generation
  - 50 Happiness = 1.0x Faith generation
  - 25 Happiness = 0.5x Faith generation
  - 0 Happiness = 0.25x Faith generation + rebellion risk
```

**Death & Casualties:**
- Old age: Natural attrition of 1-2% per turn
- Starvation: 5-10% per turn during famine
- Disease/plague: 10-30% over 3-5 turns (can be spell-inflicted)
- War: Casualties based on battle outcomes
- Emigration: Unhappy population may flee to other realms

## Economic Balancing Systems

### 1. Diminishing Returns

**Population Density:**
- First 10 population units: 100% efficiency
- 11-20 units: 90% efficiency (overcrowding)
- 21-30 units: 80% efficiency
- 30+ units: 70% efficiency + increased disease risk

**Faith Generation:**
- First temple: +50% Faith generation
- Second temple: +30% additional
- Third temple: +20% additional
- Encourages territorial expansion over single-city turtling

**Military Units:**
- Unit upkeep increases exponentially with army size
- Large armies suffer morale penalties (supply issues)
- Encourages quality over quantity

### 2. Trade & Interdependence

**Trade Route Mechanics:**
- Establish routes with allied or neutral players
- Export surplus resources for deficit resources
- Trade agreements last 5-10 turns, renewable
- Breaking trade deals damages diplomatic reputation

**Trade Goods:**
- Specialty resources unique to regions (spices, dyes, precious metals)
- Used for high-tier temple upgrades or luxury items
- Creates incentive for diplomacy and peaceful expansion

**Market Prices:**
- Dynamic pricing based on supply/demand across all players
- Famine in multiple regions increases Food prices
- Recent wars increase demand for Wood (rebuilding)

### 3. Economic Warfare

**Blockades & Embargoes:**
- Cut off trade routes to enemy territories
- Requires naval or military control of trade paths
- Target suffers resource shortages

**Raiding & Pillaging:**
- Attack enemy resources directly
- Steal Food, Wood, or even population (slaves/captives)
- Damages enemy economy but reduces own devotion (moral cost)

**Economic Spells:**
- Yahud: "Plague of Locusts" (destroys Food production for 3 turns)
- Kristan: "Loaves and Fishes" (generates Food surplus)
- Issam: "Drought Curse" (reduces all resource generation in target region)

### 4. Victory Conditions & Economic Pressure

**Economic Victory Paths:**
- Accumulate 10,000 total Faith (religious dominance)
- Control 70% of trade routes on map (commercial dominance)
- Convert 50% of all population to your faith (cultural victory)

**Economic Collapse:**
- Sustained resource deficits lead to:
  - Population desertion
  - Military mutiny
  - Automatic loss of territory
  - Forced surrender or vassalization

## Faction-Specific Economic Traits

### Yahud (Covenant of the First Son)

**Economic Identity:** Defensive prosperity, traditional trade

- **Bonus:** +15% Faith generation from temples
- **Bonus:** -20% cost for defensive structures
- **Penalty:** -10% Food production (strict dietary laws)
- **Unique Building:** Torah House (generates Faith + small amount of all resources)
- **Trade Strength:** Reliable trade partners, bonus to long-term agreements

### Kristan (Promise of the Middle Son)

**Economic Identity:** Missionary expansion, aid & conversion

- **Bonus:** +25% population growth in newly converted territories
- **Bonus:** Food aid to allies costs 20% less
- **Penalty:** -15% Faith generation from temples (less ritualistic)
- **Unique Building:** Mission (low-cost structure that slowly converts nearby population)
- **Trade Strength:** Attracts diverse trade goods, bonus to multi-faith trade

### Issam (Revelation of the Youngest Son)

**Economic Identity:** Rapid expansion, resource extraction

- **Bonus:** +20% Wood and material production
- **Bonus:** Military units cost 15% less Food to maintain
- **Penalty:** -10% population happiness from non-believers (stricter laws)
- **Unique Building:** Madrasa (trains scholars who boost all resource production)
- **Trade Strength:** Strong caravan trade, bonus to long-distance routes

## Progression & Upgrades

### Technology/Advancement Tree

**Tier 1 (Early Game):**
- Basic farming techniques
- Simple carpentry
- Oral tradition (basic Faith generation)

**Tier 2 (Mid Game):**
- Irrigation systems (+50% Food from farms)
- Advanced masonry (Stone buildings, better fortifications)
- Written scriptures (+30% Faith generation)

**Tier 3 (Late Game):**
- Crop rotation (Food surplus, reduced spoilage)
- Architectural marvels (Grand temples, wonders)
- Religious reformation (unlock powerful faction-specific abilities)

**Research Mechanics:**
- Spend Faith to unlock advancements
- Some techs require specific buildings or population thresholds
- Faction-specific tech branches

### Building Progression

**Example: Temple Tiers**
- **Shrine (Tier 1):** 50 Wood, 100 Faith | +50% Faith generation
- **Temple (Tier 2):** 150 Wood, 50 Stone, 300 Faith | +100% Faith generation
- **Grand Temple (Tier 3):** 300 Wood, 150 Stone, 800 Faith | +200% Faith generation + unique faction ability

**Example: Farm Tiers**
- **Small Farm:** 20 Wood | 5 Food/turn
- **Irrigated Farm:** 50 Wood, 30 Stone | 12 Food/turn
- **Agricultural Estate:** 100 Wood, 50 Stone | 25 Food/turn + employs more workers

## Balance Testing Framework

### Key Metrics to Monitor

1. **Average Resource Levels:**
   - Players should maintain 3-5 turns of Food reserves
   - Faith should accumulate enough for 1-2 spells per 10 turns
   - Wood should rarely be the primary bottleneck

2. **Economic Diversity:**
   - No single resource strategy dominates win rates
   - Trade-focused players should be viable vs. isolationists
   - Economic warfare should be effective but not overpowered

3. **Faction Balance:**
   - Each faction's win rate should be 30-36% (within 6% of each other)
   - Economic bonuses should feel distinct but equally valuable
   - No faction should have unbeatable economic advantage

### Tuning Levers

- Resource generation rates (easily adjustable per faction)
- Building costs (can buff/nerf specific strategies)
- Population growth rates (affects early vs. late game power)
- Spell costs (balance religious aggression)
- Trade efficiency (encourage/discourage diplomacy)

### Testing Scenarios

1. **Boom Economy:** Can a player who ignores military and focuses on economy win?
2. **Trade Dependency:** Can a player survive if their trade routes are cut?
3. **Faith Spam:** Can a player overwhelm opponents with constant spell use?
4. **Population Bomb:** Is rapid population growth a viable sole strategy?
5. **Turtle Defense:** Can a small, highly developed territory compete with expansionists?

## Player Psychology & Engagement

### Economic Feedback Loops

**Positive Loops (Snowballing):**
- More population → More resources → More buildings → More population
- High devotion → More Faith → More spells → More victories → Higher devotion
- **Mitigation:** Diminishing returns, increased upkeep costs, rival players targeting leaders

**Negative Loops (Death Spirals):**
- Low Food → Starvation → Less population → Less Food production
- Military defeat → Low devotion → Less Faith → Weaker defenses → More defeats
- **Mitigation:** Comeback mechanics (divine intervention events, temporary bonuses for underdogs)

### Strategic Depth

Players should constantly balance:
- **Short-term** (surviving the next few turns) vs. **Long-term** (building economy for late game)
- **Military spending** (defense/offense) vs. **Economic investment** (buildings, growth)
- **Isolationism** (self-sufficiency) vs. **Diplomacy** (trade dependency but potentially richer)
- **Faith accumulation** (saving for big spell) vs. **Constant pressure** (frequent small spells)

### Accessibility vs. Complexity

- **Surface Level:** Easy to understand (Food feeds people, Faith casts spells)
- **Mid-Level:** Building optimization, workforce allocation
- **Deep Level:** Trade networks, economic warfare, resource timing
- **Mastery Level:** Cross-faction economic analysis, predicting market shifts

## Implementation Priorities

### MVP (Minimum Viable Product)

1. Faith and Food systems fully functional
2. Basic population growth/death mechanics
3. Simple building construction (3 tiers max)
4. Core resource balance for single-player vs. AI

### Phase 2 (Enhanced Economy)

1. Wood and material systems
2. Trade routes between players
3. Advanced buildings and upgrades
4. Economic spells and warfare

### Phase 3 (Polish & Depth)

1. Dynamic market pricing
2. Seasonal variations
3. Advanced diplomatic economic agreements
4. Economic victory conditions
