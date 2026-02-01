import type { Action, RuleFired, Unit } from 'shared-types'
import { ActionType, UnitType } from 'shared-types'

type InspectorPanelProps = {
  unit: Unit | null
  action?: Action
  rule?: RuleFired
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

const InspectorPanel = ({ unit, action, rule }: InspectorPanelProps) => {
  return (
    <div className="panel-card inspector-panel" id="inspector-panel">
      <div className="panel-card__header">
        <div>
          <h3>Inspector</h3>
          <p>Selected unit details</p>
        </div>
        <span className="meta-tag">{unit ? 'Active' : 'Idle'}</span>
      </div>
      {!unit ? (
        <div className="inspector-empty">Select a unit marker to inspect its stats.</div>
      ) : (
        <div className="inspector-grid">
          <div>
            <span>Unit</span>
            <span>{unit.type}</span>
          </div>
          <div>
            <span>HP</span>
            <span>{unit.hp}</span>
          </div>
          <div>
            <span>Position</span>
            <span>
              {unit.x}, {unit.y}
            </span>
          </div>
          <div>
            <span>Owner</span>
            <span>{unit.owner_id}</span>
          </div>
          <div>
            <span>Action</span>
            <span>{formatAction(action)}</span>
          </div>
          <div>
            <span>Rule</span>
            <span>{rule?.rule_name ?? '—'}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default InspectorPanel
