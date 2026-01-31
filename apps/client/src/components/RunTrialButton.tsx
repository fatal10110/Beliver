export type TrialStatus = 'idle' | 'running' | 'complete'

type RunTrialButtonProps = {
  status: TrialStatus
  onRun: () => void
  summary?: string
}

const RunTrialButton = ({ status, onRun, summary }: RunTrialButtonProps) => {
  const isRunning = status === 'running'

  return (
    <div className="run-trial">
      <button className="button primary" type="button" onClick={onRun} disabled={isRunning}>
        {isRunning ? 'Running Trial...' : 'Run Trial'}
      </button>
      <div className="run-trial__status" role="status" aria-live="polite">
        {summary ?? 'Simulate a 50-turn trial to validate the doctrine.'}
      </div>
    </div>
  )
}

export default RunTrialButton
