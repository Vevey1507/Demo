import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';

const floorPlanks = Array.from({ length: 24 }, (_, index) => index);
const framePosts = [-4, -2, 0, 2, 4];
const sidePosts = [-3.5, -1.75, 0, 1.75, 3.5];
const wallBoards = Array.from({ length: 32 }, (_, index) => index);

function Timber({
  position,
  size,
  color = '#805337',
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.72} />
    </mesh>
  );
}

function Glass({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial color="#bdd5cf" transparent opacity={0.16} roughness={0.12} metalness={0.12} side={2} />
    </mesh>
  );
}

function BedsideTable({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Timber position={[0, 0.57, 0]} size={[0.78, 0.12, 0.68]} color="#9b704b" />
      <Timber position={[0, 0.29, 0]} size={[0.68, 0.42, 0.58]} color="#b18357" />
      <Timber position={[0, 0.4, 0.3]} size={[0.45, 0.025, 0.025]} color="#59402f" />
      <mesh position={[0, 0.68, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.18, 0.28, 24]} />
        <meshStandardMaterial color="#d5c4a1" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.86, 0]} castShadow>
        <coneGeometry args={[0.24, 0.2, 24]} />
        <meshStandardMaterial color="#e6c98d" emissive="#7a461d" emissiveIntensity={0.22} roughness={0.65} side={2} />
      </mesh>
      <pointLight position={[0, 0.86, 0]} intensity={3.2} distance={3.6} color="#ffad59" />
    </group>
  );
}

function SecretTrapdoor() {
  const [isOpen, setIsOpen] = useState(false);
  const lidRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (lidRef.current) {
      lidRef.current.rotation.x = MathUtils.damp(lidRef.current.rotation.x, isOpen ? -Math.PI * 0.43 : 0, 5, delta);
    }
  });

  return (
    <group position={[2.7, 0.065, 0.15]}>
      <mesh position={[0, -0.13, 0]}>
        <boxGeometry args={[1.2, 0.38, 1.3]} />
        <meshBasicMaterial color="#050607" />
      </mesh>
      {[-0.48, -0.24, 0].map((step, index) => (
        <Timber
          key={step}
          position={[0, -0.08 - index * 0.1, step]}
          size={[0.74, 0.06, 0.24]}
          color="#30251e"
        />
      ))}
      <Timber position={[-0.65, 0.01, 0]} size={[0.09, 0.12, 1.43]} color="#453224" />
      <Timber position={[0.65, 0.01, 0]} size={[0.09, 0.12, 1.43]} color="#453224" />
      <Timber position={[0, 0.01, 0.67]} size={[1.3, 0.12, 0.09]} color="#453224" />
      <group
        ref={lidRef}
        position={[0, 0.025, -0.65]}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((open) => !open);
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <Timber position={[0, 0, 0.65]} size={[1.2, 0.075, 1.3]} color="#503a29" />
        {[-0.39, 0, 0.39].map((z) => (
          <Timber key={z} position={[0, 0.04, z + 0.65]} size={[1.08, 0.018, 0.035]} color="#76563a" />
        ))}
        <mesh position={[0, 0.055, 1.12]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.075, 0.014, 8, 20]} />
          <meshStandardMaterial color="#a98758" metalness={0.65} roughness={0.38} />
        </mesh>
      </group>
    </group>
  );
}

function SecretWallDoor() {
  const [isOpen, setIsOpen] = useState(false);
  const doorRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (doorRef.current) {
      doorRef.current.rotation.y = MathUtils.damp(doorRef.current.rotation.y, isOpen ? -Math.PI * 0.48 : 0, 4, delta);
    }
  });

  return (
    <group>
      <mesh position={[2.98, 1.27, -3.405]}>
        <boxGeometry args={[1.02, 2.45, 0.035]} />
        <meshBasicMaterial color="#100c09" />
      </mesh>
      <Timber position={[2.47, 1.27, -3.34]} size={[0.1, 2.5, 0.14]} color="#38271d" />
      <Timber position={[3.49, 1.27, -3.34]} size={[0.1, 2.5, 0.14]} color="#38271d" />
      <Timber position={[2.98, 2.48, -3.34]} size={[1.12, 0.1, 0.14]} color="#38271d" />
      <group
        ref={doorRef}
        position={[2.52, 1.27, -3.31]}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((open) => !open);
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <Timber position={[0.46, 0, 0]} size={[0.91, 2.35, 0.09]} color="#563a25" />
        {[-0.78, -0.38, 0.02, 0.42, 0.82].map((y) => (
          <Timber key={y} position={[0.46, y, 0.05]} size={[0.8, 0.025, 0.018]} color="#755338" />
        ))}
        <mesh position={[0.78, -0.02, 0.09]}>
          <sphereGeometry args={[0.055, 12, 10]} />
          <meshStandardMaterial color="#b39563" metalness={0.7} roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
}

