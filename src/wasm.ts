import { Vector3 } from '@react-three/fiber'
import { Universe, Cell } from 'wasm-game-of-life'
import { memory } from 'wasm-game-of-life/wasm_game_of_life_bg.wasm'
import { state } from './state'

const width = 64
const height = 64

function getIndex(row: number, column: number) {
  return row * width + column
}

const universe = Universe.new(width, height)
const cellsPtr = universe.cells()

function tick() {
  universe.tick()

  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height)
  const positions: Vector3[] = []

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const index = getIndex(row, col)

      if (cells[index] === Cell.Alive) {
        positions.push([(col - width / 2) * 2, (row - height / 2) * 2, 0])
      }
    }
  }

  state.positions = positions

  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)
