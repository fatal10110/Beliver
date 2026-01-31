import type { DoctrinePolicy } from 'shared-types'

type PolicyPreviewProps = {
  policy: DoctrinePolicy | null
  policyHash?: string
}

const PolicyPreview = ({ policy, policyHash }: PolicyPreviewProps) => {
  const preview = policy ? JSON.stringify(policy, null, 2) : 'Compile scripture to preview the policy JSON.'

  return (
    <div className="panel-card policy-preview">
      <div className="panel-card__header">
        <div>
          <h3>Policy Preview</h3>
          <p>Doctrine policy JSON output</p>
        </div>
        <span className="meta-tag">{policyHash ? `hash ${policyHash}` : 'hash pending'}</span>
      </div>
      <pre className="policy-code">
        <code>{preview}</code>
      </pre>
    </div>
  )
}

export default PolicyPreview
