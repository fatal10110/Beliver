import type { CompileResult, DoctrinePolicy, DoctrineRule, PolicyComplexity } from 'shared-types'

const POLICY_SCHEMA_VERSION = '0.1.0'
const ENGINE_VERSION = 'poc-0.1.0'
const COMPLEXITY_BUDGET = 40

const hashString = (input: string) => {
  let hash = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
  }
  return (hash >>> 0).toString(16).padStart(8, '0')
}

const titleCase = (value: string) =>
  value
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

const parseRules = (doctrine: string) => {
  const warnings: string[] = []
  const rules: DoctrineRule[] = []

  doctrine
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .forEach((line, index) => {
      if (line.startsWith('#')) {
        return
      }

      const match = /^IF\s+(.+?)\s+THEN\s+(.+)$/i.exec(line)
      const elseMatch = /^ELSE\s+(.+)$/i.exec(line)
      if (!match && !elseMatch) {
        warnings.push(`Line ${index + 1} ignored: "${line}"`)
        return
      }

      const condition = match ? match[1] : 'turn >= 0'
      const action = match ? match[2] : elseMatch?.[1] ?? 'wait'
      rules.push({
        id: `rule-${index + 1}`,
        name: titleCase(action),
        condition: condition.trim(),
        action: action.trim(),
        weight: 0.6,
        priority: index + 1,
      })
    })

  return { rules, warnings }
}

const buildComplexity = (doctrine: string, ruleCount: number): PolicyComplexity => {
  const lengthScore = Math.round(doctrine.length / 18)
  const score = Math.max(6, Math.min(COMPLEXITY_BUDGET, ruleCount * 6 + lengthScore))
  const warnings: string[] = []

  if (score > COMPLEXITY_BUDGET * 0.85) {
    warnings.push('Complexity is nearing the Phase 1 budget cap.')
  }

  return { score, budget: COMPLEXITY_BUDGET, warnings }
}

export const compileDoctrine = (doctrine: string): CompileResult => {
  const trimmed = doctrine.trim()
  const { rules, warnings } = parseRules(trimmed)
  const complexity = buildComplexity(trimmed, rules.length)
  const policyHash = hashString(trimmed || 'empty')

  const policy: DoctrinePolicy = {
    policy_id: `poc-${policyHash.slice(0, 6)}`,
    policy_schema_version: POLICY_SCHEMA_VERSION,
    engine_version: ENGINE_VERSION,
    rules,
    complexity_usage: complexity.score,
    weights: rules.reduce<Record<string, number>>((acc, rule) => {
      acc[rule.action] = rule.weight ?? 0.6
      return acc
    }, {}),
    seeded_personality: parseInt(policyHash.slice(0, 4), 16) % 100,
  }

  const errors = rules.length === 0 ? ['No valid rules detected. Use IF ... THEN ... syntax.'] : undefined

  return {
    policy,
    policy_hash: policyHash,
    policy_schema_version: POLICY_SCHEMA_VERSION,
    engine_version: ENGINE_VERSION,
    complexity,
    warnings: warnings.length ? warnings : undefined,
    errors,
  }
}
