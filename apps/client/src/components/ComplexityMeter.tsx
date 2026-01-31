import type { PolicyComplexity } from 'shared-types'

type ComplexityMeterProps = {
  complexity: PolicyComplexity
}

const ComplexityMeter = ({ complexity }: ComplexityMeterProps) => {
  const { score, budget } = complexity
  const ratio = budget > 0 ? Math.min(score / budget, 1) : 0
  const percent = Math.round(ratio * 100)

  return (
    <div className="panel-card complexity-meter">
      <div className="panel-card__header">
        <div>
          <h3>Complexity Budget</h3>
          <p>Rule usage versus budget</p>
        </div>
        <span className="metric-value">
          {score}/{budget}
        </span>
      </div>
      <div className="meter-track" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={budget}>
        <div className="meter-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="meter-footnote">{percent}% of budget used</div>
    </div>
  )
}

export default ComplexityMeter
