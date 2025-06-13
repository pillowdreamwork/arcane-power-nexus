
import React from 'react';
import GrimoireLayout from './GrimoireLayout';
import ChaosEnergyParticles from './ChaosEnergyParticles';
import DestructionOverlay from './DestructionOverlay';

interface ChaosLayoutProps {
  children: React.ReactNode;
}

const ChaosLayout: React.FC<ChaosLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <GrimoireLayout>
        {children}
      </GrimoireLayout>
      <ChaosEnergyParticles />
      <DestructionOverlay />
      
      {/* Chaos-specific CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes glitch {
            0% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-2px); }
            80% { transform: translateX(2px); }
            100% { transform: translateX(0); }
          }
          
          @keyframes noise {
            0% { transform: translateX(0px); }
            10% { transform: translateX(-1px); }
            20% { transform: translateX(1px); }
            30% { transform: translateX(-1px); }
            40% { transform: translateX(1px); }
            50% { transform: translateX(0px); }
            60% { transform: translateX(1px); }
            70% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
            90% { transform: translateX(-1px); }
            100% { transform: translateX(0px); }
          }
          
          .chaos-glitch {
            animation: glitch 0.3s infinite;
          }
          
          body {
            animation: chaos-shake 0.1s infinite;
          }
          
          @keyframes chaos-shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-1px); }
            50% { transform: translateX(1px); }
            75% { transform: translateX(-1px); }
            100% { transform: translateX(0); }
          }
        `
      }} />
    </div>
  );
};

export default ChaosLayout;
