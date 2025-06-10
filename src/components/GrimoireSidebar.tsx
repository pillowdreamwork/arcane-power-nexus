import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger,
  useSidebar 
} from "@/components/ui/sidebar";
import { Star, Shield, Wand2 as Wand, Triangle, Circle, Hexagon, Zap, User, LogIn, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const sidebarItems: NavItem[] = [
  { title: "Home", url: "/", icon: Star },
  { title: "Codex", url: "/codex", icon: Hexagon },
  { title: "Liberation", url: "/liberation", icon: Triangle },
  { title: "Rituals", url: "/rituals", icon: Circle },
  { title: "Armory", url: "/armory", icon: Shield },
  { title: "Echo", url: "/echo", icon: Wand },
  { title: "Warfare", url: "/warfare", icon: Zap },
  { title: "Practice", url: "/practice", icon: Sparkles }
];

const GrimoireSidebar = () => {
  const sidebar = useSidebar();
  const isCollapsed = sidebar.state === "collapsed";
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-56"} bg-grimoire-background border-r border-grimoire-border transition-all`}>
      <SidebarTrigger className="m-2 self-end" />
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink 
                  to={item.url} 
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? "bg-grimoire-primary/10 text-grimoire-primary" 
                        : "text-grimoire-foreground hover:bg-grimoire-muted/60"
                    }`
                  }
                >
                  <item.icon className={`${isCollapsed ? "mx-auto" : "mr-3"} h-4 w-4`} />
                  {!isCollapsed && <span className="text-sm">{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {!isCollapsed && (
          <div className="mt-auto p-2 border-t border-grimoire-border">
            {user ? (
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start"
                onClick={() => navigate('/profile')}
              >
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm truncate">{user.email}</span>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                className="w-full"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default GrimoireSidebar;
