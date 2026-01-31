import type { ResourceStockpile } from 'shared-types'
import { ResourceType, UnitType } from 'shared-types'
import { ZERO_RESOURCES } from './buildings'

export type UnitDefinition = {
  type: UnitType
  label: string
  description: string
  cost: ResourceStockpile
  baseHp: number
  vpValue: number
}

const withResources = (delta: Partial<ResourceStockpile>): ResourceStockpile => ({
  ...ZERO_RESOURCES,
  ...delta,
})

export const UNIT_DEFINITIONS: Record<UnitType, UnitDefinition> = {
  [UnitType.Acolyte]: {
    type: UnitType.Acolyte,
    label: 'Acolyte',
    description: 'Faithful support unit focused on doctrine upkeep.',
    cost: withResources({
      [ResourceType.Faith]: 2,
      [ResourceType.Food]: 1,
    }),
    baseHp: 8,
    vpValue: 2,
  },
  [UnitType.Guardian]: {
    type: UnitType.Guardian,
    label: 'Guardian',
    description: 'Frontline defender that stabilizes the frontier.',
    cost: withResources({
      [ResourceType.Food]: 2,
      [ResourceType.Devotion]: 1,
    }),
    baseHp: 12,
    vpValue: 3,
  },
  [UnitType.Ranger]: {
    type: UnitType.Ranger,
    label: 'Ranger',
    description: 'Scout unit specialized in swift map control.',
    cost: withResources({
      [ResourceType.Food]: 2,
      [ResourceType.Wood]: 1,
    }),
    baseHp: 10,
    vpValue: 3,
  },
}

export const getUnitDefinition = (type: UnitType): UnitDefinition => UNIT_DEFINITIONS[type]
