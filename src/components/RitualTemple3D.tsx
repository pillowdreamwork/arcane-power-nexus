import * as THREE from 'three';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Cloud, Environment, Text3D, useGLTF } from '@react-three/drei';
import { Bloom, EffectComposer, ChromaticAberration } from '@react-three/postprocessing';

type WeaponAltarProps = {
  position?: [number, number, number];
};

// Cool explosion effect when clicking!
function Explosion({ position }: { position: [number, number, number] }) {
  const particles = useRef<THREE.Points>(null);
  const [visible, setVisible] = useState(true);

  useFrame(({ clock }) => {
    if (particles.current && visible) {
      const positions = particles.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.2;
        positions[i + 1] += Math.random() * 0.2;
        positions[i + 2] += (Math.random() - 0.5) * 0.2;
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Make explosion disappear after 2 seconds
  setTimeout(() => setVisible(false), 2000);

  return visible ? (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={Float32Array.from(Array(300).map(() => (Math.random() - 0.5) * 2))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ff4400"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  ) : null;
}

// Cool flying car that moves around!
function PoliceCar({ startPosition }: { startPosition: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const [lights, setLights] = useState(true);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Make it fly in a figure-8 pattern
      const time = clock.getElapsedTime();
      ref.current.position.x = startPosition[0] + Math.sin(time) * 5;
      ref.current.position.z = startPosition[2] + Math.sin(time * 2) * 3;
      ref.current.position.y = startPosition[1] + Math.sin(time * 3) * 0.5;
      
      // Flash lights every 0.5 seconds
      if (Math.floor(time * 2) % 2 === 0) setLights(prev => !prev);
    }
  });

  return (
    <group ref={ref}>
      {/* Car body */}
      <mesh>
        <boxGeometry args={[2, 0.7, 1]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Police lights */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.8]} />
        <meshStandardMaterial 
          color={lights ? "#ff0000" : "#0000ff"}
          emissive={lights ? "#ff0000" : "#0000ff"}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}

// Interactive weapon that shoots when clicked!
function WeaponAltar({ position = [0, 0, 0], onHit }: WeaponAltarProps & { onHit: () => void }) {
  const ref = useRef<THREE.Mesh>(null);
  const [shooting, setShooting] = useState(false);
  const [explosions, setExplosions] = useState<Array<[number, number, number]>>([]);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });

  const handleShoot = () => {
    setShooting(true);
    onHit();
    // Add random explosion
    const explodePos: [number, number, number] = [
      position[0] + (Math.random() - 0.5) * 10,
      position[1] + Math.random() * 5,
      position[2] + (Math.random() - 0.5) * 10
    ];
    setExplosions(prev => [...prev, explodePos]);
    // Stop shooting after 1 second
    setTimeout(() => setShooting(false), 1000);
  };

  return (
    <group position={new THREE.Vector3(...position)}>
      <mesh 
        ref={ref}
        onClick={handleShoot}
        onPointerOver={(e) => document.body.style.cursor = 'pointer'}
        onPointerOut={(e) => document.body.style.cursor = 'default'}
      >
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
          emissive="#ff0000"
          emissiveIntensity={shooting ? 2 : 0.5}
        />
      </mesh>
      {/* Laser beam when shooting */}
      {shooting && (
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 20, 8]} />
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
      {/* Show explosions */}
      {explosions.map((pos, i) => (
        <Explosion key={i} position={pos} />
      ))}
    </group>
  );
}

function NeonCircle({ radius = 3, height = 0.1 }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[new THREE.CatmullRomCurve3(points), 64, 0.02, 8, true]} />
      <meshStandardMaterial
        color="#000000"
        emissive="#ff0066"
        emissiveIntensity={1}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}

