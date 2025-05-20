
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, PerspectiveCamera } from "@react-three/drei";
import { useToast } from "@/hooks/use-toast";
import * as THREE from 'three';

// 3D Ritual Circle Component
const RitualCircle = ({ active, energy, onInteract }: { active: boolean, energy: number, onInteract: () => void }) => {
  const circleRef = useRef<THREE.Mesh>(null);
  const glyphRef = useRef<THREE.Group>(null);
  
  // Animate the circle based on energy level
  useFrame((state) => {
    if (!circleRef.current || !glyphRef.current) return;
    
    // Pulsating effect
    const t = state.clock.getElapsedTime();
    circleRef.current.scale.x = circleRef.current.scale.z = 1 + Math.sin(t * 2) * 0.03 * energy/100;
    
    // Rotate the glyphs based on energy
    glyphRef.current.rotation.y = t * 0.2 * (energy/50);
    
    // Glow intensity based on activation
    if (active) {
      // Fix: Check if the material is a MeshStandardMaterial before accessing emissive
      const material = circleRef.current.material as THREE.MeshStandardMaterial;
      if (material && material.emissive) {
        material.emissive.r = 0.5 + Math.sin(t * 3) * 0.2;
        material.emissive.b = 0.7 + Math.cos(t * 2) * 0.3;
      }
    }
  });

  return (
    <group onClick={onInteract}>
      {/* Main ritual circle */}
      <mesh
        ref={circleRef}
        position={[0, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <ringGeometry args={[4, 5, 64]} />
        <meshStandardMaterial 
          color={active ? "#8B5CF6" : "#4F46E5"} 
          emissive={active ? "#8B5CF6" : "#000000"}
          emissiveIntensity={active ? 2 : 0.5}
          roughness={0.4}
          metalness={0.8}
          opacity={0.9}
          transparent={true}
        />
      </mesh>
      
      {/* Inner ritual circle */}
      <mesh
        position={[0, 0.06, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <ringGeometry args={[2, 3.5, 64]} />
        <meshStandardMaterial 
          color="#6366F1" 
          emissive="#6366F1"
          emissiveIntensity={active ? 1 : 0.3}
          roughness={0.5}
          metalness={0.7}
          opacity={0.8}
          transparent={true}
        />
      </mesh>
      
      {/* Ritual glyphs */}
      <group ref={glyphRef}>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <Text
            key={`glyph-${i}`}
            position={[
              Math.cos((angle * Math.PI) / 180) * 3,
              0.1,
              Math.sin((angle * Math.PI) / 180) * 3
            ]}
            rotation={[-Math.PI / 2, 0, (angle * Math.PI) / 180]}
            color={active ? "#F9FAFB" : "#D1D5DB"}
            fontSize={0.5}
            font="/fonts/symbola.ttf"
            anchorX="center"
            anchorY="middle"
          >
            {["⛧", "⸸", "☤", "⍟", "⎔", "⌬"][i]}
          </Text>
        ))}
      </group>
      
      {/* Energy particles */}
      {active && energy > 30 && Array(Math.floor(energy / 20)).fill(0).map((_, i) => (
        <mesh key={`particle-${i}`} position={[
          (Math.random() - 0.5) * 6,
          Math.random() * 2,
          (Math.random() - 0.5) * 6
        ]}>
          <sphereGeometry args={[0.05 + Math.random() * 0.1, 8, 8]} />
          <meshStandardMaterial
            color="#A78BFA"
            emissive="#A78BFA"
            emissiveIntensity={2}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main 3D Environment
const RitualScene = ({ 
  active, 
  energyLevel, 
  ritualType, 
  onEnergyChange 
}: { 
  active: boolean, 
  energyLevel: number, 
  ritualType: string, 
  onEnergyChange: (value: number) => void 
}) => {
  const { toast } = useToast();
  
  const handleInteract = () => {
    if (!active) return;
    
    const newEnergy = Math.min(energyLevel + 10, 100);
    onEnergyChange(newEnergy);
    
    if (newEnergy >= 100) {
      toast({
        title: "Ritual Energy Maximized",
        description: "The ritual circle is fully charged with energy",
      });
    } else {
      toast({
        description: "Energy channeled into the ritual circle",
      });
    }
  };
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#A78BFA" />
      
      <fog attach="fog" args={["#121218", 8, 30]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
      
      <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
      <OrbitControls 
        enableZoom={true}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.5}
        minDistance={5}
        maxDistance={18}
      />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#121218" 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Main ritual elements */}
      <RitualCircle active={active} energy={energyLevel} onInteract={handleInteract} />
      
      {/* Ritual specific elements */}
      {ritualType === "circle" && (
        <group>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <mesh
              key={`candle-${i}`}
              position={[
                Math.cos((angle * Math.PI) / 180) * 5,
                0.5,
                Math.sin((angle * Math.PI) / 180) * 5
              ]}
              castShadow
            >
              <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
              <meshStandardMaterial color="#f8fafc" />
              
              {/* Flame */}
              {active && (
                <pointLight
                  position={[0, 1, 0]}
                  distance={4}
                  intensity={1}
                  color="#f59e0b"
                />
              )}
            </mesh>
          ))}
        </group>
      )}
      
      {ritualType === "triangle" && (
        <group>
          {[0, 120, 240].map((angle, i) => (
            <mesh
              key={`mirror-${i}`}
              position={[
                Math.cos((angle * Math.PI) / 180) * 5,
                0.5,
                Math.sin((angle * Math.PI) / 180) * 5
              ]}
              rotation={[0, -((angle * Math.PI) / 180) + Math.PI/2, 0]}
              castShadow
            >
              <boxGeometry args={[0.2, 2, 1.5]} />
              <meshStandardMaterial 
                color="#000000" 
                metalness={0.9}
                roughness={0.1}
                envMapIntensity={1}
              />
            </mesh>
          ))}
        </group>
      )}
      
      {ritualType === "mirror" && (
        <group>
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <mesh
              key={`mirror-${i}`}
              position={[
                Math.cos((angle * Math.PI) / 180) * 5,
                1,
                Math.sin((angle * Math.PI) / 180) * 5
              ]}
              rotation={[0, -((angle * Math.PI) / 180) + Math.PI/2, 0]}
              castShadow
            >
              <boxGeometry args={[0.1, 2, 1]} />
              <meshStandardMaterial 
                color="#1e293b" 
                metalness={1}
                roughness={0}
                envMapIntensity={1}
              />
            </mesh>
          ))}
        </group>
      )}
      
      {ritualType === "yajna" && (
        <group>
          {/* Fire pit */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[1.5, 2, 0.5, 32]} />
            <meshStandardMaterial color="#5b21b6" />
          </mesh>
          
          {/* Fire */}
          {active && (
            <pointLight
              position={[0, 1, 0]}
              distance={8}
              intensity={2}
              color="#f59e0b"
            />
          )}
        </group>
      )}
    </>
  );
};

// Main Environment Component
const RitualEnvironment: React.FC<{
  active: boolean;
  energyLevel: number;
  ritualType: string;
  onEnergyChange: (value: number) => void;
  className?: string;
}> = ({ active, energyLevel, ritualType, onEnergyChange, className = "" }) => {
  return (
    <div className={`w-full h-[500px] rounded-lg overflow-hidden ${className}`}>
      <Canvas shadows>
        <RitualScene 
          active={active} 
          energyLevel={energyLevel} 
          ritualType={ritualType} 
          onEnergyChange={onEnergyChange}
        />
      </Canvas>
    </div>
  );
};

export default RitualEnvironment;
