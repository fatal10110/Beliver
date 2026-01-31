import type { ResourceStockpile } from 'shared-types'
import { ResourceType } from 'shared-types'

export type BuildingType = 'farm' | 'mine' | 'shrine'

export type BuildingDefinition = {
  type: BuildingType
  label: string
  description: string
  cost: ResourceStockpile
  yield: ResourceStockpile
}

export const ZERO_RESOURCES: ResourceStockpile = {
  [ResourceType.Faith]: 0,
  [ResourceType.Food]: 0,
  [ResourceType.Wood]: 0,
  [ResourceType.Devotion]: 0,
}

const withResources = (delta: Partial<ResourceStockpile>): ResourceStockpile => ({
  ...ZERO_RESOURCES,
  ...delta,
})

export const BUILDING_DEFINITIONS: Record<BuildingType, BuildingDefinition> = {
  farm: {
    type: 'farm',
    label: 'Covenant Farm',
    description: 'Boosts food supply and steadies devotion.',
    cost: withResources({
      [ResourceType.Wood]: 2,
    }),
    yield: withResources({
      [ResourceType.Food]: 4,
      [ResourceType.Devotion]: 1,
    }),
  },
  mine: {
    type: 'mine',
    label: 'Stone Mine',
    description: 'Extracts wood-equivalent resources at the cost of upkeep.',
    cost: withResources({
      [ResourceType.Wood]: 2,
      [ResourceType.Food]: 1,
    }),
    yield: withResources({
      [ResourceType.Wood]: 3,
    }),
  },
  shrine: {
    type: 'shrine',
    label: 'Shrine of Abrim',
    description: 'Channels faith into devotion gains.',
    cost: withResources({
      [ResourceType.Wood]: 2,
      [ResourceType.Faith]: 1,
    }),
    yield: withResources({
      [ResourceType.Faith]: 2,
      [ResourceType.Devotion]: 2,
    }),
  },
}

export const getBuildingDefinition = (type: BuildingType): BuildingDefinition =>
  BUILDING_DEFINITIONS[type]
