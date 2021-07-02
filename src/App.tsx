import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { state } from './state'

function App() {
  const { windowSize } = useSnapshot(state)

  useEffect(() => {
    // Asynchronously import WebAssembly
    import('./wasm').catch((e) => console.error(e))
  }, [])

  return (
    <div className="app">
      <canvas id="canvas" {...windowSize} />
    </div>
  )
}

export default App
