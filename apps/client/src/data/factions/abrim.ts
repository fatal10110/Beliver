import type { ResourceStockpile } from 'shared-types'
import { ResourceType, UnitType } from 'shared-types'
import { getUnitDefinition } from '../units'
import { ZERO_RESOURCES } from '../buildings'

export type FactionProfile = {
  id: string
  name: string
  epithet: string
  credo: string
  startingResources: ResourceStockpile
  startingUnits: UnitType[]
}

const withResources = (delta: Partial<ResourceStockpile>): ResourceStockpile => ({
  ...ZERO_RESOURCES,
  ...delta,
})

export const FACTION_ABRIM: FactionProfile = {
  id: 'abrim',
  name: 'Abrim Covenant',
  epithet: 'Wardens of the First Flame',
  credo: 'Sustain the faithful, fortify the frontier, and honor the Prophet.',
  startingResources: withResources({
    [ResourceType.Faith]: 6,
    [ResourceType.Food]: 8,
    [ResourceType.Wood]: 6,
    [ResourceType.Devotion]: 5,
  }),
  startingUnits: [UnitType.Acolyte, UnitType.Guardian],
}

export const getStartingUnits = () => FACTION_ABRIM.startingUnits.map((unitType) => getUnitDefinition(unitType))
