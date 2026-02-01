import type { Action, RuleFired } from 'shared-types'
import { ActionType, UnitType } from 'shared-types'
import type { TurnLogEntry } from '../sim/engine'

type DecisionTraceDebuggerProps = {
  rules: RuleFired[]
  turnLog: TurnLogEntry[]
  activeTurn?: number
}

const formatAction = (action?: Action) => {
  if (!action) return 'None'
  switch (action.type) {
    case ActionType.Build:
      return `Build ${(action.payload?.building as string | undefined) ?? 'structure'}`
    case ActionType.Train: {
      const unitType = (action.payload?.unitType as UnitType | undefined) ?? UnitType.Guardian
      return `Train ${unitType}`
    }
    case ActionType.Pray:
      return 'Pray'
    case ActionType.Harvest:
      return 'Harvest'
    case ActionType.Move:
      return 'Move'
    case ActionType.Wait:
    default:
      return 'Wait'
  }
}

const DecisionTraceDebugger = ({ rules, turnLog, activeTurn }: DecisionTraceDebuggerProps) => {
  const visible = rules.slice(-8).reverse()
  const actionByTurn = new Map(turnLog.map((entry) => [entry.turn, entry.action]))

  return (
    <div className="panel-card decision-trace" id="decision-trace-panel">
      <div className="panel-card__header">
        <div>
          <h3>Decision Trace</h3>
          <p>Why the policy chose each action</p>
        </div>
        <span className="meta-tag">{rules.length} rules</span>
      </div>
      <div className="decision-trace__body">
        {visible.length === 0 ? (
          <div className="decision-trace__empty">No rules fired yet.</div>
        ) : (
          visible.map((rule) => (
            <div
              key={`rule-${rule.turn}-${rule.rule_id}`}
              className="decision-trace__row"
              data-active={rule.turn === activeTurn}
            >
              <div>
                <div className="decision-trace__title">Turn {rule.turn}</div>
                <div className="decision-trace__meta">{rule.rule_name}</div>
              </div>
              <div className="decision-trace__stats">
                <span>{formatAction(actionByTurn.get(rule.turn))}</span>
                <span>W {rule.weight ?? 0.6}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DecisionTraceDebugger
