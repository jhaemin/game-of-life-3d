import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import THREE from 'three'
import { useSnapshot } from 'valtio'
import { useWindowSize } from './hooks/use-window-size'
import { state } from './state'

// Asynchronously import WebAssembly
import('./wasm').catch((e) => console.error(e))

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="crimson" />
    </mesh>
  )
}

function App() {
  const { width, height } = useWindowSize()
  const { positions } = useSnapshot(state)

  return (
    <div className="app">
      <Canvas style={{ width, height }}>
        <PerspectiveCamera position={[0, 0, 0]}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {positions.map((position, i) => (
            <Box key={i} position={position} />
          ))}
          <OrbitControls
            enableDamping
            zoomSpeed={0.8}
            rotateSpeed={0.5}
            minDistance={0}
            maxDistance={100}
          />
        </PerspectiveCamera>
      </Canvas>
    </div>
  )
}

export default App
