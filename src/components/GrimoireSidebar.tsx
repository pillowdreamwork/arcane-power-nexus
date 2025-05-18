
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger,
  useSidebar 
} from "@/components/ui/sidebar";
import { 
  Star, 
  Shield, 
  Wand, 
  Triangle, 
  Circle, 
  Hexagon,
  Zap
} from "lucide-react";

const sidebarItems = [
  { 
    title: "Arcane Nexus", 
    url: "/", 
    icon: Star,
    description: "Main grimoire interface"
  },
  { 
    title: "Convergence Codex", 
    url: "/codex", 
    icon: Hexagon,
    description: "Taxonomical organization"
  },
  { 
    title: "Liberation System", 
    url: "/liberation", 
    icon: Triangle,
    description: "Break psychic prisons"
  },
  { 
    title: "Ritual Spaces", 
    url: "/rituals", 
    icon: Circle,
    description: "Customizable chambers"
  },
  { 
    title: "War Armory", 
    url: "/armory", 
    icon: Shield,
    description: "Tools and components"
  },
  { 
    title: "Echo Assistant", 
    url: "/echo", 
    icon: Wand,
    description: "AI spiritual guide"
  },
  { 
    title: "Psychic Warfare", 
    url: "/warfare", 
    icon: Zap,
    description: "Combat and defense"
  }
];

const GrimoireSidebar = () => {
  const { collapsed } = useSidebar();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = window.location;
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = sidebarItems.some((i) => isActive(i.url));
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-grimoire-muted text-grimoire-primary font-medium flex items-center p-2 rounded-md grimoire-text-shadow grimoire-glow"
      : "hover:bg-grimoire-muted/60 flex items-center p-2 rounded-md transition-colors duration-200";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-grimoire-background border-r border-grimoire-border transition-all duration-300 sacred-pattern`}
      collapsible
    >
      <SidebarTrigger className="m-2 self-end text-grimoire-primary hover:text-grimoire-foreground grimoire-glow" />
      
      <div className="flex justify-center mb-6 mt-2">
        <div 
          className={`text-center ${collapsed ? "scale-75" : ""} transition-transform duration-300`}
        >
          {!collapsed && (
            <h1 className="text-xl font-bold text-grimoire-primary grimoire-text-shadow">
              Post-Genesis
            </h1>
          )}
          <div className="relative w-12 h-12 mx-auto my-2">
            <div className="absolute inset-0 bg-grimoire-primary/20 rounded-full animate-pulse-subtle"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className="w-8 h-8 text-grimoire-primary animate-float grimoire-glow" />
            </div>
          </div>
          {!collapsed && (
            <h2 className="text-lg font-semibold text-grimoire-foreground">
              Power Codex
            </h2>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup open={true}>
          <SidebarGroupLabel 
            className={`text-grimoire-foreground/70 ${collapsed ? "sr-only" : ""}`}
          >
            Grimoire Sections
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <div 
                    className="relative" 
                    onMouseEnter={() => setHoveredItem(item.title)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavCls}>
                        <item.icon 
                          className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5 ${isActive(item.url) ? "text-grimoire-primary" : "text-grimoire-foreground/80"}`} 
                        />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                    
                    {hoveredItem === item.title && !collapsed && (
                      <div 
                        className="absolute left-0 bottom-0 h-0.5 bg-grimoire-primary animate-pulse-subtle"
                        style={{ width: "100%" }}
                      ></div>
                    )}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className={`mt-auto mb-4 px-4 pt-4 border-t border-grimoire-border ${collapsed ? "hidden" : ""}`}>
          <div className="text-xs text-grimoire-foreground/50 text-center animate-pulse-subtle">
            <p>Energy Level: High</p>
            <div className="w-full bg-grimoire-muted rounded-full h-1 mt-1">
              <div className="bg-grimoire-primary h-1 rounded-full w-4/5"></div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default GrimoireSidebar;
