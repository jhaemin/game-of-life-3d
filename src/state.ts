import { proxy } from 'valtio'

export const state = proxy({
  windowSize: {
    width: 0,
    height: 0,
  },
  tickSpeed: 0.5,
  isStopped: false,
  tickTriggered: false,
})
