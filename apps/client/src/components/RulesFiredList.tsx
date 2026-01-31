import type { RuleFired } from 'shared-types'

type RulesFiredListProps = {
  rules: RuleFired[]
}

const RulesFiredList = ({ rules }: RulesFiredListProps) => {
  return (
    <div className="panel-card rules-fired">
      <div className="panel-card__header">
        <div>
          <h3>Rules Fired</h3>
          <p>Chronicle of executed doctrine</p>
        </div>
        <span className="meta-tag">{rules.length} events</span>
      </div>
      <div className="rules-list">
        {rules.length === 0 ? (
          <div className="rules-empty">No rules have fired yet.</div>
        ) : (
          rules.map((rule) => (
            <div key={`${rule.rule_id}-${rule.turn}`} className="rule-item">
              <div className="rule-item__title">
                <span>{rule.rule_name}</span>
                <span className="rule-turn">Turn {rule.turn}</span>
              </div>
              <div className="rule-item__meta">
                <span>Weight {rule.weight ?? 0}</span>
                <span>{rule.summary ?? 'Awaiting explanation'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RulesFiredList
