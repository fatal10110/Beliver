export const ENGINE_VERSION = 'poc-0.1.0'

export type EngineStatus = {
  ready: boolean
  message: string
}

export const getEngineStatus = (): EngineStatus => ({
  ready: false,
  message: 'Game engine package scaffolded; implementation pending.',
})
