import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { tsParticles } from "@tsparticles/engine";

/**
 * EnergyParticles - Mystical animated energy particle system for the Arcane Power Nexus.
 * Creative: Uses glowing orbs, runes, and sparkles with subtle motion and color cycling.
 */
export default function EnergyParticles() {
  // Custom initialization for mystical effects
  const particlesInit = useCallback(async (engine) => {
    // @ts-ignore
    await tsParticles.load(engine);
  }, []);

  return (
    <Particles
      id="energy-particles"
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        background: { color: { value: "#18182500" } },
        particles: {
          number: { value: 66, density: { enable: true } },
          color: { value: ["#a78bfa", "#f472b6", "#facc15", "#38bdf8"] },
          shape: {
            type: ["circle", "polygon"],
            options: {
              polygon: { sides: 6 },
            },
          },
          opacity: {
            value: 0.7,
            animation: { enable: true, speed: 0.5, sync: false },
          },
          size: {
            value: { min: 2, max: 7 },
            animation: { enable: true, speed: 2, sync: false },
          },
          links: {
            enable: true,
            distance: 120,
            color: "#a3e635",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
            attract: { enable: true, rotate: { x: 600, y: 1200 } },
          },
          shadow: {
            enable: true,
            color: "#f472b6",
            blur: 5,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: ["repulse", "bubble"] },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 120, duration: 0.4 },
            bubble: { distance: 140, size: 10, duration: 2, opacity: 0.8 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
