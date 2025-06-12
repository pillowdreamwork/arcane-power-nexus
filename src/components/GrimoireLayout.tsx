
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import GrimoireSidebar from "./GrimoireSidebar";
import EnergyParticles from "./EnergyParticles";
import { motion } from "framer-motion";
import SpiritualProgress from "./SpiritualProgress";
import SystemStatus from "./SystemStatus";

interface GrimoireLayoutProps {
  children: React.ReactNode;
}

const GrimoireLayout: React.FC<GrimoireLayoutProps> = ({ children }) => {
  const [energyLevel, setEnergyLevel] = useState(20);
  
  // Gentle energy field that builds naturally
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnergyLevel(prev => Math.min(prev + 15, 80));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-grimoire-background">
        <GrimoireSidebar />
        <main className="flex-1 overflow-auto relative">
          {/* Subtle mystical background */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/3 to-indigo-900/3"></div>
            <div className={`absolute inset-0 bg-grimoire-primary/3 opacity-${Math.floor(energyLevel/20)} transition-opacity duration-1000`}></div>
          </div>
          
          {/* Optional energy particles for ambiance */}
          <EnergyParticles />
          
          {/* Content with smooth transitions */}
          <div className="relative z-10">
            <SpiritualProgress />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="min-h-screen"
            >
              {children}
            </motion.div>
          </div>
          
          {/* Development tools */}
          {process.env.NODE_ENV === 'development' && <SystemStatus />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default GrimoireLayout;
