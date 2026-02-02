import type { Camera, Scene } from '@babylonjs/core'
import { Matrix, Vector3 } from '@babylonjs/core'
import type { GridBounds } from '../../systems/HexGrid'

export const computeFogCoverage = (
  scene: Scene,
  camera: Camera,
  planeY: number,
  fallback: GridBounds,
): GridBounds => {
  const engine = scene.getEngine()
  const width = engine.getRenderWidth()
  const height = engine.getRenderHeight()
  const corners = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: 0, y: height },
    { x: width, y: height },
  ]
  const points: Vector3[] = []
  corners.forEach(({ x, y }) => {
    const ray = scene.createPickingRay(x, y, Matrix.Identity(), camera, false)
    const dirY = ray.direction.y
    if (Math.abs(dirY) < 1e-4) {
      return
    }
    const t = (planeY - ray.origin.y) / dirY
    if (t <= 0) {
      return
    }
    points.push(ray.origin.add(ray.direction.scale(t)))
  })

  if (points.length === 0) {
    return fallback
  }

  const xs = points.map((point) => point.x)
  const zs = points.map((point) => point.z)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minZ = Math.min(...zs)
  const maxZ = Math.max(...zs)
  return { minX, maxX, minZ, maxZ, width: maxX - minX, height: maxZ - minZ }
}
