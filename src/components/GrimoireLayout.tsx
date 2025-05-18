
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import GrimoireSidebar from "./GrimoireSidebar";

interface GrimoireLayoutProps {
  children: React.ReactNode;
}

const GrimoireLayout: React.FC<GrimoireLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider collapsedWidth={64}>
      <div className="flex w-full min-h-screen bg-grimoire-background">
        <GrimoireSidebar />
        <main className="flex-1 overflow-auto yantra-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default GrimoireLayout;
