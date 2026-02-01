import type { Action, Unit } from 'shared-types'
import { ActionType, UnitType } from 'shared-types'

type ActionPanelProps = {
  selectedUnit: Unit | null
  action?: Action
  canReplay: boolean
  onInspect: () => void
  onExplain: () => void
  onReplay: () => void
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

const ActionPanel = ({ selectedUnit, action, canReplay, onInspect, onExplain, onReplay }: ActionPanelProps) => {
  return (
    <div className="panel-card action-panel">
      <div className="panel-card__header">
        <div>
          <h3>Action Panel</h3>
          <p>Quick commands for the current turn</p>
        </div>
        <span className="meta-tag">{selectedUnit ? 'Unit Selected' : 'No Selection'}</span>
      </div>
      <div className="action-panel__summary">
        <div>
          <span>Selected</span>
          <span>{selectedUnit ? `${selectedUnit.type} (${selectedUnit.id})` : 'None'}</span>
        </div>
        <div>
          <span>Action</span>
          <span>{formatAction(action)}</span>
        </div>
      </div>
      <div className="action-panel__buttons">
        <button type="button" onClick={onInspect} disabled={!selectedUnit}>
          Inspect
        </button>
        <button type="button" onClick={onExplain} disabled={!action}>
          Explain
        </button>
        <button type="button" onClick={onReplay} disabled={!canReplay}>
          Replay
        </button>
      </div>
    </div>
  )
}

export default ActionPanel
