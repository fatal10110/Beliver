type OracleEntry = {
  id: string
  text: string
  turn?: number
}

type OracleFeedProps = {
  entries: OracleEntry[]
  enabled: boolean
  onToggle: () => void
}

const OracleFeed = ({ entries, enabled, onToggle }: OracleFeedProps) => {
  return (
    <div className="panel-card oracle-feed">
      <div className="panel-card__header">
        <div>
          <h3>Oracle Feed</h3>
          <p>Global agent chatter</p>
        </div>
        <button type="button" className="oracle-toggle" onClick={onToggle}>
          {enabled ? 'Spectator On' : 'Spectator Off'}
        </button>
      </div>
      {!enabled ? (
        <div className="oracle-empty">Enable Spectator Mode to view the feed.</div>
      ) : (
        <div className="oracle-body">
          {entries.length === 0 ? (
            <div className="oracle-empty">No oracle messages yet.</div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="oracle-row">
                <span>{entry.turn != null ? `T${entry.turn}` : '—'}</span>
                <span>{entry.text}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export type { OracleEntry }
export default OracleFeed
