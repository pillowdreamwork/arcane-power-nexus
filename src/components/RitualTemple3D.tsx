import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function TempleScene() {
  const deityRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sigilTexture = useLoader(TextureLoader, '/ritual-pattern.svg');

  // Animate deity floating and glowing
  useFrame(({ clock }) => {
    if (deityRef.current) {
      deityRef.current.position.y = 1.5 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
      const mat = deityRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.abs(Math.sin(clock.getElapsedTime() * 2));
    }
    if (torusRef.current) {
      torusRef.current.rotation.y += 0.03;
      const mat = torusRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHSL((clock.getElapsedTime() * 0.1) % 1, 0.7, 0.5);
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffb300" />
      {/* Temple base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1, 4]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Deity: floating, glowing */}
      <mesh ref={deityRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#b71c1c" emissive="#ff1744" emissiveIntensity={1} />
      </mesh>
      {/* Ritual sigil above altar */}
      <mesh position={[0, 2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial map={sigilTexture} transparent opacity={0.85} />
      </mesh>
      {/* Elemental effect: animated torus */}
      <mesh ref={torusRef} position={[2, 0.5, 2]}>
        <torusGeometry args={[0.3, 0.1, 16, 100]} />
        <meshStandardMaterial color="#2196f3" emissive="#00e5ff" emissiveIntensity={0.7} />
      </mesh>
      {/* Simple fire particle effect */}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[0, 1.1 + i * 0.05, 0]}>
          <sphereGeometry args={[0.05 - i * 0.001, 8, 8]} />
          <meshStandardMaterial color={`hsl(${20 + i * 4}, 100%, 60%)`} emissive="#ff9800" emissiveIntensity={0.8 - i * 0.03} transparent opacity={0.7 - i * 0.03} />
        </mesh>
      ))}
      <Stars radius={30} depth={60} count={2000} factor={7} saturation={0} fade speed={1} />
      <OrbitControls />
    </>
  );
}

export default function RitualTemple3D() {
  return (
    <div style={{ width: '100%', height: '60vh', background: '#111', borderRadius: '1rem', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }} shadows>
        <TempleScene />
      </Canvas>
    </div>
  );
}
