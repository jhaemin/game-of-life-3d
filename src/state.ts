import { proxy } from 'valtio'

export const state = proxy({
  windowSize: {
    width: 0,
    height: 0,
  },
  tickSpeed: 1,
  isStopped: false,
  tickTriggered: false,
})
