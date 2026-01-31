import type { GameState } from 'shared-types'
import { calculateVictoryPointsBreakdown } from '../sim/engine'

type VictoryPanelProps = {
  state: GameState | null
}

const VictoryPanel = ({ state }: VictoryPanelProps) => {
  if (!state) {
    return (
      <div className="panel-card victory-panel">
        <div className="panel-card__header">
          <div>
            <h3>Victory Points</h3>
            <p>Breakdown of current score</p>
          </div>
        </div>
        <div className="victory-empty">Run a trial to see the score breakdown.</div>
      </div>
    )
  }

  const breakdown = calculateVictoryPointsBreakdown(state)

  return (
    <div className="panel-card victory-panel">
      <div className="panel-card__header">
        <div>
          <h3>Victory Points</h3>
          <p>Breakdown of current score</p>
        </div>
        <span className="metric-value">{breakdown.total}</span>
      </div>
      <div className="victory-grid">
        <div className="victory-row">
          <span>Faith</span>
          <span>{breakdown.faith}</span>
        </div>
        <div className="victory-row">
          <span>Devotion</span>
          <span>{breakdown.devotion}</span>
        </div>
        <div className="victory-row">
          <span>Food</span>
          <span>{breakdown.food}</span>
        </div>
        <div className="victory-row">
          <span>Wood</span>
          <span>{breakdown.wood}</span>
        </div>
        <div className="victory-row">
          <span>Units</span>
          <span>{breakdown.units}</span>
        </div>
      </div>
    </div>
  )
}

export default VictoryPanel
