import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-grimoire-primary/30 border-t-grimoire-primary rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-grimoire-primary rounded-full animate-pulse"></div>
        </div>
        
        {/* Mystical glow effect */}
        <div className="absolute inset-0 rounded-full bg-grimoire-primary/20 animate-ping"></div>
      </div>
      
      {/* Loading text */}
      <div className="ml-4">
        <div className="text-lg font-semibold text-grimoire-primary font-inter">Channeling Arcane Energies...</div>
        <div className="text-sm text-grimoire-foreground/70 font-inter">Please wait while the nexus initializes</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
