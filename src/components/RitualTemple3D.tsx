import * as THREE from 'three';
import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Cloud, Environment, Text3D, useGLTF } from '@react-three/drei';
import { Bloom, EffectComposer, ChromaticAberration } from '@react-three/postprocessing';

type PowerUpType = {
  id: number;
  name: string;
  description: string;
  cost: number;
  effect: string;
  color: string;
  active: boolean;
}

const POWER_UPS: PowerUpType[] = [
  {
    id: 1,
    name: "HELLFIRE",
    description: "Triple explosion size",
    cost: 1000,
    effect: "explosion",
    color: "#ff4400",
    active: false
  },
  {
    id: 2,
    name: "MATRIX",
    description: "Slow motion effects",
    cost: 2000,
    effect: "time",
    color: "#00ff00",
    active: false
  },
  {
    id: 3,
    name: "THUNDER",
    description: "Lightning strikes",
    cost: 3000,
    effect: "lightning",
    color: "#ffff00",
    active: false
  },
  {
    id: 4,
    name: "CYBER SIGHT",
    description: "Enhanced targeting",
    cost: 2500,
    effect: "targeting",
    color: "#00ffff",
    active: false
  },
  {
    id: 5,
    name: "GHOST MODE",
    description: "Ethereal weapons",
    cost: 4000,
    effect: "ghost",
    color: "#ff00ff",
    active: false
  },
  {
    id: 6,
    name: "RAGE",
    description: "Rapid fire mode",
    cost: 3500,
    effect: "rapid",
    color: "#ff0000",
    active: false
  },
  {
    id: 7,
    name: "VOID",
    description: "Black hole attacks",
    cost: 5000,
    effect: "void",
    color: "#000000",
    active: false
  },
  {
    id: 8,
    name: "MULTI",
    description: "Multiple beams",
    cost: 4500,
    effect: "multi",
    color: "#0000ff",
    active: false
  },
  {
    id: 9,
    name: "OMEGA",
    description: "Ultimate power",
    cost: 10000,
    effect: "omega",
    color: "#ffffff",
    active: false
  }
];

type WeaponAltarProps = {
  position?: [number, number, number];
  activePowerUps?: PowerUpType[];
};

