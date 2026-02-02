import type { AbstractMesh, Scene } from '@babylonjs/core'
import { Mesh, SceneLoader, Vector3 } from '@babylonjs/core'
import type { AssetManifest } from './types'

const ASSET_MANIFEST_URL = '/assets/manifest.json'
const DEFAULT_ASSET_MANIFEST: Required<AssetManifest> = {
  decorations: { tree: [], rock: [] },
  terrain: { plains: [], forest: [], ridge: [], oasis: [] },
}

const isSceneDisposed = (scene: Scene) => scene.isDisposed || scene.getEngine().isDisposed
const isSceneDisposalError = (error: unknown) =>
  error instanceof Error && /Scene has been disposed/i.test(error.message)

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

export const loadAssetManifest = async (): Promise<Required<AssetManifest>> => {
  try {
    const response = await fetch(ASSET_MANIFEST_URL, { cache: 'no-store' })
    if (!response.ok) {
      return DEFAULT_ASSET_MANIFEST
    }
    const data = (await response.json()) as AssetManifest
    return {
      decorations: {
        tree: data.decorations?.tree ?? [],
        rock: data.decorations?.rock ?? [],
      },
      terrain: {
        plains: data.terrain?.plains ?? [],
        forest: data.terrain?.forest ?? [],
        ridge: data.terrain?.ridge ?? [],
        oasis: data.terrain?.oasis ?? [],
      },
    }
  } catch (error) {
    return DEFAULT_ASSET_MANIFEST
  }
}

export const loadMeshFromUrls = async (scene: Scene, urls: string[]): Promise<Mesh | null> => {
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
    if (!picked) {
      result.meshes.forEach((mesh) => mesh.setEnabled(false))
      continue
    }
    detachMesh(picked)
    result.meshes.forEach((mesh) => {
      if (mesh !== picked) {
        mesh.setEnabled(false)
      }
    })
    picked.setEnabled(false)
    picked.isPickable = false
    picked.position = Vector3.Zero()
    picked.rotationQuaternion = null
    picked.rotation = Vector3.Zero()
    return picked
  }
  return null
}

export const getMeshMetrics = (mesh: Mesh) => {
  mesh.refreshBoundingInfo(true)
  mesh.computeWorldMatrix(true)
  const bounds = mesh.getBoundingInfo().boundingBox
  const height = bounds.maximumWorld.y - bounds.minimumWorld.y
  const width = bounds.maximumWorld.x - bounds.minimumWorld.x
  const depth = bounds.maximumWorld.z - bounds.minimumWorld.z
  const minY = bounds.minimumWorld.y
  const center = bounds.centerWorld
  return {
    height: height || 1,
    width: width || 1,
    depth: depth || 1,
    minY,
    centerX: center.x,
    centerZ: center.z,
  }
}
