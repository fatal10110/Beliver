import type { Action, DoctrinePolicy, GameState, ResourceStockpile, RuleFired } from 'shared-types'
import { ActionType, ResourceType, UnitType } from 'shared-types'
import { applyAction } from './actions'
import { validateAction } from './validators'

export type VictoryPointBreakdown = {
  total: number
  faith: number
  devotion: number
  food: number
  wood: number
  units: number
}

export type TurnLogEntry = {
  turn: number
  action: Action
  resources: ResourceStockpile
  victoryPoints: number
}

export type SimulationResult = {
  finalState: GameState
  actions: Action[]
  rulesFired: RuleFired[]
  turnLog: TurnLogEntry[]
}

type SimulationConfig = {
  initialState: GameState
  policy: DoctrinePolicy
  playerId: string
  turnLimit?: number
}

const createRng = (seed: number) => {
  let t = seed + 0x6d2b79f5
  return () => {
    t += 0x6d2b79f5
    let value = Math.imul(t ^ (t >>> 15), t | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

const getStatValue = (state: GameState, key: string) => {
  switch (key) {
    case 'food':
      return state.resources[ResourceType.Food]
    case 'wood':
      return state.resources[ResourceType.Wood]
    case 'faith':
      return state.resources[ResourceType.Faith]
    case 'devotion':
      return state.resources[ResourceType.Devotion]
    case 'units':
      return state.units.length
    case 'turn':
      return state.turn
    default:
      return 0
  }
}

const evaluateCondition = (state: GameState, condition: string) => {
  const match = /^([a-z_]+)\s*(<=|>=|<|>|==)\s*(\d+)$/i.exec(condition.trim())
  if (!match) {
    return false
  }

  const [, key, operator, rawValue] = match
  const value = Number(rawValue)
  const stat = getStatValue(state, key.toLowerCase())

  switch (operator) {
    case '<':
      return stat < value
    case '<=':
      return stat <= value
    case '>':
      return stat > value
    case '>=':
      return stat >= value
    case '==':
      return stat === value
    default:
      return false
  }
}

const mapActionName = (action: string, actorId: string): Action => {
  const normalized = action.toLowerCase().trim()
  if (normalized === 'build_farm') {
    return { type: ActionType.Build, payload: { building: 'farm' }, actor_id: actorId }
  }
  if (normalized === 'build_mine') {
    return { type: ActionType.Build, payload: { building: 'mine' }, actor_id: actorId }
  }
  if (normalized === 'build_shrine') {
    return { type: ActionType.Build, payload: { building: 'shrine' }, actor_id: actorId }
  }
  if (normalized === 'train_guardian') {
    return { type: ActionType.Train, payload: { unitType: UnitType.Guardian }, actor_id: actorId }
  }
  if (normalized === 'train_acolyte') {
    return { type: ActionType.Train, payload: { unitType: UnitType.Acolyte }, actor_id: actorId }
  }
  if (normalized === 'harvest') {
    return { type: ActionType.Harvest, actor_id: actorId }
  }
  if (normalized === 'pray') {
    return { type: ActionType.Pray, actor_id: actorId }
  }
  if (normalized === 'advance' || normalized === 'scout') {
    return { type: ActionType.Move, actor_id: actorId }
  }
  return { type: ActionType.Wait, actor_id: actorId }
}

const selectWeightedAction = (weights: Record<string, number>, rng: () => number) => {
  const entries = Object.entries(weights)
  if (entries.length === 0) {
    return 'wait'
  }

  const total = entries.reduce((sum, [, weight]) => sum + weight, 0)
  const roll = rng() * total
  let cursor = 0

  for (const [action, weight] of entries) {
    cursor += weight
    if (roll <= cursor) {
      return action
    }
  }

  return entries[0][0]
}

const evaluatePolicy = (state: GameState, policy: DoctrinePolicy, rng: () => number) => {
  const orderedRules = [...policy.rules].sort(
    (a, b) => (a.priority ?? Number.MAX_SAFE_INTEGER) - (b.priority ?? Number.MAX_SAFE_INTEGER),
  )

  for (const rule of orderedRules) {
    if (evaluateCondition(state, rule.condition)) {
      return { actionName: rule.action, rule }
    }
  }

  const fallback = policy.weights ? selectWeightedAction(policy.weights, rng) : 'wait'
  return { actionName: fallback, rule: undefined }
}

export const calculateVictoryPointsBreakdown = (state: GameState): VictoryPointBreakdown => {
  const resources = state.resources
  const faith = resources[ResourceType.Faith] * 2
  const devotion = resources[ResourceType.Devotion] * 2
  const food = resources[ResourceType.Food]
  const wood = resources[ResourceType.Wood]
  const units = state.units.length * 3
  return {
    total: faith + devotion + food + wood + units,
    faith,
    devotion,
    food,
    wood,
    units,
  }
}

const calculateVictoryPoints = (state: GameState) => calculateVictoryPointsBreakdown(state).total

const cloneState = (state: GameState): GameState => ({
  ...state,
  resources: { ...state.resources },
  units: state.units.map((unit) => ({ ...unit })),
  victory_points: { ...state.victory_points },
})

export const runSimulation = ({ initialState, policy, playerId, turnLimit }: SimulationConfig): SimulationResult => {
  let current = cloneState(initialState)
  const limit = turnLimit ?? current.max_turns
  const rng = createRng(current.seed)
  const rulesFired: RuleFired[] = []
  const actions: Action[] = []
  const turnLog: TurnLogEntry[] = []

  for (let turn = current.turn + 1; turn <= limit; turn += 1) {
    const { actionName, rule } = evaluatePolicy(current, policy, rng)
    const proposed = mapActionName(actionName, playerId)
    const finalAction = validateAction(current, proposed) ? proposed : { type: ActionType.Wait }

    let next = applyAction(current, finalAction)
    const breakdown = calculateVictoryPointsBreakdown(next)
    const victoryPoints = breakdown.total
    next = {
      ...next,
      turn,
      victory_points: {
        ...next.victory_points,
        [playerId]: victoryPoints,
      },
    }

    if (rule) {
      rulesFired.push({
        rule_id: rule.id,
        rule_name: rule.name,
        turn,
        weight: rule.weight,
        summary: `${rule.name} -> ${rule.action}`,
      })
    }

    actions.push(finalAction)
    turnLog.push({
      turn,
      action: finalAction,
      resources: { ...next.resources },
      victoryPoints,
    })
    current = next
  }

  return { finalState: current, actions, rulesFired, turnLog }
}
