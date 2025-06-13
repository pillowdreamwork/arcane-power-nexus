
import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'fire' | 'lightning' | 'void' | 'chaos';
}

const ChaosEnergyParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const [chaosLevel, setChaosLevel] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gradually increase chaos level
    const chaosInterval = setInterval(() => {
      setChaosLevel(prev => Math.min(prev + 10, 100));
    }, 1000);

    const createParticle = (x: number, y: number, type: Particle['type'] = 'fire'): Particle => {
      const colors = {
        fire: ['#ff0000', '#ff4400', '#ff6600', '#ffaa00'],
        lightning: ['#ffffff', '#aaffff', '#0088ff', '#4400ff'],
        void: ['#000000', '#330033', '#660066', '#990099'],
        chaos: ['#ff0066', '#ff6600', '#00ff66', '#6600ff']
      };

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 100,
        maxLife: 100,
        size: Math.random() * 8 + 2,
        color: colors[type][Math.floor(Math.random() * colors[type].length)],
        type
      };
    };

    const createExplosion = (x: number, y: number) => {
      for (let i = 0; i < 20; i++) {
        const particle = createParticle(x, y, 'chaos');
        particle.vx = (Math.random() - 0.5) * 20;
        particle.vy = (Math.random() - 0.5) * 20;
        particle.size = Math.random() * 12 + 4;
        particlesRef.current.push(particle);
      }
    };

    const createLightning = () => {
      const startX = Math.random() * canvas.width;
      const startY = 0;
      let currentX = startX;
      let currentY = startY;

      for (let i = 0; i < 50; i++) {
        const particle = createParticle(currentX, currentY, 'lightning');
        particle.vx = (Math.random() - 0.5) * 4;
        particle.vy = Math.random() * 8 + 4;
        particle.size = Math.random() * 6 + 2;
        particle.life = 60;
        particle.maxLife = 60;
        particlesRef.current.push(particle);

        currentX += (Math.random() - 0.5) * 40;
        currentY += Math.random() * 20 + 10;

        if (currentY > canvas.height) break;
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new particles based on chaos level
      if (Math.random() < chaosLevel / 100) {
        // Random explosions
        if (Math.random() < 0.3) {
          createExplosion(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          );
        }

        // Lightning strikes
        if (Math.random() < 0.2) {
          createLightning();
        }

        // Chaos energy
        for (let i = 0; i < Math.floor(chaosLevel / 10); i++) {
          particlesRef.current.push(createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() < 0.5 ? 'fire' : 'void'
          ));
        }
      }

      // Update and render particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        // Chaos effects
        if (chaosLevel > 50) {
          particle.vx += (Math.random() - 0.5) * 0.5;
          particle.vy += (Math.random() - 0.5) * 0.5;
        }

        // Gravity for fire particles
        if (particle.type === 'fire') {
          particle.vy += 0.1;
        }

        // Void particles move toward center
        if (particle.type === 'void') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dx = centerX - particle.x;
          const dy = centerY - particle.y;
          particle.vx += dx * 0.001;
          particle.vy += dy * 0.001;
        }

        const alpha = particle.life / particle.maxLife;
        ctx.globalAlpha = alpha;
        
        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Lightning trail effect
        if (particle.type === 'lightning' && Math.random() < 0.3) {
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x + particle.vx * 5, particle.y + particle.vy * 5);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        return particle.life > 0;
      });

      // Screen shake effect at high chaos
      if (chaosLevel > 80) {
        const shakeX = (Math.random() - 0.5) * 10;
        const shakeY = (Math.random() - 0.5) * 10;
        ctx.translate(shakeX, shakeY);
      }

      // Chaos overlay
      if (chaosLevel > 60) {
        ctx.fillStyle = `rgba(255, 0, 100, ${(chaosLevel - 60) / 200})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(chaosInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ mixBlendMode: 'screen' }}
      />
      {chaosLevel > 70 && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div 
            className="absolute inset-0 bg-red-500 animate-pulse"
            style={{ 
              opacity: (chaosLevel - 70) / 100,
              animation: 'pulse 0.1s infinite'
            }}
          />
        </div>
      )}
      {chaosLevel > 90 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-60">
          <div className="text-red-500 text-6xl font-bold animate-bounce">
            CHAOS UNLEASHED
          </div>
        </div>
      )}
    </>
  );
};

export default ChaosEnergyParticles;
