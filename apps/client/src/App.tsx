import { useEffect, useMemo, useRef, useState } from 'react'
import type { Action, CompileResult, GameState, PolicyComplexity } from 'shared-types'
import { ActionType, ResourceType } from 'shared-types'
import ComplexityMeter from './components/ComplexityMeter'
import DoctrineEditor, { type DoctrineTemplate, type EditorStatus } from './components/DoctrineEditor'
import GameScene from './components/GameScene'
import PolicyPreview from './components/PolicyPreview'
import RulesFiredList from './components/RulesFiredList'
import RunTrialButton, { type TrialStatus } from './components/RunTrialButton'
import TurnLog from './components/TurnLog'
import VictoryPanel from './components/VictoryPanel'
import { compileDoctrine } from './lib/compilerStub'
import { runSimulation } from './sim/engine'
import { createSingleFactionState, DEFAULT_POC_SEED, POC_PLAYER_ID } from './sim/scenarios/singleFaction'
import { usePocStore } from './state/usePocStore'
import './App.css'

type LayoutMode = 'editor' | 'game' | 'split'

type StatusConfig = {
  status: EditorStatus
  message: string
}

const TEMPLATES: DoctrineTemplate[] = [
  {
    id: 'poc-harvest',
    name: 'Harvest Covenant',
    description: 'Focus on food and wood, keep devotion stable, avoid conflict.',
    snippet: `# Harvest Covenant\n\nIF food < 10 THEN build_farm\nIF wood < 8 THEN build_mine\nIF devotion < 6 THEN pray\nELSE train_guardian`,
  },
  {
    id: 'poc-fortify',
    name: 'Fortify the Border',
    description: 'Prioritize defense, keep a small economy running.',
    snippet: `# Fortify the Border\n\nIF units < 4 THEN train_guardian\nIF wood < 6 THEN build_mine\nIF food < 8 THEN build_farm\nELSE hold_position`,
  },
  {
    id: 'poc-expedition',
    name: 'Expedition Mandate',
    description: 'Scout early and expand quickly when resources allow.',
    snippet: `# Expedition Mandate\n\nIF turn < 5 THEN scout\nIF wood < 7 THEN build_mine\nIF food < 7 THEN build_farm\nELSE advance`,
  },
]

const DEFAULT_STATUS: StatusConfig = {
  status: 'idle',
  message: 'Awaiting doctrine input.',
}

const FALLBACK_COMPLEXITY: PolicyComplexity = {
  score: 0,
  budget: 40,
}

const formatResources = (resources: Record<ResourceType, number>) =>
  `Faith ${resources[ResourceType.Faith]} | Food ${resources[ResourceType.Food]} | Wood ${resources[ResourceType.Wood]} | Devotion ${resources[ResourceType.Devotion]}`

const formatAction = (action?: Action) => {
  if (!action) return 'None'
  switch (action.type) {
    case ActionType.Build:
      return `Build ${(action.payload?.building as string | undefined) ?? 'structure'}`
    case ActionType.Train:
      return `Train ${(action.payload?.unitType as string | undefined) ?? 'unit'}`
    case ActionType.Move:
      return 'Move'
    case ActionType.Pray:
      return 'Pray'
    case ActionType.Harvest:
      return 'Harvest'
    case ActionType.Wait:
    default:
      return 'Wait'
  }
}

