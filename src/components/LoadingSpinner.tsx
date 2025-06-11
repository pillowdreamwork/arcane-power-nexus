import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-purple-300/30 border-t-purple-500 rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Mystical glow effect */}
        <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping"></div>
      </div>
      
      {/* Loading text */}
      <div className="ml-4 text-purple-300">
        <div className="text-lg font-semibold">Channeling Arcane Energies...</div>
        <div className="text-sm opacity-70">Please wait while the nexus initializes</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
