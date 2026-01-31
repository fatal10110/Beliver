import type { Action } from 'shared-types'
import { ActionType, ResourceType, UnitType } from 'shared-types'
import type { TurnLogEntry } from '../sim/engine'

type TurnLogProps = {
  entries: TurnLogEntry[]
  maxEntries?: number
}

const formatAction = (action: Action) => {
  switch (action.type) {
    case ActionType.Build: {
      const building = (action.payload?.building as string | undefined) ?? 'structure'
      return `Build ${building}`
    }
    case ActionType.Train: {
      const unit = (action.payload?.unitType as UnitType | undefined) ?? UnitType.Guardian
      return `Train ${unit}`
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

const formatResources = (resources: TurnLogEntry['resources']) =>
  `F ${resources[ResourceType.Faith]} | Fo ${resources[ResourceType.Food]} | W ${resources[ResourceType.Wood]} | D ${resources[ResourceType.Devotion]}`

const TurnLog = ({ entries, maxEntries = 8 }: TurnLogProps) => {
  const visible = entries.slice(-maxEntries).reverse()

  return (
    <div className="panel-card turn-log">
      <div className="panel-card__header">
        <div>
          <h3>Turn Log</h3>
          <p>Deterministic record of each turn</p>
        </div>
        <span className="meta-tag">{entries.length} turns</span>
      </div>
      <div className="turn-log__body">
        {visible.length === 0 ? (
          <div className="turn-log__empty">No turns simulated yet.</div>
        ) : (
          visible.map((entry) => (
            <div key={`turn-${entry.turn}`} className="turn-log__row">
              <div>
                <div className="turn-log__title">Turn {entry.turn}</div>
                <div className="turn-log__meta">{formatAction(entry.action)}</div>
              </div>
              <div className="turn-log__stats">
                <span>VP {entry.victoryPoints}</span>
                <span>{formatResources(entry.resources)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TurnLog
