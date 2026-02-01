import { useEffect, useMemo, useRef } from 'react'
import {
  ArcRotateCamera,
  Camera,
  Color3,
  Color4,
  Engine,
  HemisphericLight,
  Matrix,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core'
import type { Unit } from 'shared-types'
import { UnitType } from 'shared-types'
import { axialToWorld, buildHexGrid, getGridBounds, getGridOffset, type TerrainType } from '../systems/HexGrid'

const TERRAIN_COLORS: Record<TerrainType, string> = {
  plains: '#b9a984',
  forest: '#5a7a58',
  ridge: '#8a7f72',
  oasis: '#4a8a88',
}

const UNIT_COLORS: Record<UnitType, string> = {
  [UnitType.Acolyte]: '#e1c17b',
  [UnitType.Guardian]: '#d0854c',
  [UnitType.Ranger]: '#6f8f7d',
}

type GameSceneProps = {
  columns?: number
  rows?: number
  size?: number
  seed?: number
  units?: Unit[]
}

const GameScene = ({ columns = 20, rows = 20, size = 1.2, seed = 7123, units = [] }: GameSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const tiles = useMemo(() => buildHexGrid(columns, rows, size, seed), [columns, rows, size, seed])
  const bounds = useMemo(() => getGridBounds(tiles, size), [tiles, size])
  const offset = useMemo(() => getGridOffset(bounds), [bounds])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
    const scene = new Scene(engine)
    scene.clearColor = new Color4(0.06, 0.05, 0.04, 1)

    const camera = new ArcRotateCamera('camera', Math.PI / 4, Math.PI / 2.5, 28, Vector3.Zero(), scene)
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA
    camera.lowerAlphaLimit = camera.upperAlphaLimit = camera.alpha
    camera.lowerBetaLimit = camera.upperBetaLimit = camera.beta
    camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius

    const padding = size * 6
    const orthoWidth = bounds.width + padding
    const orthoHeight = bounds.height + padding
    camera.orthoLeft = -orthoWidth / 2
    camera.orthoRight = orthoWidth / 2
    camera.orthoTop = orthoHeight / 2
    camera.orthoBottom = -orthoHeight / 2

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
    light.intensity = 0.9

    const baseMeshes: Record<TerrainType, { mesh: ReturnType<typeof MeshBuilder.CreateCylinder>; material: StandardMaterial }> = {
      plains: { mesh: MeshBuilder.CreateCylinder('plains', { diameter: size * 1.9, height: 0.18, tessellation: 6 }, scene), material: new StandardMaterial('mat-plains', scene) },
      forest: { mesh: MeshBuilder.CreateCylinder('forest', { diameter: size * 1.9, height: 0.2, tessellation: 6 }, scene), material: new StandardMaterial('mat-forest', scene) },
      ridge: { mesh: MeshBuilder.CreateCylinder('ridge', { diameter: size * 1.9, height: 0.22, tessellation: 6 }, scene), material: new StandardMaterial('mat-ridge', scene) },
      oasis: { mesh: MeshBuilder.CreateCylinder('oasis', { diameter: size * 1.9, height: 0.2, tessellation: 6 }, scene), material: new StandardMaterial('mat-oasis', scene) },
    }

    ;(Object.keys(baseMeshes) as TerrainType[]).forEach((terrain) => {
      const entry = baseMeshes[terrain]
      entry.material.diffuseColor = Color3.FromHexString(TERRAIN_COLORS[terrain])
      entry.material.specularColor = new Color3(0.05, 0.05, 0.05)
      entry.mesh.material = entry.material
      entry.mesh.isVisible = false
    })

    const matricesByTerrain: Record<TerrainType, Matrix[]> = {
      plains: [],
      forest: [],
      ridge: [],
      oasis: [],
    }

    tiles.forEach((tile) => {
      const matrix = Matrix.Translation(tile.x + offset.x, 0, tile.z + offset.z)
      matricesByTerrain[tile.terrain].push(matrix)
    })

    ;(Object.keys(matricesByTerrain) as TerrainType[]).forEach((terrain) => {
      const matrices = matricesByTerrain[terrain]
      const base = baseMeshes[terrain].mesh
      if (matrices.length === 0) {
        return
      }
      const buffer = new Float32Array(matrices.length * 16)
      matrices.forEach((matrix, index) => {
        matrix.copyToArray(buffer, index * 16)
      })
      base.thinInstanceSetBuffer('matrix', buffer, 16)
    })

    units.forEach((unit) => {
      const { x, z } = axialToWorld(unit.x, unit.y, size)
      const marker = MeshBuilder.CreateSphere(`unit-${unit.id}`, { diameter: size * 0.65 }, scene)
      marker.position = new Vector3(x + offset.x, 0.45, z + offset.z)
      const material = new StandardMaterial(`mat-${unit.id}`, scene)
      material.diffuseColor = Color3.FromHexString(UNIT_COLORS[unit.type])
      material.specularColor = new Color3(0.2, 0.2, 0.2)
      marker.material = material
    })

    engine.runRenderLoop(() => {
      scene.render()
    })

    const onResize = () => {
      engine.resize()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      scene.dispose()
      engine.dispose()
    }
  }, [tiles, units, bounds, offset, size])

  return (
    <div className="game-scene">
      <canvas ref={canvasRef} className="game-scene__canvas" />
      <div className="game-scene__legend">
        <span>Plains</span>
        <span>Forest</span>
        <span>Ridge</span>
        <span>Oasis</span>
      </div>
    </div>
  )
}

export default GameScene
