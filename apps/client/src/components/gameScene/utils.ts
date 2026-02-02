import type { AssetStatus } from './types'

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const formatAssetCount = ({ loaded, total }: AssetStatus) => (total > 0 ? `${loaded}/${total}` : '—')
