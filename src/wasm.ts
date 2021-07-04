import CameraControls from 'camera-controls'
import * as THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils'
import { Cell, Universe } from '../wasm/pkg/wasm_game_of_life_bg'
import { memory } from '../wasm/pkg/wasm_game_of_life_bg.wasm'
import { state } from './state'

CameraControls.install({ THREE })

const { windowSize } = state
const { width: canvasWidth, height: canvasHeight } = windowSize

const universeWidth = 64
const universeHeight = 64

function getIndex(row: number, column: number) {
  return row * universeWidth + column
}

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(canvasWidth, canvasHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight)
camera.position.set(0, 0, 10)

// Create camera controls after setting the camera position
const cameraControls = new CameraControls(camera, canvas)

cameraControls.minDistance = 5
cameraControls.dollySpeed = 0.5
cameraControls.maxDistance = 80
cameraControls.dolly(-40)

const light1 = new THREE.DirectionalLight(0xffffff, 1.8)
light1.position.set(100, 120, 110)
const light2 = new THREE.DirectionalLight(0xffffff, 1.3)
light2.position.set(-60, -50, -70)
scene.add(light1, light2)

renderer.render(scene, camera)

window.addEventListener('resize', () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight

  camera.aspect = windowSize.width / windowSize.height
  camera.updateProjectionMatrix()

  renderer.setSize(windowSize.width, windowSize.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  renderer.render(scene, camera)
})

const universe = Universe.new(universeWidth, universeHeight)
const cellsPtr = universe.cells()

let geometries: THREE.BufferGeometry[] = []

for (let row = 0; row < universeHeight; row++) {
  for (let col = 0; col < universeWidth; col++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    geometry.translate(
      (col - universeWidth / 2) * 1.4,
      (row - universeHeight / 2) * 1.4,
      0
    )

    geometries.push(geometry)
  }
}

const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
  geometries,
  false
)
const mesh = new THREE.Mesh(
  mergedGeometry,
  new THREE.MeshStandardMaterial({ color: 'crimson' })
)

scene.add(mesh)

let deltaSum = 0

export const tickUniverse = () => {
  universe.tick()

  const cells = new Uint8Array(
    memory.buffer,
    cellsPtr,
    universeWidth * universeHeight
  )

  geometries = []

  for (let row = 0; row < universeHeight; row++) {
    for (let col = 0; col < universeWidth; col++) {
      const index = getIndex(row, col)

      if (cells[index] === Cell.Alive) {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        geometry.translate(
          (col - universeWidth / 2) * 1.4,
          (row - universeHeight / 2) * 1.4,
          0
        )
        geometries.push(geometry)
      }
    }
  }

  mesh.geometry = BufferGeometryUtils.mergeBufferGeometries(geometries, false)
}

const tick = () => {
  const delta = clock.getDelta()
  const hasControlsUpdated = cameraControls.update(delta)

  deltaSum += delta

  if (deltaSum > 0.02 / state.tickSpeed) {
    deltaSum = 0
    tickUniverse()
  }

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()
