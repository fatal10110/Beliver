import { Color3, Mesh, MeshBuilder, SceneLoader, StandardMaterial, Vector3 } from '@babylonjs/core'
import type { AbstractMesh, Scene } from '@babylonjs/core'
import type { Unit } from 'shared-types'
import { UnitType } from 'shared-types'
import '@babylonjs/loaders'
import { axialToWorld } from './HexGrid'

const UNIT_COLORS: Record<UnitType, string> = {
  [UnitType.Acolyte]: '#e1c17b',
  [UnitType.Guardian]: '#d0854c',
  [UnitType.Ranger]: '#6f8f7d',
}

const FACTION_COLORS: Record<string, string> = {
  abrim: '#d9b16f',
  default: '#9f8f7a',
}

type UnitAssetManifest = {
  units?: Partial<Record<UnitType, string[]>>
}

type UnitBase = {
  mesh: Mesh
  baseScale: number
  baseOffset: number
}

const mixColors = (base: Color3, tint: Color3, weight: number) =>
  new Color3(
    base.r * (1 - weight) + tint.r * weight,
    base.g * (1 - weight) + tint.g * weight,
    base.b * (1 - weight) + tint.b * weight,
  )

type UnitSyncOptions = {
  offset: { x: number; z: number }
  size: number
  highlightSet: Set<string>
  selectedUnitId?: string | null
}

type UnitAssetStatus = {
  loaded: number
  total: number
  failed: number
}

type UnitVisual = {
  mesh: AbstractMesh
  type: UnitType
  usesFallback: boolean
}

type UnitManagerOptions = {
  onAssetStatus?: (status: UnitAssetStatus) => void
}

