import { Vector3 } from '@react-three/fiber'
import { proxy } from 'valtio'

export const state = proxy<{ positions: Vector3[] }>({
  positions: [
    [-1.2, 0, 0],
    [0, 0, 0],
    [1.2, 0, 0],
  ],
})
