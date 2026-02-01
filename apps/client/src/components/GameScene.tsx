import { useEffect, useMemo, useRef } from 'react'
import type { AbstractMesh } from '@babylonjs/core'
import {
  ArcRotateCamera,
  Camera,
  Color3,
  Color4,
  Engine,
  HemisphericLight,
  Matrix,
  MeshBuilder,
  Quaternion,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core'
import type { Unit } from 'shared-types'
import { UnitType } from 'shared-types'
import '@babylonjs/loaders'
import {
  axialToWorld,
  buildHexGrid,
  getGridBounds,
  getGridOffset,
  type HexTile,
  type TerrainType,
} from '../systems/HexGrid'

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

type DecorationKind = 'tree' | 'rock'

type DecorationInstance = {
  kind: DecorationKind
  x: number
  z: number
  scale: number
  rotation: number
}

type GameSceneProps = {
  columns?: number
  rows?: number
  size?: number
  seed?: number
  units?: Unit[]
  highlightUnits?: string[]
}

const createSeededRng = (seedValue: number) => {
  let seed = seedValue >>> 0
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 0xffffffff
  }
}

const buildDecorations = (tiles: HexTile[], seed: number, size: number): DecorationInstance[] => {
  const decorations: DecorationInstance[] = []

  tiles.forEach((tile) => {
    const rng = createSeededRng(seed ^ (tile.q * 92837111) ^ (tile.r * 689287499))

    if (tile.terrain === 'forest') {
      const roll = rng()
      if (roll < 0.42) {
        const count = roll > 0.32 ? 2 : 1
        for (let i = 0; i < count; i += 1) {
          decorations.push({
            kind: 'tree',
            x: tile.x + (rng() - 0.5) * size * 0.7,
            z: tile.z + (rng() - 0.5) * size * 0.7,
            scale: 0.75 + rng() * 0.5,
            rotation: rng() * Math.PI * 2,
          })
        }
      }
    }

    if (tile.terrain === 'ridge') {
      const roll = rng()
      if (roll < 0.35) {
        decorations.push({
          kind: 'rock',
          x: tile.x + (rng() - 0.5) * size * 0.6,
          z: tile.z + (rng() - 0.5) * size * 0.6,
          scale: 0.6 + rng() * 0.4,
          rotation: rng() * Math.PI * 2,
        })
      }
    }
  })

  return decorations
}