function EnergyField({ count = 100 }) {
  const particles = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (particles.current) {
      const positions = particles.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(clock.getElapsedTime() + i) * 0.01;
        if (positions[i + 1] > 5) positions[i + 1] = 0;
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ff0000"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CityScape() {
  const [buildingColors, setBuildingColors] = useState<string[]>(
    Array(20).fill('').map(() => `hsl(${Math.random() * 360}, 70%, 50%)`)
  );

  // Change building colors every few seconds
  useFrame(({ clock }) => {
    if (Math.floor(clock.getElapsedTime()) % 3 === 0) {
      setBuildingColors(prev => 
        prev.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`)
      );
    }
  });

  return (
    <group position={[0, -1, -10]}>
      {Array.from({ length: 20 }).map((_, i) => {
        const height = Math.random() * 10 + 5;
        const x = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 30;
        return (
          <mesh key={i} position={[x, height/2, z]}>
            <boxGeometry args={[2, height, 2]} />
            <meshStandardMaterial
              color={buildingColors[i]}
              metalness={0.8}
              roughness={0.4}
              emissive={buildingColors[i]}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      {/* Add some flying police cars */}
      <PoliceCar startPosition={[10, 15, -10]} />
      <PoliceCar startPosition={[-10, 12, 10]} />
      <PoliceCar startPosition={[0, 20, 0]} />
    </group>
  );
}

// Rain effect!
function Rain() {
  const rainCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (rain.current) {
      const positions = rain.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.2;
        if (positions[i + 1] < 0) positions[i + 1] = 50;
      }
      rain.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const rain = useRef<THREE.Points>(null);

  return (
    <points ref={rain}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#aaaaff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WarScene({ onHit }: { onHit: () => void }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <fog attach="fog" args={['#000000', 5, 25]} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ff1a1a"
      />

      {/* Ground Plane with Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.4}
          wireframe
        />
      </mesh>

      {/* Add rain effect */}
      <Rain />

      {/* City Background */}
      <CityScape />

      {/* Multiple weapon altars */}
      <WeaponAltar position={[0, 0, 0]} onHit={onHit} />
      <WeaponAltar position={[3, 0, 3]} onHit={onHit} />
      <WeaponAltar position={[-3, 0, -3]} onHit={onHit} />

      <NeonCircle radius={3} />
      <NeonCircle radius={4} />
      <EnergyField count={300} />

      {/* Floating Text */}
      <group position={[-2, 2, -2]}>
        {["POWER", "VENGEANCE"].map((text, i) => (
          <Text3D
            key={i}
            font="/fonts/helvetiker_regular.typeface.json"
            position={[0, i * -0.8, 0]}
            rotation={[0, Math.PI / 4, 0]}
            size={0.5}
            height={0.1}
            curveSegments={12}
          >
            {text}
            <meshStandardMaterial
              color="#ff0000"
              emissive="#ff0000"
              emissiveIntensity={2}
            />
          </Text3D>
        ))}
      </group>

      {/* Atmosphere */}
      <Cloud
        opacity={0.5}
        speed={0.4}
        width={20}
        depth={5}
        segments={20}
      />
      
      <Stars
        radius={50}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      <OrbitControls
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={15}
      />
    </>
  );
}

export default function RitualTemple3D() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [message, setMessage] = useState('');

  // Handle successful hits
  const onHit = () => {
    setScore(prev => prev + (100 * (combo + 1)));
    setCombo(prev => prev + 1);
    setMessage(`COMBO x${combo + 1}!`);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div style={{
      width: '100%',
      height: '80vh',
      background: 'linear-gradient(to bottom, #000000, #1a0000)',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 45 }}
        shadows
      >
        <WarScene onHit={onHit} />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>

      {/* Cool game UI */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: '#ff0000',
        fontFamily: 'monospace',
        fontSize: '24px',
        textShadow: '0 0 10px #ff0000',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end'
      }}>
        <div>SCORE: {score.toLocaleString()}</div>
        <div>COMBO: x{combo}</div>
      </div>

      {/* Combo message */}
      {message && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#ff0000',
          fontFamily: 'monospace',
          fontSize: '48px',
          textShadow: '0 0 20px #ff0000',
          animation: 'fadeOut 2s forwards'
        }}>
          {message}
        </div>
      )}

      {/* Status display */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        color: '#ff0000',
        fontFamily: 'monospace',
        fontSize: '14px',
        textShadow: '0 0 10px #ff0000',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
        <div>SYSTEM STATUS: ACTIVE | POWER LEVEL: MAXIMUM</div>
        <div>TARGETS ACQUIRED | RITUAL SHIELD: ENGAGED</div>
        <div>CLICK WEAPONS TO FIRE! | BUILD COMBOS FOR BONUS POINTS!</div>
      </div>

      {/* Add some basic instructions */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: '#00ff00',
        fontFamily: 'monospace',
        fontSize: '14px',
        textShadow: '0 0 10px #00ff00',
      }}>
        ▶ Click weapons to shoot!
        ▶ Build combos for more points!
        ▶ Watch out for police cars!
      </div>
    </div>
  );
}