const UNIT_MANIFEST_URL = '/assets/manifest.json'
const DEFAULT_UNIT_ASSETS: Record<UnitType, string[]> = {
  [UnitType.Acolyte]: [],
  [UnitType.Guardian]: [],
  [UnitType.Ranger]: [],
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const isSceneDisposed = (scene: Scene) => scene.isDisposed || scene.getEngine().isDisposed
const isSceneDisposalError = (error: unknown) =>
  error instanceof Error && /Scene has been disposed/i.test(error.message)

const loadUnitManifest = async (): Promise<Record<UnitType, string[]>> => {
  try {
    const response = await fetch(UNIT_MANIFEST_URL, { cache: 'no-store' })
    if (!response.ok) {
      return DEFAULT_UNIT_ASSETS
    }
    const data = (await response.json()) as UnitAssetManifest
    return {
      [UnitType.Acolyte]: data.units?.[UnitType.Acolyte] ?? [],
      [UnitType.Guardian]: data.units?.[UnitType.Guardian] ?? [],
      [UnitType.Ranger]: data.units?.[UnitType.Ranger] ?? [],
    }
  } catch (error) {
    return DEFAULT_UNIT_ASSETS
  }
}

const pickRenderableMesh = (meshes: AbstractMesh[]) =>
  meshes.find((mesh): mesh is Mesh => mesh instanceof Mesh && mesh.getTotalVertices() > 0)

const detachMesh = (mesh: Mesh) => {
  if (mesh.parent) {
    mesh.parent = null
  }
}

const expandUrls = (urls: string[]) => {
  const expanded: string[] = []
  urls.forEach((url) => {
    if (!url) return
    expanded.push(url)
    const encoded = encodeURI(url)
    if (encoded !== url) {
      expanded.push(encoded)
    }
  })
  return Array.from(new Set(expanded))
}

const tryLoadMesh = async (scene: Scene, url: string) => {
  const lastSlash = url.lastIndexOf('/')
  const rootUrl = lastSlash >= 0 ? url.slice(0, lastSlash + 1) : ''
  const fileName = lastSlash >= 0 ? url.slice(lastSlash + 1) : url
  return SceneLoader.ImportMeshAsync('', rootUrl, fileName, scene)
}

const tryLoadMeshWithFullUrl = async (scene: Scene, url: string) =>
  SceneLoader.ImportMeshAsync('', '', url, scene)

const loadMeshFromUrls = async (scene: Scene, urls: string[]): Promise<Mesh | null> => {
  if (isSceneDisposed(scene)) return null
  for (const url of expandUrls(urls)) {
    if (isSceneDisposed(scene)) return null
    let result
    try {
      result = await tryLoadMesh(scene, url)
    } catch (error) {
      if (isSceneDisposed(scene) || isSceneDisposalError(error)) {
        return null
      }
      try {
        result = await tryLoadMeshWithFullUrl(scene, url)
      } catch (fallbackError) {
        if (isSceneDisposed(scene) || isSceneDisposalError(fallbackError)) {
          return null
        }
        // eslint-disable-next-line no-console
        console.warn(`[assets] Failed to load ${url}`, fallbackError)
        continue
      }
    }
    if (isSceneDisposed(scene)) {
      result.meshes.forEach((mesh) => mesh.dispose())
      return null
    }
    const picked = pickRenderableMesh(result.meshes)
    if (picked) {
      detachMesh(picked)
    }
    result.meshes.forEach((mesh) => {
      if (mesh !== picked) {
        mesh.setEnabled(false)
      }
    })
    if (!picked) {
      continue
    }
    picked.isPickable = false
    picked.position = Vector3.Zero()
    picked.rotationQuaternion = null
    picked.rotation = Vector3.Zero()
    return picked
  }
  return null
}

const getMeshMetrics = (mesh: Mesh) => {
  mesh.refreshBoundingInfo(true)
  mesh.computeWorldMatrix(true)
  const bounds = mesh.getBoundingInfo().boundingBox
  const height = bounds.maximumWorld.y - bounds.minimumWorld.y
  const minY = bounds.minimumWorld.y
  return { height: height || 1, minY }
}

export class UnitManager {
  private readonly scene: Scene
  private readonly onAssetStatus?: (status: UnitAssetStatus) => void
  private readonly visuals = new Map<string, UnitVisual>()
  private readonly unitBases: Partial<Record<UnitType, UnitBase>> = {}
  private manifestPromise: Promise<Record<UnitType, string[]>> | null = null
  private lastUnits: Unit[] | null = null
  private lastOptions: UnitSyncOptions | null = null
  private disposed = false
  private readonly assetStatus: UnitAssetStatus = {
    loaded: 0,
    total: Object.values(UnitType).length,
    failed: 0,
  }
  private readonly assetStatusReported = new Set<UnitType>()

  constructor(scene: Scene, options?: UnitManagerOptions) {
    this.scene = scene
    this.onAssetStatus = options?.onAssetStatus
    void this.ensureUnitBases()
  }

  sync(units: Unit[], { offset, size, highlightSet, selectedUnitId }: UnitSyncOptions) {
    this.lastUnits = units
    this.lastOptions = {
      offset,
      size,
      highlightSet: new Set(highlightSet),
      selectedUnitId,
    }
    void this.ensureUnitBases()
    const nextIds = new Set(units.map((unit) => unit.id))

    this.visuals.forEach((visual, id) => {
      if (!nextIds.has(id)) {
        visual.mesh.dispose()
        this.visuals.delete(id)
      }
    })

    units.forEach((unit) => {
      const { x, z } = axialToWorld(unit.x, unit.y, size)
      let visual = this.visuals.get(unit.id)
      const base = this.unitBases[unit.type]
      if (!visual || (visual.usesFallback && base)) {
        visual?.mesh.dispose()
        let marker: Mesh | null = null
        let usesFallback = true
        if (base) {
          const clone = base.mesh.clone(`unit-${unit.id}`)
          if (clone) {
            marker = clone
            usesFallback = false
          }
        }
        if (!marker) {
          marker = MeshBuilder.CreateSphere(`unit-${unit.id}`, { diameter: size * 0.85 }, this.scene)
        }
        if (!marker) {
          return
        }
        marker.setEnabled(true)
        marker.isPickable = true
        marker.rotationQuaternion = null
        marker.rotation = Vector3.Zero()
        const material = new StandardMaterial(`mat-${unit.id}`, this.scene)
        material.specularColor = new Color3(0.2, 0.2, 0.2)
        marker.material = material
        marker.metadata = { unitId: unit.id }
        visual = { mesh: marker, type: unit.type, usesFallback }
        this.visuals.set(unit.id, visual)
      }

      const marker = visual.mesh
      const material = marker.material as StandardMaterial
      const baseColor = Color3.FromHexString(UNIT_COLORS[unit.type])
      const factionColor = Color3.FromHexString(FACTION_COLORS[unit.owner_id] ?? FACTION_COLORS.default)
      material.diffuseColor = mixColors(baseColor, factionColor, 0.35)

      const isSelected = selectedUnitId === unit.id
      const isHighlighted = highlightSet.has(unit.id)
      const baseScale = base ? base.baseScale * size : 1
      const scaleMultiplier = isSelected ? 1.6 : isHighlighted ? 1.35 : 1.15
      if (isSelected) {
        material.emissiveColor = baseColor.scale(0.75)
      } else if (isHighlighted) {
        material.emissiveColor = baseColor.scale(0.5)
      } else {
        material.emissiveColor = baseColor.scale(0.15)
      }

      marker.scaling = new Vector3(baseScale * scaleMultiplier, baseScale * scaleMultiplier, baseScale * scaleMultiplier)
      const yOffset = base ? base.baseOffset * size : 0
      marker.position = new Vector3(x + offset.x, 0.55 + yOffset, z + offset.z)
    })
  }

  dispose() {
    this.disposed = true
    this.visuals.forEach((visual) => visual.mesh.dispose())
    this.visuals.clear()
    Object.values(this.unitBases).forEach((base) => base?.mesh.dispose())
  }

  private async ensureUnitBases() {
    if (this.manifestPromise) {
      return
    }
    this.manifestPromise = loadUnitManifest()
    const manifest = await this.manifestPromise
    await Promise.all(
      (Object.values(UnitType) as UnitType[]).map(async (unitType) => {
        if (this.assetStatusReported.has(unitType)) return
        if (this.unitBases[unitType]) {
          this.assetStatus.loaded += 1
          this.assetStatusReported.add(unitType)
          this.onAssetStatus?.({ ...this.assetStatus })
          return
        }
        const urls = manifest[unitType] ?? []
        const baseMesh = urls.length > 0 ? await loadMeshFromUrls(this.scene, urls) : null
        if (this.disposed) {
          baseMesh?.dispose()
          return
        }
        if (!baseMesh) {
          this.assetStatus.failed += 1
          this.assetStatusReported.add(unitType)
          this.onAssetStatus?.({ ...this.assetStatus })
          return
        }
        baseMesh.setEnabled(false)
        const metrics = getMeshMetrics(baseMesh)
        const targetHeight = 0.85
        const baseScale = clamp(targetHeight / metrics.height, 0.2, 5)
        const baseOffset = -metrics.minY * baseScale
        this.unitBases[unitType] = { mesh: baseMesh, baseScale, baseOffset }
        this.assetStatus.loaded += 1
        this.assetStatusReported.add(unitType)
        this.onAssetStatus?.({ ...this.assetStatus })
        this.refreshFromCache()
      }),
    )
  }

  private refreshFromCache() {
    if (!this.lastUnits || !this.lastOptions) return
    if (this.disposed) return
    this.sync(this.lastUnits, {
      ...this.lastOptions,
      highlightSet: new Set(this.lastOptions.highlightSet),
    })
  }
}
