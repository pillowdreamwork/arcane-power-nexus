
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import errorMonitor from "./utils/error-monitor";
import aiAgents from "./utils/ai-agents";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Log query errors to our monitoring system
        errorMonitor.logError({
          message: `Query failed: ${error?.message || 'Unknown error'}`,
          severity: 'medium',
          context: { failureCount, queryKey: error?.queryKey }
        });
        
        // Retry up to 3 times for network errors
        if (failureCount < 3 && error?.name === 'NetworkError') {
          return true;
        }
        return false;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      onError: (error: any) => {
        errorMonitor.logError({
          message: `Mutation failed: ${error?.message || 'Unknown error'}`,
          severity: 'high',
          context: { error }
        });
      }
    }
  },
});

const App = () => {
  useEffect(() => {
    // Initialize monitoring systems
    console.log('🚀 Arcane Power Nexus initialized with advanced monitoring');
    
    // Start AI agents after a short delay to allow the app to fully load
    setTimeout(() => {
      aiAgents.getSystemStatus();
    }, 3000);

    // Performance monitoring
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint' && entry.startTime > 2500) {
          errorMonitor.logError({
            message: 'Slow LCP detected',
            severity: 'medium',
            context: { lcp: entry.startTime, type: 'performance' }
          });
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