export function GlassBedroom() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#111619" roughness={0.36} metalness={0.22} />
      </mesh>
      <group>
        <Timber position={[0, 5.2, -5.5]} size={[22, 0.3, 0.32]} color="#101416" />
        <Timber position={[0, 5.2, 1.8]} size={[22, 0.3, 0.32]} color="#101416" />
        <Timber position={[-9, 3.1, -2]} size={[0.38, 6.2, 0.38]} color="#151a1c" />
        <Timber position={[9, 3.1, -2]} size={[0.38, 6.2, 0.38]} color="#151a1c" />
        {[-8, -4, 0, 4, 8].map((x) => (
          <Timber key={x} position={[x, 5.18, -1.8]} size={[0.16, 0.18, 8.8]} color="#13181a" />
        ))}
      </group>

      <Timber position={[0, -0.08, 0]} size={[8.3, 0.22, 7.3]} color="#33271f" />
      {floorPlanks.map((index) => (
        <Timber
          key={index}
          position={[0, 0.045, -3.48 + index * 0.3]}
          size={[8.18, 0.045, 0.285]}
          color={['#543d2d', '#604633', '#493426'][index % 3]}
        />
      ))}

      <Glass position={[0, 1.7, -3.62]} size={[8.05, 3.25, 0.035]} />
      <Glass position={[-4.12, 1.7, 0]} size={[0.035, 3.25, 7.25]} />
      <Glass position={[4.12, 1.7, 0]} size={[0.035, 3.25, 7.25]} />
      <Glass position={[-2.72, 1.7, 3.62]} size={[2.65, 3.25, 0.035]} />
      <Glass position={[2.72, 1.7, 3.62]} size={[2.65, 3.25, 0.035]} />
      <Glass position={[0, 1.7, 3.62]} size={[2.75, 3.25, 0.035]} />
      <Glass position={[0, 3.36, 0]} size={[8.05, 0.035, 7.2]} />

      {wallBoards.map((index) => (
        <Timber
          key={`back-panel-${index}`}
          position={[-3.84 + index * 0.248, 1.68, -3.49]}
          size={[0.238, 3.12, 0.075]}
          color={['#503624', '#5c3f29', '#68482f', '#573922'][index % 4]}
        />
      ))}
      {wallBoards.map((index) => (
        <Timber
          key={`side-panel-${index}`}
          position={[3.98, 1.68, -3.46 + index * 0.22]}
          size={[0.075, 3.12, 0.21]}
          color={['#503624', '#5c3f29', '#68482f', '#573922'][index % 4]}
        />
      ))}
      <Timber position={[0, 0.24, -3.42]} size={[8, 0.12, 0.11]} color="#39281e" />
      <Timber position={[3.94, 0.24, 0]} size={[0.11, 0.12, 7]} color="#39281e" />

      {framePosts.map((x) => (
        <Timber key={`back-${x}`} position={[x, 1.67, -3.62]} size={[0.09, 3.38, 0.1]} color="#493b2e" />
      ))}
      {sidePosts.map((z) => (
        <Timber key={`left-${z}`} position={[-4.12, 1.67, z]} size={[0.1, 3.38, 0.09]} color="#493b2e" />
      ))}
      {sidePosts.map((z) => (
        <Timber key={`right-${z}`} position={[4.12, 1.67, z]} size={[0.1, 3.38, 0.09]} color="#493b2e" />
      ))}
      {[-4.12, -2.8, 2.8, 4.12].map((x) => (
        <Timber key={`front-${x}`} position={[x, 1.67, 3.62]} size={[0.09, 3.38, 0.1]} color="#493b2e" />
      ))}
      <Timber position={[0, 3.34, 0]} size={[8.3, 0.12, 7.4]} color="#493b2e" />
      <Timber position={[0, 0.12, -3.62]} size={[8.2, 0.2, 0.14]} color="#493b2e" />
      <Timber position={[-4.12, 0.12, 0]} size={[0.14, 0.2, 7.4]} color="#493b2e" />
      <Timber position={[4.12, 0.12, 0]} size={[0.14, 0.2, 7.4]} color="#493b2e" />

      <mesh position={[0, 0.09, 0.35]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.35, 2.35, 0.06, 64]} />
        <meshStandardMaterial color="#493638" roughness={1} />
      </mesh>
      <Timber position={[0, 0.28, -1.32]} size={[2.72, 0.42, 3.45]} color="#765036" />
      <Timber position={[0, 0.52, -1.32]} size={[2.62, 0.16, 3.3]} color="#a77b51" />
      <mesh position={[0, 0.76, -1.28]} castShadow receiveShadow>
        <boxGeometry args={[2.48, 0.34, 3.05]} />
        <meshStandardMaterial color="#f1eee5" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.96, -0.68]} castShadow>
        <boxGeometry args={[2.5, 0.12, 1.72]} />
        <meshStandardMaterial color="#34434b" roughness={1} />
      </mesh>
      <mesh position={[0, 1.04, -1.88]} castShadow>
        <boxGeometry args={[2.5, 0.1, 0.94]} />
        <meshStandardMaterial color="#e8dfcf" roughness={1} />
      </mesh>
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, 1.12, -2.23]} rotation={[0.12, 0, x * 0.05]} castShadow>
          <boxGeometry args={[0.88, 0.24, 0.58]} />
          <meshStandardMaterial color="#f7f3e9" roughness={1} />
        </mesh>
      ))}
      <Timber position={[0, 1.13, -2.98]} size={[2.9, 1.12, 0.16]} color="#8e6545" />
      <Timber position={[0, 1.72, -2.88]} size={[2.58, 0.035, 0.025]} color="#c09262" />

      <BedsideTable position={[-1.88, 0, -2.22]} />
      <BedsideTable position={[1.88, 0, -2.22]} />
      <SecretTrapdoor />
      <SecretWallDoor />
      <pointLight position={[0, 2.85, -0.85]} intensity={7} distance={8} color="#ffbd78" />

      <group position={[-3.12, 0, -0.75]}>
        <Timber position={[0, 1.06, 0]} size={[1.18, 0.12, 2.1]} color="#9b704b" />
        <Timber position={[0, 0.53, -0.94]} size={[1.18, 1.05, 0.1]} color="#845a3d" />
        {[-0.58, 0, 0.58].map((z) => (
          <Timber key={z} position={[0, 0.68, z]} size={[1.02, 0.045, 0.045]} color="#e0c199" />
        ))}
        <mesh position={[0, 0.13, 0]}>
          <boxGeometry args={[0.9, 0.08, 1.7]} />
          <meshStandardMaterial color="#bca77e" roughness={1} />
        </mesh>
      </group>

      <mesh position={[2.95, 0.38, 1.5]} castShadow>
        <cylinderGeometry args={[0.3, 0.36, 0.72, 24]} />
        <meshStandardMaterial color="#b77f53" roughness={0.9} />
      </mesh>
      <mesh position={[2.95, 1.16, 1.5]} castShadow>
        <sphereGeometry args={[0.52, 16, 12]} />
        <meshStandardMaterial color="#65805d" roughness={0.95} />
      </mesh>
      {[-0.24, 0.2].map((x) => (
        <mesh key={x} position={[2.95 + x, 1.62, 1.5]} castShadow>
          <sphereGeometry args={[0.31, 12, 10]} />
          <meshStandardMaterial color="#718d67" roughness={0.95} />
        </mesh>
      ))}

      <group position={[0, 0, 0.58]}>
        <Timber position={[0, 0.62, -0.12]} size={[0.9, 0.12, 0.76]} color="#68452f" />
        <Timber position={[-0.36, 0.3, 0.17]} size={[0.09, 0.58, 0.09]} color="#563a29" />
        <Timber position={[0.36, 0.3, 0.17]} size={[0.09, 0.58, 0.09]} color="#563a29" />
        <Timber position={[-0.36, 0.3, -0.41]} size={[0.09, 0.58, 0.09]} color="#563a29" />
        <Timber position={[0.36, 0.3, -0.41]} size={[0.09, 0.58, 0.09]} color="#563a29" />
        <Timber position={[0, 1.12, -0.48]} size={[0.88, 0.12, 0.11]} color="#68452f" />
        {[-0.35, 0, 0.35].map((x) => (
          <Timber key={x} position={[x, 0.99, -0.48]} size={[0.045, 0.2, 0.06]} color="#8a6140" />
        ))}

        <mesh position={[0, 0.74, 0.02]} scale={[0.43, 0.25, 0.43]} castShadow>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#542f3b" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.28, -0.1]} scale={[0.37, 0.53, 0.25]} castShadow>
          <sphereGeometry args={[1, 24, 18]} />
          <meshStandardMaterial color="#b09b7d" roughness={0.88} />
        </mesh>
        <mesh position={[0, 1.55, -0.08]} scale={[0.23, 0.13, 0.2]} castShadow>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#c05736" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.98, -0.01]} scale={[0.2, 0.25, 0.18]} castShadow>
          <sphereGeometry args={[1, 24, 20]} />
          <meshStandardMaterial color="#b97963" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.05, -0.07]} scale={[0.25, 0.27, 0.22]} castShadow>
          <sphereGeometry args={[1, 20, 16]} />
          <meshStandardMaterial color="#a9442e" roughness={0.88} />
        </mesh>
        <mesh position={[0, 2.15, 0.08]} scale={[0.2, 0.09, 0.11]} castShadow>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color="#bd5534" roughness={0.88} />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh position={[side * 0.2, 1.78, -0.17]} scale={[0.09, 0.4, 0.12]} castShadow>
              <sphereGeometry args={[1, 16, 12]} />
              <meshStandardMaterial color="#a9442e" roughness={0.88} />
            </mesh>
            <mesh position={[side * 0.075, 1.99, 0.158]}>
              <sphereGeometry args={[0.025, 12, 10]} />
              <meshBasicMaterial color="#201a1a" />
            </mesh>
            <mesh position={[side * 0.17, 1.04, 0.08]} rotation={[0, 0, side * -0.14]} castShadow>
              <boxGeometry args={[0.17, 0.56, 0.18]} />
              <meshStandardMaterial color="#432b32" roughness={0.9} />
            </mesh>
            <mesh position={[side * 0.2, 0.8, 0.28]}>
              <sphereGeometry args={[0.1, 16, 12]} />
              <meshStandardMaterial color="#b97963" roughness={0.9} />
            </mesh>
            <mesh position={[side * 0.18, 0.65, 0.22]} castShadow>
              <boxGeometry args={[0.2, 0.18, 0.62]} />
              <meshStandardMaterial color="#432b32" roughness={0.9} />
            </mesh>
            <mesh position={[side * 0.18, 0.34, 0.51]} castShadow>
              <boxGeometry args={[0.16, 0.46, 0.17]} />
              <meshStandardMaterial color="#b97963" roughness={0.9} />
            </mesh>
            <mesh position={[side * 0.18, 0.1, 0.72]} castShadow>
              <boxGeometry args={[0.2, 0.15, 0.36]} />
              <meshStandardMaterial color="#302321" roughness={0.85} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 1.9, 0.17]} scale={[0.035, 0.06, 0.035]}>
          <sphereGeometry args={[1, 12, 10]} />
          <meshStandardMaterial color="#a96654" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.52, -0.31]} scale={[0.12, 0.48, 0.12]} castShadow>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color="#a9442e" roughness={0.88} />
        </mesh>
      </group>
    </group>
  );
}