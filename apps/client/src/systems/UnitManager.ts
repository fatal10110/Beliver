import { Color3, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core'
import type { AbstractMesh, Scene } from '@babylonjs/core'
import type { Unit } from 'shared-types'
import { UnitType } from 'shared-types'
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

export class UnitManager {
  private readonly scene: Scene
  private readonly meshes = new Map<string, AbstractMesh>()

  constructor(scene: Scene) {
    this.scene = scene
  }

  sync(units: Unit[], { offset, size, highlightSet, selectedUnitId }: UnitSyncOptions) {
    const nextIds = new Set(units.map((unit) => unit.id))

    this.meshes.forEach((mesh, id) => {
      if (!nextIds.has(id)) {
        mesh.dispose()
        this.meshes.delete(id)
      }
    })

    units.forEach((unit) => {
      const { x, z } = axialToWorld(unit.x, unit.y, size)
      let marker = this.meshes.get(unit.id)
      if (!marker) {
        marker = MeshBuilder.CreateSphere(`unit-${unit.id}`, { diameter: size * 0.85 }, this.scene)
        const material = new StandardMaterial(`mat-${unit.id}`, this.scene)
        material.specularColor = new Color3(0.2, 0.2, 0.2)
        marker.material = material
        marker.metadata = { unitId: unit.id }
        this.meshes.set(unit.id, marker)
      }

      const material = marker.material as StandardMaterial
      const baseColor = Color3.FromHexString(UNIT_COLORS[unit.type])
      const factionColor = Color3.FromHexString(FACTION_COLORS[unit.owner_id] ?? FACTION_COLORS.default)
      material.diffuseColor = mixColors(baseColor, factionColor, 0.35)

      const isSelected = selectedUnitId === unit.id
      const isHighlighted = highlightSet.has(unit.id)
      if (isSelected) {
        material.emissiveColor = baseColor.scale(0.75)
        marker.scaling = new Vector3(1.6, 1.6, 1.6)
      } else if (isHighlighted) {
        material.emissiveColor = baseColor.scale(0.5)
        marker.scaling = new Vector3(1.35, 1.35, 1.35)
      } else {
        material.emissiveColor = baseColor.scale(0.15)
        marker.scaling = new Vector3(1.15, 1.15, 1.15)
      }

      marker.position = new Vector3(x + offset.x, 0.55, z + offset.z)
    })
  }

  dispose() {
    this.meshes.forEach((mesh) => mesh.dispose())
    this.meshes.clear()
  }
}