function App() {
  const [layout, setLayout] = useState<LayoutMode>('split')
  const [activeTemplateId, setActiveTemplateId] = useState(TEMPLATES[0].id)
  const [status, setStatus] = useState<StatusConfig>(DEFAULT_STATUS)
  const [trialStatus, setTrialStatus] = useState<TrialStatus>('idle')
  const [trialSummary, setTrialSummary] = useState<string>()
  const [playbackTimeline, setPlaybackTimeline] = useState<GameState[] | null>(null)
  const [playbackIndex, setPlaybackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const runTimeoutRef = useRef<number | null>(null)
  const playbackTimerRef = useRef<number | null>(null)

  const {
    doctrineText,
    setDoctrineText,
    compileResult,
    setCompileResult,
    rulesFired,
    setRulesFired,
    simState,
    setSimState,
    turnLog,
    setTurnLog,
  } = usePocStore()

  useEffect(() => {
    if (!doctrineText) {
      setDoctrineText(TEMPLATES[0].snippet)
    }
  }, [doctrineText, setDoctrineText])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (runTimeoutRef.current) {
        window.clearTimeout(runTimeoutRef.current)
        runTimeoutRef.current = null
      }
      if (playbackTimerRef.current) {
        window.clearInterval(playbackTimerRef.current)
        playbackTimerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!isPlaying || !playbackTimeline || playbackTimeline.length === 0) {
      if (playbackTimerRef.current) {
        window.clearInterval(playbackTimerRef.current)
        playbackTimerRef.current = null
      }
      return
    }

    playbackTimerRef.current = window.setInterval(() => {
      setPlaybackIndex((prev) => {
        if (!playbackTimeline) return prev
        if (prev >= playbackTimeline.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 350)

    return () => {
      if (playbackTimerRef.current) {
        window.clearInterval(playbackTimerRef.current)
        playbackTimerRef.current = null
      }
    }
  }, [isPlaying, playbackTimeline])

  const queueStatus = (nextStatus: StatusConfig, settleStatus?: StatusConfig) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setStatus(nextStatus)

    if (settleStatus) {
      timeoutRef.current = window.setTimeout(() => {
        setStatus(settleStatus)
        timeoutRef.current = null
      }, 750)
    }
  }

  const handleTemplateChange = (templateId: string) => {
    const template = TEMPLATES.find((item) => item.id === templateId)
    setActiveTemplateId(templateId)
    setDoctrineText(template?.snippet ?? '')
    setCompileResult(null)
    setRulesFired([])
    setSimState(null)
    setTurnLog([])
    setTrialStatus('idle')
    setTrialSummary(undefined)
    setStatus({ status: 'idle', message: 'Template loaded. Ready to lint or compile.' })
  }

  const handleDoctrineChange = (value: string) => {
    setDoctrineText(value)
    if (compileResult) {
      setCompileResult(null)
    }
    setRulesFired([])
    setSimState(null)
    setTurnLog([])
    setTrialStatus('idle')
    setTrialSummary(undefined)
    setStatus(DEFAULT_STATUS)
  }

  const handleLint = () => {
    const trimmed = doctrineText.trim()
    if (!trimmed) {
      queueStatus({ status: 'error', message: 'Doctrine is empty. Add at least one rule.' })
      return
    }

    const lintResult = compileDoctrine(trimmed)
    if (lintResult.errors?.length) {
      queueStatus({ status: 'error', message: lintResult.errors[0] })
      return
    }

    if (lintResult.warnings?.length) {
      queueStatus({ status: 'linting', message: 'Linting scripture for clarity.' }, {
        status: 'success',
        message: `Lint passed with ${lintResult.warnings.length} warning(s).`,
      })
      return
    }

    queueStatus({ status: 'linting', message: 'Linting scripture for clarity.' }, { status: 'success', message: 'Lint passed. Ready to compile.' })
  }

  const handleCompile = () => {
    const trimmed = doctrineText.trim()
    if (!trimmed) {
      queueStatus({ status: 'error', message: 'Nothing to compile. Start with a template.' })
      return
    }

    const result = compileDoctrine(trimmed)
    setRulesFired([])
    setSimState(null)
    setTurnLog([])
    setTrialStatus('idle')
    setTrialSummary(undefined)
    if (result.errors?.length) {
      setCompileResult(result)
      queueStatus({ status: 'error', message: result.errors[0] })
      return
    }

    setCompileResult(result)

    queueStatus(
      { status: 'compiling', message: 'Compiling doctrine into a deterministic policy.' },
      {
        status: 'success',
        message: result.warnings?.length
          ? `Compiled with ${result.warnings.length} warning(s).`
          : 'Compiled stub policy. Preview updated.',
      },
    )
  }

  const resolveCompileResult = (): CompileResult | null => {
    if (compileResult) {
      return compileResult
    }
    const trimmed = doctrineText.trim()
    if (!trimmed) {
      return null
    }
    const result = compileDoctrine(trimmed)
    setCompileResult(result)
    return result
  }

  const handleRunTrial = () => {
    if (runTimeoutRef.current) {
      window.clearTimeout(runTimeoutRef.current)
      runTimeoutRef.current = null
    }
    if (playbackTimerRef.current) {
      window.clearInterval(playbackTimerRef.current)
      playbackTimerRef.current = null
    }
    setIsPlaying(false)
    setPlaybackTimeline(null)
    setPlaybackIndex(0)

    const result = resolveCompileResult()
    if (!result || result.errors?.length) {
      setStatus({ status: 'error', message: result?.errors?.[0] ?? 'Compile doctrine before running a trial.' })
      return
    }

    setTrialStatus('running')
    setTrialSummary('Simulating 50 turns with deterministic seed...')

    runTimeoutRef.current = window.setTimeout(() => {
      const initialState = createSingleFactionState(DEFAULT_POC_SEED)
      const simulation = runSimulation({
        initialState,
        policy: result.policy,
        playerId: POC_PLAYER_ID,
      })

      setSimState(simulation.finalState)
      setRulesFired(simulation.rulesFired)
      setTurnLog(simulation.turnLog)
      setTrialStatus('complete')
      setPlaybackTimeline(simulation.turnStates)
      setPlaybackIndex(0)
      setIsPlaying(true)

      const vp = simulation.finalState.victory_points[POC_PLAYER_ID] ?? 0
      const resourceSummary = formatResources(simulation.finalState.resources)
      setTrialSummary(`Complete: ${simulation.finalState.turn} turns | VP ${vp} | ${resourceSummary}`)
      runTimeoutRef.current = null
    }, 350)
  }

  const complexity = compileResult?.complexity ?? FALLBACK_COMPLEXITY
  const fallbackState = useMemo(() => createSingleFactionState(DEFAULT_POC_SEED), [])
  const displayState =
    playbackTimeline && playbackTimeline.length > 0
      ? playbackTimeline[Math.min(playbackIndex, playbackTimeline.length - 1)]
      : simState
  const sceneUnits = displayState?.units ?? fallbackState.units
  const sceneSeed = displayState?.seed ?? DEFAULT_POC_SEED
  const playbackMaxTurn =
    playbackTimeline && playbackTimeline.length > 0
      ? playbackTimeline[playbackTimeline.length - 1]?.turn ?? 0
      : simState?.turn ?? 0
  const playbackTurn = playbackTimeline ? displayState?.turn ?? 0 : simState?.turn ?? 0
  const playbackReady = (playbackTimeline?.length ?? 0) > 0
  const playbackEntry = playbackTurn > 0 ? turnLog[playbackTurn - 1] : undefined
  const playbackRule = playbackTurn > 0 ? rulesFired.find((rule) => rule.turn === playbackTurn) : undefined
  const highlightUnits = useMemo(() => {
    if (!playbackTimeline || playbackTurn === 0 || !displayState) return []
    const previous = playbackTimeline[Math.max(playbackTurn - 1, 0)]
    const prevMap = new Map(previous.units.map((unit) => [unit.id, unit]))
    return displayState.units
      .filter((unit) => {
        const prev = prevMap.get(unit.id)
        return prev ? prev.x !== unit.x || prev.y !== unit.y : false
      })
      .map((unit) => unit.id)
  }, [displayState, playbackTimeline, playbackTurn])
  const handleTogglePlayback = () => {
    if (!playbackReady) return
    if (isPlaying) {
      setIsPlaying(false)
      return
    }
    setPlaybackIndex((prev) => (prev >= playbackMaxTurn ? 0 : prev))
    setIsPlaying(true)
  }

  return (
    <div className={`app layout-${layout}`}>
      <header className="app-header">
        <div className="title-block">
          <div className="eyebrow">Sons of Abrim</div>
          <h1 className="app-title">Doctrine Workbench</h1>
          <p className="title-subtext">Draft scripture, validate intent, and stage a deterministic trial.</p>
        </div>
        <div className="mode-toggle" role="group" aria-label="Layout mode">
          {(['editor', 'split', 'game'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              className="mode-button"
              data-active={layout === mode}
              aria-pressed={layout === mode}
              onClick={() => setLayout(mode)}
            >
              {mode === 'editor' && 'Editor'}
              {mode === 'split' && 'Split'}
              {mode === 'game' && 'Game'}
            </button>
          ))}
        </div>
      </header>

      <main className="app-main">
        <section className="panel editor-panel">
          <DoctrineEditor
            value={doctrineText}
            onChange={handleDoctrineChange}
            templates={TEMPLATES}
            activeTemplateId={activeTemplateId}
            onTemplateChange={handleTemplateChange}
            onCompile={handleCompile}
            onLint={handleLint}
            status={status.status}
            statusMessage={status.message}
          />
          <div className="debug-grid">
            <ComplexityMeter complexity={complexity} />
            <PolicyPreview policy={compileResult?.policy ?? null} policyHash={compileResult?.policy_hash} />
            <RulesFiredList rules={rulesFired} />
          </div>
        </section>

        <section className="panel game-panel">
          <div className="game-stage">
          <div className="game-stage__label">Game View</div>
          <div className="game-stage__canvas">
              <GameScene seed={sceneSeed} units={sceneUnits} highlightUnits={highlightUnits} />
          </div>
        </div>
        <div className="game-stage__hint">
          Client-only, non-authoritative preview. Babylon scene and hex grid will render here once the engine is wired.
        </div>
        <div className="playback-controls">
          <button
            type="button"
            className="playback-button"
            onClick={handleTogglePlayback}
            disabled={!playbackReady}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <input
            type="range"
            min={0}
            max={playbackMaxTurn}
            value={playbackTurn}
            onChange={(event) => {
              const next = Number(event.target.value)
              setPlaybackIndex(next)
              setIsPlaying(false)
            }}
            disabled={!playbackReady}
          />
          <div className="playback-readout">
            Turn {playbackTurn} / {playbackMaxTurn}
          </div>
        </div>
        <div className="playback-meta">
          <div>Action: {formatAction(playbackEntry?.action)}</div>
          <div>Rule: {playbackRule?.rule_name ?? '—'}</div>
          <div>Units: {displayState?.units.length ?? 0}</div>
        </div>
        <RunTrialButton status={trialStatus} onRun={handleRunTrial} summary={trialSummary} />
        {displayState ? (
          <div className="trial-metadata">
            <div>Seed: {displayState.seed}</div>
            <div>Turn: {displayState.turn} / {displayState.max_turns}</div>
            <div>VP: {displayState.victory_points[POC_PLAYER_ID] ?? 0}</div>
          </div>
        ) : (
          <div className="trial-metadata empty">No trial run yet.</div>
        )}
        <div className="game-panels">
          <VictoryPanel state={simState} />
          <TurnLog entries={turnLog} />
        </div>
      </section>
      </main>
    </div>
  )
}

export default App
