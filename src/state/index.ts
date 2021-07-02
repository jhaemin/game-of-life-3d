import { proxy } from 'valtio'

export const state = proxy({
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
})

window.addEventListener('resize', () => {
  state.windowSize.width = window.innerWidth
  state.windowSize.height = window.innerHeight
})
