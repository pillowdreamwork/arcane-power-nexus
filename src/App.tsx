
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Codex from "./pages/Codex";
import Liberation from "./pages/Liberation";
import Rituals from "./pages/Rituals";
import Armory from "./pages/Armory";
import Echo from "./pages/Echo";
import Warfare from "./pages/Warfare";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import GrimoireLayout from "./components/GrimoireLayout";
import errorMonitor from "./utils/error-monitor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        errorMonitor.logError({
          message: `Query failed: ${error?.message || 'Unknown error'}`,
          severity: 'medium',
          context: { failureCount, queryKey: error?.queryKey }
        });
        
        if (failureCount < 3 && error?.name === 'NetworkError') {
          return true;
        }
        return false;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
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
    console.log('🌟 Spiritual Guidance App initialized');
    
    // Simple performance monitoring
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint' && entry.startTime > 2500) {
          errorMonitor.logError({
            message: 'Slow page load detected',
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
          <GrimoireLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/codex" element={<Codex />} />
              <Route path="/liberation" element={<Liberation />} />
              <Route path="/rituals" element={<Rituals />} />
              <Route path="/armory" element={<Armory />} />
              <Route path="/echo" element={<Echo />} />
              <Route path="/warfare" element={<Warfare />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </GrimoireLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
