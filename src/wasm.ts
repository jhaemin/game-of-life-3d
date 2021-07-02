import '@react-three/fiber'
import CameraControls from 'camera-controls'
import * as THREE from 'three'
import { Cell, Universe } from 'wasm-game-of-life'
import { memory } from 'wasm-game-of-life/wasm_game_of_life_bg.wasm'
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

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(canvasWidth, canvasHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight)
camera.position.set(0, 0, 10)

// Create camera controls after setting the camera position
const cameraControls = new CameraControls(camera, canvas)

cameraControls.minDistance = 10
cameraControls.dollySpeed = 0.5
cameraControls.maxDistance = 80
cameraControls.dolly(-50)

const light1 = new THREE.DirectionalLight(0xffffff, 2)
light1.position.set(90, 80, 150)
const light2 = new THREE.DirectionalLight(0xffffff, 2)
light2.position.set(-30, -50, -100)
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

const meshes: THREE.Mesh[] = Array(universeWidth * universeHeight).fill(
  undefined
)

for (let row = 0; row < universeHeight; row++) {
  for (let col = 0; col < universeWidth; col++) {
    const index = getIndex(row, col)
    meshes[index] = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 'crimson' })
    )
    meshes[index].position.set(
      (col - universeWidth / 2) * 1.4,
      (row - universeHeight / 2) * 1.4,
      0
    )
  }
}

scene.add(...meshes)

const tick = () => {
  const delta = clock.getDelta()
  const hasControlsUpdated = cameraControls.update(delta)

  universe.tick()

  const cells = new Uint8Array(
    memory.buffer,
    cellsPtr,
    universeWidth * universeHeight
  )

  for (let row = 0; row < universeHeight; row++) {
    for (let col = 0; col < universeWidth; col++) {
      const index = getIndex(row, col)
      const material = meshes[index].material as any

      if (cells[index] === Cell.Alive) {
        // material.color.setHex(0xff0000)
        material.transparent = false
        material.opacity = 1
      } else {
        // material.color.setHex(0x00ff0000)
        material.transparent = true
        material.opacity = 0
      }
    }
  }

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()
