import { useEffect, useMemo, useRef, useState } from 'react'
import type { DoctrinePolicy, PolicyComplexity, RuleFired } from 'shared-types'
import ComplexityMeter from './components/ComplexityMeter'
import DoctrineEditor, { type DoctrineTemplate, type EditorStatus } from './components/DoctrineEditor'
import PolicyPreview from './components/PolicyPreview'
import RulesFiredList from './components/RulesFiredList'
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

const SAMPLE_POLICY: DoctrinePolicy = {
  policy_id: 'poc-abrim-001',
  policy_schema_version: '0.1.0',
  engine_version: 'poc-0.1.0',
  weights: {
    build_farm: 0.75,
    build_mine: 0.6,
    train_guardian: 0.45,
  },
  rules: [
    {
      id: 'rule-1',
      name: 'Harvest Priority',
      condition: 'food < 10',
      action: 'build_farm',
      weight: 0.8,
      priority: 1,
    },
    {
      id: 'rule-2',
      name: 'Devotion Stabilizer',
      condition: 'devotion < 6',
      action: 'pray',
      weight: 0.6,
      priority: 2,
    },
    {
      id: 'rule-3',
      name: 'Militia Growth',
      condition: 'units < 4',
      action: 'train_guardian',
      weight: 0.5,
      priority: 3,
    },
  ],
  complexity_usage: 18,
  seeded_personality: 12,
}

const SAMPLE_COMPLEXITY: PolicyComplexity = {
  score: 18,
  budget: 40,
}

const SAMPLE_RULES: RuleFired[] = [
  {
    rule_id: 'rule-1',
    rule_name: 'Harvest Priority',
    turn: 1,
    weight: 0.8,
    summary: 'Food below 10, queued farm build.',
  },
  {
    rule_id: 'rule-2',
    rule_name: 'Devotion Stabilizer',
    turn: 2,
    weight: 0.6,
    summary: 'Devotion low, initiated prayer cycle.',
  },
  {
    rule_id: 'rule-3',
    rule_name: 'Militia Growth',
    turn: 4,
    weight: 0.5,
    summary: 'Units below threshold, training guardian.',
  },
]

const DEFAULT_STATUS: StatusConfig = {
  status: 'idle',
  message: 'Awaiting doctrine input.',
}

function App() {
  const [layout, setLayout] = useState<LayoutMode>('split')
  const [activeTemplateId, setActiveTemplateId] = useState(TEMPLATES[0].id)
  const [doctrine, setDoctrine] = useState(TEMPLATES[0].snippet)
  const [status, setStatus] = useState<StatusConfig>(DEFAULT_STATUS)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const activePolicy = useMemo(() => SAMPLE_POLICY, [])

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
    setDoctrine(template?.snippet ?? '')
    setStatus({ status: 'idle', message: 'Template loaded. Ready to lint or compile.' })
  }

  const handleLint = () => {
    const trimmed = doctrine.trim()
    if (!trimmed) {
      queueStatus({ status: 'error', message: 'Doctrine is empty. Add at least one rule.' })
      return
    }

    const result: StatusConfig =
      trimmed.length < 40
        ? { status: 'error', message: 'Doctrine is too brief. Add more conditions.' }
        : { status: 'success', message: 'Lint passed. Ready to compile.' }

    queueStatus({ status: 'linting', message: 'Linting scripture for clarity.' }, result)
  }

  const handleCompile = () => {
    const trimmed = doctrine.trim()
    if (!trimmed) {
      queueStatus({ status: 'error', message: 'Nothing to compile. Start with a template.' })
      return
    }

    queueStatus(
      { status: 'compiling', message: 'Compiling doctrine into a deterministic policy.' },
      { status: 'success', message: 'Compiled stub policy. Preview updated.' },
    )
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
            value={doctrine}
            onChange={setDoctrine}
            templates={TEMPLATES}
            activeTemplateId={activeTemplateId}
            onTemplateChange={handleTemplateChange}
            onCompile={handleCompile}
            onLint={handleLint}
            status={status.status}
            statusMessage={status.message}
          />
          <div className="debug-grid">
            <ComplexityMeter complexity={SAMPLE_COMPLEXITY} />
            <PolicyPreview policy={activePolicy} policyHash="poc-4e7a" />
            <RulesFiredList rules={SAMPLE_RULES} />
          </div>
        </section>

        <section className="panel game-panel">
          <div className="game-stage">
            <div className="game-stage__label">Game View</div>
            <div className="game-stage__canvas">
              <div className="game-grid" />
            </div>
          </div>
          <div className="game-stage__hint">
            Babylon scene and hex grid will render here once the engine is wired.
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
