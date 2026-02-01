import { useEffect, useMemo, useRef } from 'react'
import type { LinesMesh, Mesh } from '@babylonjs/core'
import {
  ArcRotateCamera,
  Camera,
  Color3,
  Color4,
  DynamicTexture,
  Engine,
  HemisphericLight,
  Matrix,
  MeshBuilder,
  PointerEventTypes,
  Quaternion,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core'
import type { Unit } from 'shared-types'
import '@babylonjs/loaders'
import {
  axialToWorld,
  buildHexGrid,
  getGridBounds,
  getGridOffset,
  type HexTile,
  type TerrainType,
} from '../systems/HexGrid'
import { UnitManager } from '../systems/UnitManager'

const TERRAIN_COLORS: Record<TerrainType, string> = {
  plains: '#b9a984',
  forest: '#5a7a58',
  ridge: '#8a7f72',
  oasis: '#4a8a88',
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
  selectedUnitId?: string | null
  onSelectUnit?: (unitId: string | null) => void
  selectedPath?: Array<{ x: number; y: number }>
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
  selectedUnitId = null,
  onSelectUnit,
  selectedPath = [],
}: GameSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sceneRef = useRef<Scene | null>(null)
  const unitManagerRef = useRef<UnitManager | null>(null)
  const pathLineRef = useRef<LinesMesh | null>(null)
  const fogMeshRef = useRef<Mesh | null>(null)
  const fogTextureRef = useRef<DynamicTexture | null>(null)
  const onSelectUnitRef = useRef<GameSceneProps['onSelectUnit']>(onSelectUnit)
  const tiles = useMemo(() => buildHexGrid(columns, rows, size, seed), [columns, rows, size, seed])
  const decorations = useMemo(() => buildDecorations(tiles, seed, size), [tiles, seed, size])
  const bounds = useMemo(() => getGridBounds(tiles, size), [tiles, size])
  const offset = useMemo(() => getGridOffset(bounds), [bounds])

  useEffect(() => {
    onSelectUnitRef.current = onSelectUnit
  }, [onSelectUnit])

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

    const fogTextureSize = 512
    const fogTexture = new DynamicTexture('fog-texture', fogTextureSize, scene, false)
    fogTexture.hasAlpha = true
    const fogMaterial = new StandardMaterial('fog-material', scene)
    fogMaterial.diffuseTexture = fogTexture
    fogMaterial.opacityTexture = fogTexture
    fogMaterial.disableLighting = true
    fogMaterial.backFaceCulling = false
    fogMaterial.alpha = 1

    const fogPadding = size * 6
    const fogMesh = MeshBuilder.CreateGround(
      'fog-plane',
      { width: bounds.width + fogPadding, height: bounds.height + fogPadding },
      scene,
    )
    fogMesh.position.y = 0.62
    fogMesh.material = fogMaterial
    fogMesh.isPickable = false
    fogMesh.renderingGroupId = 2
    fogMeshRef.current = fogMesh
    fogTextureRef.current = fogTexture

    unitManagerRef.current = new UnitManager(scene)

    const pickObserver = scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type !== PointerEventTypes.POINTERPICK) {
        return
      }
      const handler = onSelectUnitRef.current
      if (!handler) {
        return
      }
      const picked = pointerInfo.pickInfo?.pickedMesh
      const unitId = (picked?.metadata as { unitId?: string } | undefined)?.unitId
      handler(unitId ?? null)
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
      if (pickObserver) {
        scene.onPointerObservable.remove(pickObserver)
      }
      unitManagerRef.current?.dispose()
      unitManagerRef.current = null
      if (pathLineRef.current) {
        pathLineRef.current.dispose()
        pathLineRef.current = null
      }
      if (fogMeshRef.current) {
        fogMeshRef.current.dispose()
        fogMeshRef.current = null
      }
      fogTextureRef.current = null
      scene.dispose()
      engine.dispose()
      sceneRef.current = null
    }
  }, [tiles, bounds, offset, size, decorations])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const highlightSet = new Set(highlightUnits)
    unitManagerRef.current?.sync(units, {
      offset,
      size,
      highlightSet,
      selectedUnitId,
    })
  }, [units, size, offset, highlightUnits, selectedUnitId])

  useEffect(() => {
    const fogTexture = fogTextureRef.current
    if (!fogTexture) return

    const context = fogTexture.getContext() as CanvasRenderingContext2D
    const textureSize = fogTexture.getSize().width
    context.clearRect(0, 0, textureSize, textureSize)
    context.fillStyle = 'rgba(12, 12, 12, 0.6)'
    context.fillRect(0, 0, textureSize, textureSize)

    const worldMinX = bounds.minX + offset.x
    const worldMaxX = bounds.maxX + offset.x
    const worldMinZ = bounds.minZ + offset.z
    const worldMaxZ = bounds.maxZ + offset.z
    const worldWidth = worldMaxX - worldMinX || 1
    const worldHeight = worldMaxZ - worldMinZ || 1
    const radiusWorld = size * 2.2
    const radiusPx = (radiusWorld / worldWidth) * textureSize

    context.globalCompositeOperation = 'destination-out'
    context.fillStyle = 'rgba(0, 0, 0, 1)'
    units.forEach((unit) => {
      const { x, z } = axialToWorld(unit.x, unit.y, size)
      const worldX = x + offset.x
      const worldZ = z + offset.z
      const u = (worldX - worldMinX) / worldWidth
      const v = (worldZ - worldMinZ) / worldHeight
      const px = u * textureSize
      const py = (1 - v) * textureSize
      context.beginPath()
      context.arc(px, py, radiusPx, 0, Math.PI * 2)
      context.fill()
    })
    context.globalCompositeOperation = 'source-over'
    fogTexture.update()
  }, [units, size, offset, bounds])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    if (!selectedPath || selectedPath.length < 2) {
      if (pathLineRef.current) {
        pathLineRef.current.dispose()
        pathLineRef.current = null
      }
      return
    }

    const points = selectedPath.map((point, index) => {
      const { x, z } = axialToWorld(point.x, point.y, size)
      return new Vector3(x + offset.x, 0.6 + index * 0.02, z + offset.z)
    })

    if (pathLineRef.current) {
      MeshBuilder.CreateLines('unit-path', { points, instance: pathLineRef.current })
    } else {
      const lines = MeshBuilder.CreateLines('unit-path', { points }, scene)
      lines.color = new Color3(0.94, 0.74, 0.4)
      lines.alpha = 0.85
      pathLineRef.current = lines
    }
  }, [selectedPath, size, offset])

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
