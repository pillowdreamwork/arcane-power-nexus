
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { User, Settings, LogOut, Shield, Star, Clock, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  joined: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);
  const [favoriteTexts, setFavoriteTexts] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/auth');
          return;
        }
        
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || 'Spiritual Seeker',
          joined: new Date(session.user.created_at).toLocaleDateString(),
        });
        
        // In a real app, you'd fetch these from your database
        setSessionCount(Math.floor(Math.random() * 20));
        setFavoriteTexts(Math.floor(Math.random() * 10));
      } catch (error) {
        console.error('Error fetching user session:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Setup auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth');
      }
    });
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (data: any) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: data.name }
      });
      
      if (error) throw error;
      
      // Update local user state
      if (user) {
        setUser({
          ...user,
          name: data.name
        });
      }
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const updatePassword = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <GrimoireLayout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh] font-inter">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-grimoire-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-grimoire-foreground/70 font-inter">Loading profile...</p>
          </div>
        </div>
      </GrimoireLayout>
    );
  }
  
  if (!user) return null;

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8 font-inter">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-grimoire-primary grimoire-text-shadow font-inter animate-fade-in">
            Spiritual Profile
          </h1>
          <p className="text-grimoire-foreground/80 font-inter animate-fade-in">
            Manage your journey through the mystic realms
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <Card className="bg-grimoire-muted border-grimoire-border">
            <CardHeader className="relative pb-20">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-grimoire-primary/30 to-grimoire-secondary/30"></div>
              <div className="relative z-10 flex flex-col items-center mt-10">
                <Avatar className="w-24 h-24 border-4 border-grimoire-muted">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-grimoire-primary text-primary-foreground text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-xl text-grimoire-foreground grimoire-text-shadow font-semibold font-inter">
                  {user.name}
                </CardTitle>
                <CardDescription className="text-grimoire-foreground/70 font-inter text-sm">
                  {user.email}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-grimoire-foreground/70 font-inter">Joined</span>
                  <span className="text-sm text-grimoire-foreground font-inter">{user.joined}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-grimoire-foreground/70 font-inter">Practice Sessions</span>
                  <Badge variant="outline" className="bg-grimoire-background/50 border-grimoire-border text-grimoire-foreground/90 font-inter">
                    {sessionCount}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-grimoire-foreground/70 font-inter">Favorite Texts</span>
                  <Badge variant="outline" className="bg-grimoire-background/50 border-grimoire-border text-grimoire-foreground/90 font-inter">
                    {favoriteTexts}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-grimoire-foreground/70 font-inter">Level</span>
                  <Badge className="bg-grimoire-primary text-primary-foreground font-inter">Initiate</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full border-grimoire-border text-grimoire-foreground/80 hover:bg-grimoire-muted/80 hover:text-grimoire-foreground font-medium"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>
          
          {/* Settings Tabs */}
          <Card className="md:col-span-2 bg-grimoire-muted border-grimoire-border">
            <CardHeader>
              <CardTitle className="text-grimoire-foreground font-semibold font-inter text-xl flex items-center">
                <Settings className="h-5 w-5 mr-2 text-grimoire-primary grimoire-glow" />
                Account Settings
              </CardTitle>
              <CardDescription className="font-inter text-sm text-grimoire-foreground/70">
                Manage your profile and account preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="bg-grimoire-background/70 backdrop-blur-sm border-b border-grimoire-border grid grid-cols-3 mb-6">
                  <TabsTrigger value="profile" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted font-medium">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="security" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted font-medium">
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted font-medium">
                    Preferences
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      name: formData.get('name') as string,
                    };
                    updateProfile(data);
                  }}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-grimoire-foreground/90 font-inter text-sm">Display Name</Label>
                          <Input 
                            id="name" 
                            name="name"
                            defaultValue={user.name}
                            className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-grimoire-foreground/90 font-inter text-sm">Email</Label>
                          <Input 
                            id="email" 
                            value={user.email}
                            disabled
                            className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter opacity-70"
                          />
                          <p className="text-xs text-grimoire-foreground/50 font-inter">
                            Email cannot be changed
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-grimoire-primary text-primary-foreground hover:bg-grimoire-primary/90 font-medium"
                        disabled={isLoading}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-4">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      newPassword: formData.get('newPassword') as string,
                      confirmPassword: formData.get('confirmPassword') as string,
                    };
                    updatePassword(data);
                  }}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword" className="text-grimoire-foreground/90 font-inter text-sm">New Password</Label>
                          <Input 
                            id="newPassword"
                            name="newPassword"
                            type="password" 
                            placeholder="••••••••"
                            className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="text-grimoire-foreground/90 font-inter text-sm">Confirm Password</Label>
                          <Input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password" 
                            placeholder="••••••••"
                            className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-grimoire-primary text-primary-foreground hover:bg-grimoire-primary/90 font-medium"
                        disabled={isLoading}
                      >
                        Update Password
                      </Button>
                    </div>
                  </form>
                  
                  <div className="rounded-md bg-grimoire-background border-grimoire-border p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-grimoire-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-grimoire-foreground font-inter mb-1">Account Security</h4>
                        <p className="text-xs text-grimoire-foreground/70 font-inter">
                          Your account is secured with email authentication. For additional security, consider using a strong, unique password.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-grimoire-foreground/90 font-inter">Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notifications-practice" defaultChecked />
                          <Label htmlFor="notifications-practice" className="text-sm font-medium text-grimoire-foreground/90 font-inter">Practice reminders</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notifications-content" defaultChecked />
                          <Label htmlFor="notifications-content" className="text-sm font-medium text-grimoire-foreground/90 font-inter">New content alerts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="notifications-community" />
                          <Label htmlFor="notifications-community" className="text-sm font-medium text-grimoire-foreground/90 font-inter">Community updates</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-grimoire-foreground/90 font-inter">Display Preferences</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="animations" defaultChecked />
                          <Label htmlFor="animations" className="text-sm font-medium text-grimoire-foreground/90 font-inter">Enable animations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="sounds" />
                          <Label htmlFor="sounds" className="text-sm font-medium text-grimoire-foreground/90 font-inter">Enable ambient sounds</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-grimoire-primary text-primary-foreground hover:bg-grimoire-primary/90 font-medium"
                    >
                      Save Preferences
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Progress Section */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-4 text-grimoire-foreground grimoire-text-shadow font-inter">
              Your Spiritual Journey
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-grimoire-muted border-grimoire-border hover:border-grimoire-primary/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-grimoire-foreground font-inter flex items-center">
                      <Star className="h-5 w-5 mr-2 text-grimoire-primary grimoire-glow" />
                      Recent Practices
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Void Meditation", date: "2 days ago", duration: "15 min" },
                      { title: "Energy Circulation", date: "5 days ago", duration: "10 min" },
                      { title: "Psychic Shield", date: "1 week ago", duration: "8 min" }
                    ].map((practice, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-grimoire-border pb-2 last:border-0">
                        <div>
                          <p className="text-sm font-medium text-grimoire-foreground font-inter">{practice.title}</p>
                          <p className="text-xs text-grimoire-foreground/60 font-inter">{practice.date}</p>
                        </div>
                        <Badge variant="outline" className="border-grimoire-border bg-grimoire-background/50 text-grimoire-foreground/80 font-inter">{practice.duration}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-grimoire-muted/60 border-grimoire-border text-grimoire-foreground/80 hover:text-grimoire-foreground font-medium"
                    onClick={() => navigate('/practice')}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    View All Practices
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-grimoire-muted border-grimoire-border hover:border-grimoire-primary/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-grimoire-foreground font-inter flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-grimoire-primary grimoire-glow" />
                      Saved Texts
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "The Matrix of Mind", source: "Dattatreya Tantra" },
                      { title: "Consciousness as Substrate", source: "Kashmir Shaivism" },
                      { title: "Liberating Knowledge", source: "Tripura Doctrine" }
                    ].map((text, i) => (
                      <div key={i} className="border-b border-grimoire-border pb-2 last:border-0">
                        <p className="text-sm font-medium text-grimoire-foreground font-inter">{text.title}</p>
                        <p className="text-xs text-grimoire-foreground/60 font-inter">{text.source}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-grimoire-muted/60 border-grimoire-border text-grimoire-foreground/80 hover:text-grimoire-foreground font-medium"
                    onClick={() => navigate('/codex')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View All Saved Texts
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-grimoire-muted border-grimoire-border hover:border-grimoire-primary/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-grimoire-foreground font-inter flex items-center">
                      <User className="h-5 w-5 mr-2 text-grimoire-primary grimoire-glow" />
                      Path Progress
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-inter">
                        <span className="text-grimoire-foreground/70">Meditation</span>
                        <span className="text-grimoire-foreground">60%</span>
                      </div>
                      <div className="w-full bg-grimoire-background rounded-full h-2">
                        <div className="bg-grimoire-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-inter">
                        <span className="text-grimoire-foreground/70">Energy Work</span>
                        <span className="text-grimoire-foreground">45%</span>
                      </div>
                      <div className="w-full bg-grimoire-background rounded-full h-2">
                        <div className="bg-grimoire-secondary h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-inter">
                        <span className="text-grimoire-foreground/70">Protection</span>
                        <span className="text-grimoire-foreground">80%</span>
                      </div>
                      <div className="w-full bg-grimoire-background rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-inter">
                        <span className="text-grimoire-foreground/70">Projection</span>
                        <span className="text-grimoire-foreground">25%</span>
                      </div>
                      <div className="w-full bg-grimoire-background rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-grimoire-muted/60 border-grimoire-border text-grimoire-foreground/80 hover:text-grimoire-foreground font-medium"
                    onClick={() => navigate('/practice')}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Begin New Practice
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </GrimoireLayout>
  );
};

export default Profile;
