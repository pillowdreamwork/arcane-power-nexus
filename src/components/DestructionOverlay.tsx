
import React, { useEffect, useState } from 'react';
import { skull, zap, bomb } from 'lucide-react';

const DestructionOverlay: React.FC = () => {
  const [destructionLevel, setDestructionLevel] = useState(0);
  const [glitchText, setGlitchText] = useState('SYSTEM STABLE');

  useEffect(() => {
    const interval = setInterval(() => {
      setDestructionLevel(prev => {
        const next = Math.min(prev + 5, 100);
        
        if (next < 25) setGlitchText('MINOR DISTURBANCE DETECTED');
        else if (next < 50) setGlitchText('WARNING: ENERGY FLUCTUATIONS');
        else if (next < 75) setGlitchText('CRITICAL: REALITY BREACH');
        else if (next < 95) setGlitchText('CATASTROPHIC FAILURE IMMINENT');
        else setGlitchText('TOTAL SYSTEM ANNIHILATION');
        
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const glitchStyle = destructionLevel > 50 ? {
    animation: 'glitch 0.3s infinite',
    filter: `hue-rotate(${destructionLevel * 3.6}deg) saturate(${100 + destructionLevel}%)`
  } : {};

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Destruction progress bar */}
      <div className="absolute top-4 right-4 w-64 bg-black/80 border border-red-500 rounded p-2">
        <div className="text-red-500 text-xs font-mono mb-1">DESTRUCTION PROGRESS</div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${destructionLevel}%` }}
          />
        </div>
        <div className="text-red-400 text-xs font-mono mt-1">{destructionLevel}% COMPROMISED</div>
      </div>

      {/* Glitch text overlay */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 font-mono text-2xl font-bold"
        style={glitchStyle}
      >
        {glitchText}
      </div>

      {/* Warning icons */}
      {destructionLevel > 30 && (
        <div className="absolute top-20 left-20 text-red-500 animate-spin">
          <skull size={48} />
        </div>
      )}
      
      {destructionLevel > 60 && (
        <div className="absolute bottom-20 right-20 text-yellow-500 animate-pulse">
          <zap size={64} />
        </div>
      )}
      
      {destructionLevel > 90 && (
        <div className="absolute top-1/3 left-1/4 text-orange-500 animate-bounce">
          <bomb size={72} />
        </div>
      )}

      {/* Static noise overlay */}
      {destructionLevel > 40 && (
        <div 
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            animation: 'noise 0.2s infinite'
          }}
        />
      )}

      {/* Screen cracks */}
      {destructionLevel > 70 && (
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1920 1080">
            <path
              d="M100,200 L800,600 M300,100 L900,800 M500,50 L1200,900 M1500,300 L800,1000"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default DestructionOverlay;
