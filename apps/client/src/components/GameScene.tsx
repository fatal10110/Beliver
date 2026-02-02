import { useEffect, useMemo, useRef, useState } from 'react'
import type { LinesMesh } from '@babylonjs/core'
import {
  ArcRotateCamera,
  Camera,
  Color3,
  Color4,
  DynamicTexture,
  Engine,
  HemisphericLight,
  Layer,
  Matrix,
  Mesh,
  MeshBuilder,
  PointerEventTypes,
  Quaternion,
  Scene,
  StandardMaterial,
  Texture,
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
  type GridBounds,
  type TerrainType,
} from '../systems/HexGrid'
import { UnitManager } from '../systems/UnitManager'
import { loadAssetManifest, loadMeshFromUrls, getMeshMetrics } from './gameScene/assets'
import { TERRAIN_COLORS, TERRAIN_HEIGHTS } from './gameScene/constants'
import { buildDecorations } from './gameScene/decorations'
import { computeFogCoverage } from './gameScene/fog'
import type { AssetManifest, AssetStatus, DecorationKind } from './gameScene/types'
import { clamp, formatAssetCount } from './gameScene/utils'

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
  const fogLayerRef = useRef<Layer | null>(null)
  const fogTextureRef = useRef<DynamicTexture | null>(null)
  const fogExploredRef = useRef<HTMLCanvasElement | null>(null)
  const fogBoundsRef = useRef<GridBounds | null>(null)
  const onSelectUnitRef = useRef<GameSceneProps['onSelectUnit']>(onSelectUnit)
  const [assetStatus, setAssetStatus] = useState(() => ({
    decorations: { loaded: 0, total: 2, failed: 0 },
    units: { loaded: 0, total: Object.values(UnitType).length, failed: 0 },
  }))
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
    engine.resize()
    const scene = new Scene(engine)
    sceneRef.current = scene
    scene.clearColor = new Color4(0.06, 0.05, 0.04, 1)
    scene.skipPointerMovePicking = true
    scene.skipPointerDownPicking = true
    scene.skipPointerUpPicking = true

    const camera = new ArcRotateCamera('camera', Math.PI / 4, Math.PI / 3.5, 28, Vector3.Zero(), scene)
    camera.mode = Camera.ORTHOGRAPHIC_CAMERA
    camera.lowerAlphaLimit = camera.upperAlphaLimit = camera.alpha
    camera.lowerBetaLimit = camera.upperBetaLimit = camera.beta
    camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius

    let groundMesh: Mesh | null = null
    const groundPlaneY = -0.06
    const groundFallback: GridBounds = {
      minX: bounds.minX + offset.x,
      maxX: bounds.maxX + offset.x,
      minZ: bounds.minZ + offset.z,
      maxZ: bounds.maxZ + offset.z,
      width: bounds.width,
      height: bounds.height,
    }
    const updateGroundCoverage = () => {
      if (!groundMesh) return
      const coverage = computeFogCoverage(scene, camera, groundPlaneY, groundFallback)
      const padding = Math.max(bounds.width, bounds.height) * 2
      const width = Math.max(coverage.width, bounds.width) + padding
      const height = Math.max(coverage.height, bounds.height) + padding
      groundMesh.scaling.x = width
      groundMesh.scaling.z = height
      groundMesh.position.x = (coverage.minX + coverage.maxX) / 2
      groundMesh.position.z = (coverage.minZ + coverage.maxZ) / 2
    }

    const updateCameraFraming = () => {
      const margin = size * 1.6
      const minX = bounds.minX + offset.x - margin
      const maxX = bounds.maxX + offset.x + margin
      const minZ = bounds.minZ + offset.z - margin
      const maxZ = bounds.maxZ + offset.z + margin
      const corners = [
        new Vector3(minX, 0, minZ),
        new Vector3(minX, 0, maxZ),
        new Vector3(maxX, 0, minZ),
        new Vector3(maxX, 0, maxZ),
      ]
      const view = camera.getViewMatrix()
      let minViewX = Infinity
      let maxViewX = -Infinity
      let minViewY = Infinity
      let maxViewY = -Infinity
      corners.forEach((corner) => {
        const projected = Vector3.TransformCoordinates(corner, view)
        minViewX = Math.min(minViewX, projected.x)
        maxViewX = Math.max(maxViewX, projected.x)
        minViewY = Math.min(minViewY, projected.y)
        maxViewY = Math.max(maxViewY, projected.y)
      })
      const targetWidth = Math.max(0.01, maxViewX - minViewX)
      const targetHeight = Math.max(0.01, maxViewY - minViewY)
      const aspect = engine.getRenderWidth() / Math.max(1, engine.getRenderHeight())
      let orthoWidth = targetWidth
      let orthoHeight = targetHeight
      if (orthoWidth / orthoHeight < aspect) {
        orthoWidth = orthoHeight * aspect
      } else {
        orthoHeight = orthoWidth / aspect
      }
      camera.orthoLeft = -orthoWidth / 2
      camera.orthoRight = orthoWidth / 2
      camera.orthoTop = orthoHeight / 2
      camera.orthoBottom = -orthoHeight / 2
      updateGroundCoverage()
    }

    updateCameraFraming()

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
    light.intensity = 0.9

    const groundMaterial = new StandardMaterial('mat-ground', scene)
    groundMaterial.diffuseColor = Color3.FromHexString('#2b2621')
    groundMaterial.specularColor = new Color3(0.04, 0.04, 0.04)
    groundMaterial.emissiveColor = new Color3(0.02, 0.02, 0.02)
    groundMesh = MeshBuilder.CreateGround('ground', { width: 1, height: 1 }, scene)
    groundMesh.position.y = groundPlaneY
    groundMesh.isPickable = false
    groundMesh.material = groundMaterial
    updateGroundCoverage()

    const baseMeshes: Record<
      TerrainType,
      { mesh: ReturnType<typeof MeshBuilder.CreateCylinder>; material: StandardMaterial; height: number }
    > = {
      plains: {
        mesh: MeshBuilder.CreateCylinder(
          'plains',
          { diameter: size * 1.9, height: TERRAIN_HEIGHTS.plains, tessellation: 6 },
          scene,
        ),
        material: new StandardMaterial('mat-plains', scene),
        height: TERRAIN_HEIGHTS.plains,
      },
      forest: {
        mesh: MeshBuilder.CreateCylinder(
          'forest',
          { diameter: size * 1.9, height: TERRAIN_HEIGHTS.forest, tessellation: 6 },
          scene,
        ),
        material: new StandardMaterial('mat-forest', scene),
        height: TERRAIN_HEIGHTS.forest,
      },
      ridge: {
        mesh: MeshBuilder.CreateCylinder(
          'ridge',
          { diameter: size * 1.9, height: TERRAIN_HEIGHTS.ridge, tessellation: 6 },
          scene,
        ),
        material: new StandardMaterial('mat-ridge', scene),
        height: TERRAIN_HEIGHTS.ridge,
      },
      oasis: {
        mesh: MeshBuilder.CreateCylinder(
          'oasis',
          { diameter: size * 1.9, height: TERRAIN_HEIGHTS.oasis, tessellation: 6 },
          scene,
        ),
        material: new StandardMaterial('mat-oasis', scene),
        height: TERRAIN_HEIGHTS.oasis,
      },
    }

    ;(Object.keys(baseMeshes) as TerrainType[]).forEach((terrain) => {
      const entry = baseMeshes[terrain]
      entry.material.diffuseColor = Color3.FromHexString(TERRAIN_COLORS[terrain])
      entry.material.specularColor = new Color3(0.05, 0.05, 0.05)
      entry.mesh.material = entry.material
    })

    const terrainPositions: Record<TerrainType, Vector3[]> = {
      plains: [],
      forest: [],
      ridge: [],
      oasis: [],
    }

    tiles.forEach((tile) => {
      terrainPositions[tile.terrain].push(new Vector3(tile.x + offset.x, 0, tile.z + offset.z))
    })

    const applyBaseTransform = (mesh: Mesh, matrix: Matrix) => {
      const scaling = new Vector3()
      const rotation = new Quaternion()
      const position = new Vector3()
      matrix.decompose(scaling, rotation, position)
      mesh.scaling.copyFrom(scaling)
      mesh.rotationQuaternion = rotation
      mesh.position.copyFrom(position)
    }

    const applyTerrainInstances = (
      terrain: TerrainType,
      mesh: Mesh,
      baseScale: number,
      baseOffset: number,
      centerOffset: { x: number; z: number },
    ) => {
      const positions = terrainPositions[terrain]
      if (positions.length === 0) {
        mesh.setEnabled(false)
        return
      }

      const matrices = positions.map((position) =>
        Matrix.Compose(
          new Vector3(baseScale, baseScale, baseScale),
          Quaternion.Identity(),
          new Vector3(
            position.x - centerOffset.x * baseScale,
            baseOffset * baseScale,
            position.z - centerOffset.z * baseScale,
          ),
        ),
      )

      mesh.setEnabled(true)
      applyBaseTransform(mesh, matrices[0])

      if (matrices.length > 1) {
        const buffer = new Float32Array((matrices.length - 1) * 16)
        matrices.slice(1).forEach((matrix, index) => {
          matrix.copyToArray(buffer, index * 16)
        })
        mesh.thinInstanceSetBuffer('matrix', buffer, 16)
      }

      mesh.thinInstanceRefreshBoundingInfo(true)
    }

    const targetTileSize = size * 1.9

    ;(Object.keys(terrainPositions) as TerrainType[]).forEach((terrain) => {
      const base = baseMeshes[terrain].mesh
      const metrics = getMeshMetrics(base)
      const baseScale = clamp(targetTileSize / Math.max(metrics.width, metrics.depth), 0.2, 6)
      const baseOffset = -metrics.minY
      applyTerrainInstances(terrain, base, baseScale, baseOffset, {
        x: metrics.centerX,
        z: metrics.centerZ,
      })
    })

    const treeFallback = MeshBuilder.CreateCylinder(
      'tree',
      { diameterTop: size * 0.2, diameterBottom: size * 0.45, height: size * 1.3, tessellation: 6 },
      scene,
    )
    const rockFallback = MeshBuilder.CreateSphere('rock', { diameter: size * 0.65, segments: 5 }, scene)
    treeFallback.setEnabled(false)
    rockFallback.setEnabled(false)
    const treeMaterial = new StandardMaterial('mat-tree', scene)
    treeMaterial.diffuseColor = Color3.FromHexString('#3f6b4e')
    treeMaterial.specularColor = new Color3(0.1, 0.1, 0.1)
    treeFallback.material = treeMaterial

    const rockMaterial = new StandardMaterial('mat-rock', scene)
    rockMaterial.diffuseColor = Color3.FromHexString('#6f6a63')
    rockMaterial.specularColor = new Color3(0.12, 0.12, 0.12)
    rockFallback.material = rockMaterial

    let isDisposed = false

    const loadTerrainAssets = async (manifest: Required<AssetManifest>) => {
      const terrains = manifest.terrain ?? {
        plains: [],
        forest: [],
        ridge: [],
        oasis: [],
      }

      await Promise.all(
        (Object.keys(terrainPositions) as TerrainType[]).map(async (terrain) => {
          const urls = terrains[terrain] ?? []
          const loaded = await loadMeshFromUrls(scene, urls)
          if (isDisposed) {
            loaded?.dispose()
            return
          }
          if (!loaded) {
            return
          }
          const metrics = getMeshMetrics(loaded)
          const baseScale = clamp(targetTileSize / Math.max(metrics.width, metrics.depth), 0.2, 6)
          const baseOffset = -metrics.minY
          baseMeshes[terrain].mesh.dispose()
          applyTerrainInstances(terrain, loaded, baseScale, baseOffset, {
            x: metrics.centerX,
            z: metrics.centerZ,
          })
        }),
      )
    }

    const loadDecorations = async () => {
      const manifest = await loadAssetManifest()
      if (isDisposed) return
      void loadTerrainAssets(manifest)

      const decorationStatus: AssetStatus = { loaded: 0, total: 2, failed: 0 }
      const treeUrls = manifest.decorations.tree ?? []
      const rockUrls = manifest.decorations.rock ?? []

      const [treeLoaded, rockLoaded] = await Promise.all([
        loadMeshFromUrls(scene, treeUrls),
        loadMeshFromUrls(scene, rockUrls),
      ])
      if (isDisposed) {
        treeLoaded?.dispose()
        rockLoaded?.dispose()
        return
      }

      const recordDecorResult = (urls: string[], mesh: Mesh | null) => {
        if (urls.length === 0) {
          decorationStatus.failed += 1
          return
        }
        if (mesh) {
          decorationStatus.loaded += 1
        } else {
          decorationStatus.failed += 1
        }
      }
      recordDecorResult(treeUrls, treeLoaded)
      recordDecorResult(rockUrls, rockLoaded)
      setAssetStatus((prev) => ({
        ...prev,
        decorations: decorationStatus,
      }))

      const treeMesh = treeLoaded ?? treeFallback
      const rockMesh = rockLoaded ?? rockFallback
      if (treeLoaded) {
        treeFallback.dispose()
      }
      if (rockLoaded) {
        rockFallback.dispose()
      }

      const treeMetrics = getMeshMetrics(treeMesh)
      const rockMetrics = getMeshMetrics(rockMesh)
      const treeBaseScale = clamp((size * 1.3) / treeMetrics.height, 0.25, 4)
      const rockBaseScale = clamp((size * 0.7) / rockMetrics.height, 0.25, 4)
      const treeBaseOffset = -treeMetrics.minY
      const rockBaseOffset = -rockMetrics.minY

      const decorMatrices: Record<DecorationKind, Matrix[]> = {
        tree: [],
        rock: [],
      }

      decorations.forEach((decor) => {
        const baseScale = decor.kind === 'tree' ? treeBaseScale : rockBaseScale
        const baseOffset = decor.kind === 'tree' ? treeBaseOffset : rockBaseOffset
        const finalScale = decor.scale * baseScale
        const yOffset = baseOffset * finalScale
        const matrix = Matrix.Compose(
          new Vector3(finalScale, finalScale, finalScale),
          Quaternion.FromEulerAngles(0, decor.rotation, 0),
          new Vector3(decor.x + offset.x, yOffset, decor.z + offset.z),
        )
        decorMatrices[decor.kind].push(matrix)
      })

      const applyBaseTransform = (mesh: Mesh, matrix: Matrix) => {
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
        const base = kind === 'tree' ? treeMesh : rockMesh
        if (matrices.length === 0) {
          base.setEnabled(false)
          return
        }

        base.setEnabled(true)
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
    }

    void loadDecorations()

    const fogTextureSize = 2048
    const fogTexture = new DynamicTexture('fog-texture', fogTextureSize, scene, false)
    fogTexture.hasAlpha = true
    fogTexture.wrapU = Texture.CLAMP_ADDRESSMODE
    fogTexture.wrapV = Texture.CLAMP_ADDRESSMODE
    const fogLayer = new Layer('fog-layer', null, scene, true)
    fogLayer.texture = fogTexture
    fogLayer.texture.hasAlpha = true
    fogLayer.isBackground = false
    fogLayer.isBackground = false
    fogLayerRef.current = fogLayer
    fogTextureRef.current = fogTexture

    const terrainMaxHeight = Math.max(...Object.values(TERRAIN_HEIGHTS))
    const fogPlaneY = terrainMaxHeight + 0.2
    const fogMargin = Math.max(bounds.width, bounds.height) * 4
    const fallbackFogBounds: GridBounds = {
      minX: bounds.minX + offset.x,
      maxX: bounds.maxX + offset.x,
      minZ: bounds.minZ + offset.z,
      maxZ: bounds.maxZ + offset.z,
      width: bounds.width,
      height: bounds.height,
    }
    const initialCoverage = computeFogCoverage(scene, camera, fogPlaneY, fallbackFogBounds)
    const fogMinX = initialCoverage.minX - fogMargin / 2
    const fogMaxX = initialCoverage.maxX + fogMargin / 2
    const fogMinZ = initialCoverage.minZ - fogMargin / 2
    const fogMaxZ = initialCoverage.maxZ + fogMargin / 2
    const fogWidth = fogMaxX - fogMinX
    const fogHeight = fogMaxZ - fogMinZ
    fogBoundsRef.current = {
      minX: fogMinX,
      maxX: fogMaxX,
      minZ: fogMinZ,
      maxZ: fogMaxZ,
      width: fogWidth,
      height: fogHeight,
    }
    const exploredCanvas = document.createElement('canvas')
    exploredCanvas.width = fogTextureSize
    exploredCanvas.height = fogTextureSize
    fogExploredRef.current = exploredCanvas

    unitManagerRef.current = new UnitManager(scene, {
      onAssetStatus: (status) => {
        if (isDisposed) return
        setAssetStatus((prev) => ({
          ...prev,
          units: status,
        }))
      },
    })

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

    const updateFogCoverage = () => {
      const coverage = computeFogCoverage(scene, camera, fogPlaneY, fallbackFogBounds)
      const nextMinX = coverage.minX - fogMargin / 2
      const nextMaxX = coverage.maxX + fogMargin / 2
      const nextMinZ = coverage.minZ - fogMargin / 2
      const nextMaxZ = coverage.maxZ + fogMargin / 2
      const nextWidth = nextMaxX - nextMinX
      const nextHeight = nextMaxZ - nextMinZ
      fogBoundsRef.current = {
        minX: nextMinX,
        maxX: nextMaxX,
        minZ: nextMinZ,
        maxZ: nextMaxZ,
        width: nextWidth,
        height: nextHeight,
      }
    }

    const onResize = () => {
      engine.resize()
      updateCameraFraming()
      updateFogCoverage()
    }

    updateFogCoverage()

    window.addEventListener('resize', onResize)

    return () => {
      isDisposed = true
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
      if (fogLayerRef.current) {
        fogLayerRef.current.dispose()
        fogLayerRef.current = null
      }
      fogTextureRef.current = null
      fogExploredRef.current = null
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
    const exploredCanvas = fogExploredRef.current
    if (!fogTexture || !exploredCanvas) return

    const context = fogTexture.getContext() as CanvasRenderingContext2D
    const textureSize = fogTexture.getSize().width
    const exploredContext = exploredCanvas.getContext('2d')
    if (!exploredContext) return

    context.clearRect(0, 0, textureSize, textureSize)
    context.globalCompositeOperation = 'source-over'
    context.globalAlpha = 1
    context.fillStyle = 'rgba(14, 14, 14, 0.07)'
    context.fillRect(0, 0, textureSize, textureSize)

    const fogBounds = fogBoundsRef.current ?? {
      minX: bounds.minX + offset.x,
      maxX: bounds.maxX + offset.x,
      minZ: bounds.minZ + offset.z,
      maxZ: bounds.maxZ + offset.z,
    }
    const worldMinX = fogBounds.minX
    const worldMaxX = fogBounds.maxX
    const worldMinZ = fogBounds.minZ
    const worldMaxZ = fogBounds.maxZ
    const worldWidth = worldMaxX - worldMinX || 1
    const worldHeight = worldMaxZ - worldMinZ || 1
    const radiusWorld = size * 5.4
    const radiusPx = (radiusWorld / worldWidth) * textureSize
    const toTexture = (unit: Unit) => {
      const { x, z } = axialToWorld(unit.x, unit.y, size)
      const worldX = x + offset.x
      const worldZ = z + offset.z
      const u = (worldX - worldMinX) / worldWidth
      const v = (worldZ - worldMinZ) / worldHeight
      return { px: u * textureSize, py: (1 - v) * textureSize }
    }

    exploredContext.clearRect(0, 0, textureSize, textureSize)
    exploredContext.globalCompositeOperation = 'source-over'
    exploredContext.fillStyle = 'rgba(255, 255, 255, 1)'
    units.forEach((unit) => {
      const { px, py } = toTexture(unit)
      exploredContext.beginPath()
      exploredContext.arc(px, py, radiusPx, 0, Math.PI * 2)
      exploredContext.fill()
    })

    context.globalCompositeOperation = 'destination-out'
    context.globalAlpha = 0.8
    context.drawImage(exploredCanvas, 0, 0)
    context.globalCompositeOperation = 'source-over'
    context.globalAlpha = 1
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
      <div className="game-scene__asset-status" aria-live="polite">
        <span>Decor {formatAssetCount(assetStatus.decorations)}</span>
        <span>Units {formatAssetCount(assetStatus.units)}</span>
        {assetStatus.decorations.failed + assetStatus.units.failed > 0 && <span>Fallback</span>}
      </div>
    </div>
  )
}

export default GameScene