const GameScene = ({
  columns = 20,
  rows = 20,
  size = 1.2,
  seed = 7123,
  units = [],
  highlightUnits = [],
}: GameSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sceneRef = useRef<Scene | null>(null)
  const unitMeshesRef = useRef<Map<string, AbstractMesh>>(new Map())
  const tiles = useMemo(() => buildHexGrid(columns, rows, size, seed), [columns, rows, size, seed])
  const decorations = useMemo(() => buildDecorations(tiles, seed, size), [tiles, seed, size])
  const bounds = useMemo(() => getGridBounds(tiles, size), [tiles, size])
  const offset = useMemo(() => getGridOffset(bounds), [bounds])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
    const scene = new Scene(engine)
    sceneRef.current = scene
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

    const baseMeshes: Record<
      TerrainType,
      { mesh: ReturnType<typeof MeshBuilder.CreateCylinder>; material: StandardMaterial }
    > = {
      plains: {
        mesh: MeshBuilder.CreateCylinder('plains', { diameter: size * 1.9, height: 0.18, tessellation: 6 }, scene),
        material: new StandardMaterial('mat-plains', scene),
      },
      forest: {
        mesh: MeshBuilder.CreateCylinder('forest', { diameter: size * 1.9, height: 0.2, tessellation: 6 }, scene),
        material: new StandardMaterial('mat-forest', scene),
      },
      ridge: {
        mesh: MeshBuilder.CreateCylinder('ridge', { diameter: size * 1.9, height: 0.22, tessellation: 6 }, scene),
        material: new StandardMaterial('mat-ridge', scene),
      },
      oasis: {
        mesh: MeshBuilder.CreateCylinder('oasis', { diameter: size * 1.9, height: 0.2, tessellation: 6 }, scene),
        material: new StandardMaterial('mat-oasis', scene),
      },
    }

    ;(Object.keys(baseMeshes) as TerrainType[]).forEach((terrain) => {
      const entry = baseMeshes[terrain]
      entry.material.diffuseColor = Color3.FromHexString(TERRAIN_COLORS[terrain])
      entry.material.specularColor = new Color3(0.05, 0.05, 0.05)
      entry.mesh.material = entry.material
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

    const applyBaseTranslation = (
      mesh: ReturnType<typeof MeshBuilder.CreateCylinder>,
      matrix: Matrix,
    ) => {
      mesh.position.copyFrom(matrix.getTranslation())
    }

    ;(Object.keys(matricesByTerrain) as TerrainType[]).forEach((terrain) => {
      const matrices = matricesByTerrain[terrain]
      const base = baseMeshes[terrain].mesh
      if (matrices.length === 0) {
        return
      }

      applyBaseTranslation(base, matrices[0])

      if (matrices.length > 1) {
        const buffer = new Float32Array((matrices.length - 1) * 16)
        matrices.slice(1).forEach((matrix, index) => {
          matrix.copyToArray(buffer, index * 16)
        })
        base.thinInstanceSetBuffer('matrix', buffer, 16)
      }

      base.thinInstanceRefreshBoundingInfo(true)
    })

    const treeMesh = MeshBuilder.CreateCylinder(
      'tree',
      { diameterTop: size * 0.2, diameterBottom: size * 0.45, height: size * 1.3, tessellation: 6 },
      scene,
    )
    const rockMesh = MeshBuilder.CreateSphere('rock', { diameter: size * 0.65, segments: 5 }, scene)
    const treeMaterial = new StandardMaterial('mat-tree', scene)
    treeMaterial.diffuseColor = Color3.FromHexString('#3f6b4e')
    treeMaterial.specularColor = new Color3(0.1, 0.1, 0.1)
    treeMesh.material = treeMaterial

    const rockMaterial = new StandardMaterial('mat-rock', scene)
    rockMaterial.diffuseColor = Color3.FromHexString('#6f6a63')
    rockMaterial.specularColor = new Color3(0.12, 0.12, 0.12)
    rockMesh.material = rockMaterial

    const decorMatrices: Record<DecorationKind, Matrix[]> = {
      tree: [],
      rock: [],
    }

    decorations.forEach((decor) => {
      const yOffset = decor.kind === 'tree' ? (size * 1.3 * decor.scale) / 2 : (size * 0.65 * decor.scale) / 2
      const matrix = Matrix.Compose(
        new Vector3(decor.scale, decor.scale, decor.scale),
        Quaternion.FromEulerAngles(0, decor.rotation, 0),
        new Vector3(decor.x + offset.x, yOffset, decor.z + offset.z),
      )
      decorMatrices[decor.kind].push(matrix)
    })

    const applyBaseTransform = (
      mesh: ReturnType<typeof MeshBuilder.CreateCylinder> | ReturnType<typeof MeshBuilder.CreateSphere>,
      matrix: Matrix,
    ) => {
      const scaling = new Vector3()
      const rotation = new Quaternion()
      const position = new Vector3()
      matrix.decompose(scaling, rotation, position)
      mesh.scaling.copyFrom(scaling)
      mesh.rotationQuaternion = rotation
      mesh.position.copyFrom(position)
    }

    ;(Object.keys(decorMatrices) as DecorationKind[]).forEach((kind) => {
      const matrices = decorMatrices[kind]
      if (matrices.length === 0) {
        return
      }

      const base = kind === 'tree' ? treeMesh : rockMesh
      applyBaseTransform(base, matrices[0])

      if (matrices.length > 1) {
        const buffer = new Float32Array((matrices.length - 1) * 16)
        matrices.slice(1).forEach((matrix, index) => {
          matrix.copyToArray(buffer, index * 16)
        })
        base.thinInstanceSetBuffer('matrix', buffer, 16)
      }

      base.thinInstanceRefreshBoundingInfo(true)
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
      unitMeshesRef.current.forEach((mesh) => mesh.dispose())
      unitMeshesRef.current.clear()
      scene.dispose()
      engine.dispose()
      sceneRef.current = null
    }
  }, [tiles, bounds, offset, size, decorations])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const existing = unitMeshesRef.current
    const highlightSet = new Set(highlightUnits)
    const nextIds = new Set(units.map((unit) => unit.id))

    existing.forEach((mesh, id) => {
      if (!nextIds.has(id)) {
        mesh.dispose()
        existing.delete(id)
      }
    })

    units.forEach((unit) => {
      const { x, z } = axialToWorld(unit.x, unit.y, size)
      let marker = existing.get(unit.id)
      if (!marker) {
        marker = MeshBuilder.CreateSphere(`unit-${unit.id}`, { diameter: size * 0.65 }, scene)
        const material = new StandardMaterial(`mat-${unit.id}`, scene)
        material.diffuseColor = Color3.FromHexString(UNIT_COLORS[unit.type])
        material.specularColor = new Color3(0.2, 0.2, 0.2)
        marker.material = material
        existing.set(unit.id, marker)
      }
      const material = marker.material as StandardMaterial
      const baseColor = Color3.FromHexString(UNIT_COLORS[unit.type])
      const isHighlighted = highlightSet.has(unit.id)
      material.diffuseColor = baseColor
      material.emissiveColor = isHighlighted ? baseColor.scale(0.35) : Color3.Black()
      marker.scaling = isHighlighted ? new Vector3(1.35, 1.35, 1.35) : new Vector3(1, 1, 1)
      marker.position = new Vector3(x + offset.x, 0.45, z + offset.z)
    })
  }, [units, size, offset, highlightUnits])

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
