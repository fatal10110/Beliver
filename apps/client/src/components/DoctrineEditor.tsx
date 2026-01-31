import type { ChangeEvent } from 'react'

export type DoctrineTemplate = {
  id: string
  name: string
  description: string
  snippet: string
}

export type EditorStatus = 'idle' | 'linting' | 'compiling' | 'error' | 'success'

const STATUS_LABELS: Record<EditorStatus, string> = {
  idle: 'Ready',
  linting: 'Linting',
  compiling: 'Compiling',
  error: 'Review needed',
  success: 'Compiled',
}

type DoctrineEditorProps = {
  value: string
  onChange: (value: string) => void
  templates: DoctrineTemplate[]
  activeTemplateId: string
  onTemplateChange: (id: string) => void
  onCompile: () => void
  onLint: () => void
  status: EditorStatus
  statusMessage?: string
}

const DoctrineEditor = ({
  value,
  onChange,
  templates,
  activeTemplateId,
  onTemplateChange,
  onCompile,
  onLint,
  status,
  statusMessage,
}: DoctrineEditorProps) => {
  const activeTemplate = templates.find((template) => template.id === activeTemplateId)

  const handleTemplateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onTemplateChange(event.target.value)
  }

  return (
    <div className="doctrine-editor">
      <div className="editor-toolbar">
        <div className="editor-heading">
          <div className="eyebrow">Scripture Workspace</div>
          <h2>Doctrine Editor</h2>
          <p className="editor-subtitle">
            Draft scripture, lint for clarity, then compile into a deterministic policy.
          </p>
        </div>
        <div className="editor-controls">
          <label className="select-label">
            Template
            <select value={activeTemplateId} onChange={handleTemplateChange}>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </label>
          <div className="editor-actions">
            <button className="button ghost" type="button" onClick={onLint}>
              Lint
            </button>
            <button className="button primary" type="button" onClick={onCompile}>
              Compile Doctrine
            </button>
          </div>
          <div className="status-row">
            <span className="status-pill" data-status={status}>
              {STATUS_LABELS[status]}
            </span>
            <span className="status-message" role="status" aria-live="polite">
              {statusMessage ?? 'Awaiting input.'}
            </span>
          </div>
        </div>
      </div>
      <div className="editor-template-note">
        {activeTemplate?.description ?? 'Select a template to begin.'}
      </div>
      <textarea
        className="editor-textarea"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        aria-label="Doctrine editor"
      />
    </div>
  )
}

export default DoctrineEditor
