import { create } from 'zustand'

type SelectedHex = { x: number; y: number } | null

type GameStore = {
  selectedUnitId: string | null
  selectedHex: SelectedHex
  setSelectedUnitId: (id: string | null) => void
  setSelectedHex: (hex: SelectedHex) => void
  clearSelection: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  selectedUnitId: null,
  selectedHex: null,
  setSelectedUnitId: (id) => set({ selectedUnitId: id, selectedHex: null }),
  setSelectedHex: (hex) => set({ selectedHex: hex, selectedUnitId: null }),
  clearSelection: () => set({ selectedUnitId: null, selectedHex: null }),
}))
