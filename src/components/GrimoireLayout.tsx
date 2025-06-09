
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import GrimoireSidebar from "./GrimoireSidebar";
import EnergyParticles from "./EnergyParticles";
import RevealOnScroll from "./RevealOnScroll";
import SystemStatus from "./SystemStatus";
import { motion } from "framer-motion";
import SpiritualProgress from "./SpiritualProgress";

interface GrimoireLayoutProps {
  children: React.ReactNode;
}

const GrimoireLayout: React.FC<GrimoireLayoutProps> = ({ children }) => {
  const [energyLevel, setEnergyLevel] = useState(0);
  
  // Simulate energy field building up over time
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnergyLevel(prev => Math.min(prev + 20, 100));
    }, 500);
    
    return () => clearTimeout(timer);
  }, [energyLevel]);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-grimoire-background">
        <GrimoireSidebar />
        <main className="flex-1 overflow-auto yantra-background relative">
          {/* Energy Particle System - Mystical animated energy field */}
          <EnergyParticles />
          
          {/* Ambient mystical effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/5 to-indigo-900/5"></div>
            <div className={`absolute inset-0 bg-grimoire-primary/5 sacred-pattern opacity-${Math.floor(energyLevel/10)}`}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-grimoire-primary/5 blur-3xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <SpiritualProgress />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -24 }}
              transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
            >
              <RevealOnScroll>
                {children}
              </RevealOnScroll>
            </motion.div>
          </div>
          
          {/* System Status - Only show in development or for admin users */}
          {process.env.NODE_ENV === 'development' && <SystemStatus />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default GrimoireLayout;
