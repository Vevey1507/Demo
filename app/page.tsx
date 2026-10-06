// This directive tells Next.js that this component runs on the client-side
// It's needed because we're using browser-specific features like 3D graphics and WebXR
'use client';

// Import required components for 3D rendering
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GlassBedroom } from './components/GlassBedroom';

// Import XR components for WebXR functionality (AR/VR)
import { XR, createXRStore, XROrigin } from '@react-three/xr';

// Create an XR store that manages the WebXR session state
// This store handles entering/exiting AR/VR modes and manages XR-specific functionality
const store = createXRStore();

// Main homepage component that renders our 3D scene with XR capabilities
export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#151d1c' }}>
      <Canvas shadows camera={{ position: [10, 7.5, 11], fov: 38 }}>
        <color attach="background" args={['#151d1c']} />
        <fog attach="fog" args={['#19211f', 17, 42]} />
        <XR store={store}>
          <XROrigin position={[0, 1.6, 2.7]} />
          <ambientLight intensity={0.28} />
          <hemisphereLight args={['#9ba7b5', '#20211e', 0.42]} />
          <directionalLight position={[-5, 10, 6]} intensity={0.72} color="#9eafce" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          <GlassBedroom />
        </XR>
        <OrbitControls target={[0, 1.15, 0]} minDistance={7} maxDistance={19} maxPolarAngle={Math.PI / 2.05} />
      </Canvas>
      <header style={{ position: 'absolute', top: 30, left: 34, color: '#e4ddce', pointerEvents: 'none' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.18em', fontWeight: 600, opacity: 0.7 }}>AFTER HOURS / 11:47 PM</div>
        <h1 style={{ fontSize: 28, lineHeight: 1.1, fontWeight: 500, margin: '9px 0 5px' }}>Glasshouse bedroom</h1>
        <p style={{ fontSize: 13, margin: 0, opacity: 0.75 }}>A little warmth at the edge of the woods.</p>
      </header>
    </main>
  );
}