// Cool explosion effect when clicking!
function Explosion({ position, scale = 1, color = "#ff4400" }: { 
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
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
          array={Float32Array.from(Array(300).map(() => (Math.random() - 0.5) * 2 * scale))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1 * scale}
        color={color}
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
function WeaponAltar({ position = [0, 0, 0], activePowerUps = [], onHit }: WeaponAltarProps & { onHit: () => void }) {
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

    // Apply power-up effects
    const explosionCount = activePowerUps.some(p => p.effect === 'multi') ? 3 : 1;
    const explosionSize = activePowerUps.some(p => p.effect === 'hellfire') ? 2 : 1;
    const hasVoid = activePowerUps.some(p => p.effect === 'void');

    for (let i = 0; i < explosionCount; i++) {
      const explodePos: [number, number, number] = [
        position[0] + (Math.random() - 0.5) * 10 * explosionSize,
        position[1] + Math.random() * 5 * explosionSize,
        position[2] + (Math.random() - 0.5) * 10 * explosionSize
      ];
      setExplosions(prev => [...prev, explodePos]);
    }

    // Add void effect
    if (hasVoid) {
      // Create black hole effect at target
      setExplosions(prev => [...prev, [position[0], position[1] + 3, position[2]]]);
    }

    const shootDuration = activePowerUps.some(p => p.effect === 'rapid') ? 500 : 1000;
    setTimeout(() => setShooting(false), shootDuration);
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
          color={activePowerUps.some(p => p.effect === 'ghost') ? "#ffffff" : "#1a1a1a"}
          metalness={0.9}
          roughness={0.2}
          emissive={activePowerUps.some(p => p.effect === 'omega') ? "#ffffff" : "#ff0000"}
          emissiveIntensity={shooting ? 2 : 0.5}
          transparent={activePowerUps.some(p => p.effect === 'ghost')}
          opacity={activePowerUps.some(p => p.effect === 'ghost') ? 0.5 : 1}
        />
      </mesh>
      {shooting && (
        <>
          {/* Main beam */}
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 20, 8]} />
            <meshStandardMaterial
              color={activePowerUps.some(p => p.effect === 'omega') ? "#ffffff" : "#ff0000"}
              emissive={activePowerUps.some(p => p.effect === 'omega') ? "#ffffff" : "#ff0000"}
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Additional beams for multi power-up */}
          {activePowerUps.some(p => p.effect === 'multi') && (
            <>
              <mesh position={[0.5, 2, 0]} rotation={[0, 0, Math.PI / 12]}>
                <cylinderGeometry args={[0.05, 0.05, 20, 8]} />
                <meshStandardMaterial
                  color="#ff0000"
                  emissive="#ff0000"
                  emissiveIntensity={2}
                  transparent
                  opacity={0.8}
                />
              </mesh>
              <mesh position={[-0.5, 2, 0]} rotation={[0, 0, -Math.PI / 12]}>
                <cylinderGeometry args={[0.05, 0.05, 20, 8]} />
                <meshStandardMaterial
                  color="#ff0000"
                  emissive="#ff0000"
                  emissiveIntensity={2}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            </>
          )}
        </>
      )}
      {explosions.map((pos, i) => (
        <Explosion 
          key={i} 
          position={pos}
          scale={activePowerUps.some(p => p.effect === 'hellfire') ? 2 : 1}
          color={activePowerUps.some(p => p.effect === 'void') ? "#000000" : "#ff4400"}
        />
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

function WarScene({ onHit, activePowerUps }: { onHit: () => void, activePowerUps: PowerUpType[] }) {
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
      <WeaponAltar position={[0, 0, 0]} onHit={onHit} activePowerUps={activePowerUps} />
      <WeaponAltar position={[3, 0, 3]} onHit={onHit} activePowerUps={activePowerUps} />
      <WeaponAltar position={[-3, 0, -3]} onHit={onHit} activePowerUps={activePowerUps} />

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

      {/* Atmosphere - Fix Cloud props */}
      <Cloud
        opacity={0.5}
        speed={0.4}
        bounds={[20, 5, 5]}
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
  const [powerUps, setPowerUps] = useState<PowerUpType[]>(POWER_UPS);
  const [slowMotion, setSlowMotion] = useState(false);

  const onHit = () => {
    const basePoints = 100;
    const comboMultiplier = combo + 1;
    const powerUpMultiplier = powerUps.filter(p => p.active).length + 1;
    
    const points = basePoints * comboMultiplier * powerUpMultiplier;
    setScore(prev => prev + points);
    setCombo(prev => prev + 1);
    setMessage(`COMBO x${combo + 1}! (${points} pts)`);
    setTimeout(() => setMessage(''), 2000);
  };

  const togglePowerUp = (id: number) => {
    setPowerUps(prev => prev.map(p => {
      if (p.id === id) {
        if (!p.active && score < p.cost) {
          setMessage("Not enough points!");
          return p;
        }
        if (!p.active) {
          setScore(prev => prev - p.cost);
        }
        return { ...p, active: !p.active };
      }
      return p;
    }));
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
        <WarScene onHit={onHit} activePowerUps={powerUps.filter(p => p.active)} />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>

      {/* Power-ups menu */}
      <div style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.8)',
        padding: '10px',
        borderRadius: '10px',
        maxHeight: '80%',
        overflowY: 'auto'
      }}>
        {powerUps.map(powerUp => (
          <div
            key={powerUp.id}
            onClick={() => togglePowerUp(powerUp.id)}
            style={{
              cursor: score >= powerUp.cost || powerUp.active ? 'pointer' : 'not-allowed',
              padding: '10px',
              margin: '5px 0',
              background: powerUp.active ? powerUp.color : 'rgba(255,255,255,0.1)',
              color: powerUp.active ? '#000' : powerUp.color,
              borderRadius: '5px',
              opacity: score >= powerUp.cost || powerUp.active ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{powerUp.name}</div>
            <div style={{ fontSize: '12px' }}>{powerUp.description}</div>
            <div style={{ fontSize: '10px' }}>
              {powerUp.active ? 'ACTIVE' : `Cost: ${powerUp.cost.toLocaleString()} pts`}
            </div>
          </div>
        ))}
      </div>

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
