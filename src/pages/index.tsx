import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { state } from '../state'

function App() {
  const { windowSize } = useSnapshot(state)

  useEffect(() => {
    // Asynchronously import WebAssembly
    import('../wasm').catch((e) => console.error(e))
  }, [])

  useEffect(() => {
    const updateWindowSize = () => {
      state.windowSize.width = window.innerWidth
      state.windowSize.height = window.innerHeight
    }

    updateWindowSize()

    window.addEventListener('resize', updateWindowSize)

    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  return (
    <div className="app">
      <canvas id="canvas" {...windowSize} />
    </div>
  )
}

export default App
