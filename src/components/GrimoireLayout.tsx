
import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import GrimoireSidebar from "./GrimoireSidebar";

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
          {/* Ambient mystical effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/5 to-indigo-900/5"></div>
            <div className={`absolute inset-0 bg-grimoire-primary/5 sacred-pattern opacity-${Math.floor(energyLevel/10)}`}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-grimoire-primary/5 blur-3xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default GrimoireLayout;
