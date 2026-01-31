import type { GameState } from 'shared-types'
import { ResourceType, UnitType } from 'shared-types'

export const POC_PLAYER_ID = 'abrim'
export const DEFAULT_POC_SEED = 7123

export const createSingleFactionState = (seed: number = DEFAULT_POC_SEED): GameState => ({
  turn: 0,
  max_turns: 50,
  seed,
  resources: {
    [ResourceType.Faith]: 6,
    [ResourceType.Food]: 8,
    [ResourceType.Wood]: 6,
    [ResourceType.Devotion]: 5,
  },
  units: [
    {
      id: 'unit-1',
      type: UnitType.Acolyte,
      owner_id: POC_PLAYER_ID,
      x: 10,
      y: 10,
      hp: 10,
    },
  ],
  victory_points: {
    [POC_PLAYER_ID]: 0,
  },
})
