
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Triangle, Star, Circle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SpiritualQuote from "@/components/SpiritualQuote";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional()
});

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
  name: z.string().min(2, { message: "Please enter your name" }),
  agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms" })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuth(true);
        navigate("/");
      }
    };
    
    checkSession();
    
    // Setup auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsAuth(true);
        navigate("/");
      } else {
        setIsAuth(false);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      agreeTerms: false
    }
  });

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back",
        description: "You have successfully logged in",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account created",
        description: "Please check your email to verify your account",
      });
      
      // Auto-switch to login tab
      setActiveTab("login");
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 bg-grimoire-background p-8 flex flex-col items-center justify-center sacred-pattern font-inter">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-grimoire-primary grimoire-text-shadow font-inter mb-2">
              Post-Genesis Power Codex
            </h1>
            <p className="text-grimoire-foreground/80 font-inter">
              Enter the sacred chambers of spiritual knowledge
            </p>
          </div>
          
          <Card className="bg-grimoire-muted border-grimoire-border">
            <CardHeader className="p-0"> {/* Remove padding if TabsList is directly inside */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-grimoire-background/70 backdrop-blur-sm border-b border-grimoire-border rounded-t-md">
                  <TabsTrigger value="login" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted font-medium">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted font-medium">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-4 px-6 pb-0"> {/* Add padding back here */}
                  <CardTitle className="text-grimoire-foreground font-semibold font-inter text-xl flex items-center">
                    <Triangle className="h-5 w-5 mr-2 text-grimoire-primary grimoire-glow" />
                    Spiritual Access
                  </CardTitle>
                  <CardDescription className="font-inter text-sm text-grimoire-foreground/70">
                    Enter your credentials to access the grimoire
                  </CardDescription>
                </TabsContent>
                
                <TabsContent value="signup" className="mt-4 px-6 pb-0"> {/* Add padding back here */}
                  <CardTitle className="text-grimoire-foreground font-semibold font-inter text-xl flex items-center">
                    <Star className="h-5 w-5 mr-2 text-grimoire-primary grimoire-glow" />
                    Begin Your Journey
                  </CardTitle>
                  <CardDescription className="font-inter text-sm text-grimoire-foreground/70">
                    Create an account to unlock spiritual wisdom
                  </CardDescription>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="login" className="space-y-4">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-grimoire-foreground/90 font-inter text-sm">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="you@example.com" 
                              {...field} 
                              className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-grimoire-foreground/90 font-inter text-sm">Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field} 
                              className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-grimoire-primary data-[state=checked]:border-grimoire-primary"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium text-grimoire-foreground/90 font-inter">Remember me</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-grimoire-primary text-primary-foreground hover:bg-grimoire-primary/90 font-medium"
                    >
                      {isLoading ? "Connecting..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-grimoire-foreground/90 font-inter text-sm">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-grimoire-foreground/90 font-inter text-sm">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="you@example.com" 
                              {...field} 
                              className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-grimoire-foreground/90 font-inter text-sm">Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Create a password" 
                              {...field} 
                              className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-grimoire-foreground/90 font-inter text-sm">Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Confirm your password" 
                              {...field} 
                              className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 font-inter"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={signupForm.control}
                      name="agreeTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-grimoire-primary data-[state=checked]:border-grimoire-primary"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium text-grimoire-foreground/90 font-inter">I agree to the Terms of Service and Privacy Policy</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-grimoire-primary text-primary-foreground hover:bg-grimoire-primary/90 font-medium"
                    >
                      {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
          </Card>
          
          <SpiritualQuote />
        </div>
      </div>
      
      {/* Decorative Side Panel */}
      <div className="hidden md:block w-1/3 bg-grimoire-muted sacred-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-grimoire-primary/20 to-purple-900/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-8">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-grimoire-primary/20 blur-md animate-pulse-subtle"></div>
            <Circle className="w-16 h-16 text-grimoire-primary grimoire-text-shadow animate-float" />
          </div>
          
          <div className="text-center max-w-xs">
            <h2 className="text-2xl font-bold text-grimoire-primary grimoire-text-shadow font-inter mb-4">Spiritual Liberation</h2>
            <p className="text-grimoire-foreground/80 font-inter">
              "The path to enlightenment begins with the recognition that the self is not separate from the cosmic whole."
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full max-w-xs mt-8">
            {[Triangle, Star, Circle].map((Icon, index) => (
              <div key={index} className="aspect-square flex items-center justify-center">
                <Icon className={`w-8 h-8 text-grimoire-primary/70 animate-float`} style={{ animationDelay: `${index * 0.7}s` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
