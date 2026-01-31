import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import type { CompileResult, GameState, RuleFired } from 'shared-types'

type PocStore = {
  doctrineText: string
  setDoctrineText: (value: string) => void
  compileResult: CompileResult | null
  setCompileResult: (value: CompileResult | null) => void
  rulesFired: RuleFired[]
  setRulesFired: (value: RuleFired[]) => void
  simState: GameState | null
  setSimState: (value: GameState | null) => void
}

const PocStoreContext = createContext<PocStore | undefined>(undefined)

type PocStoreProviderProps = {
  children: ReactNode
}

export const PocStoreProvider = ({ children }: PocStoreProviderProps) => {
  const [doctrineText, setDoctrineText] = useState('')
  const [compileResult, setCompileResult] = useState<CompileResult | null>(null)
  const [rulesFired, setRulesFired] = useState<RuleFired[]>([])
  const [simState, setSimState] = useState<GameState | null>(null)

  const value = useMemo(
    () => ({
      doctrineText,
      setDoctrineText,
      compileResult,
      setCompileResult,
      rulesFired,
      setRulesFired,
      simState,
      setSimState,
    }),
    [doctrineText, compileResult, rulesFired, simState],
  )

  return <PocStoreContext.Provider value={value}>{children}</PocStoreContext.Provider>
}

export const usePocStore = () => {
  const context = useContext(PocStoreContext)
  if (!context) {
    throw new Error('usePocStore must be used within PocStoreProvider')
  }
  return context
}
