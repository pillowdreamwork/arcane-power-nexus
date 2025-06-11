import React, { useState, useEffect } from 'react';
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
import SimpleRitualTemple3D from './components/SimpleRitualTemple3D';
import { RitualEngine, sampleRitual } from './lib/ritualEngine';
import { TantricMentorAI } from './lib/tantricMentorAI';
import { encryptRitualData, decryptRitualData } from './lib/encryption';
import AnimatedRoutes from "./AnimatedRoutes";
import errorMonitor from "./utils/error-monitor";
import aiAgents from "./utils/ai-agents";

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
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
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

function RitualExperience() {
  const [step, setStep] = React.useState(0);
  const [ritual] = React.useState(() => new RitualEngine(sampleRitual));
  const [mentor] = React.useState(() => new TantricMentorAI());
  const [mentorMsg, setMentorMsg] = React.useState('');
  const [persona, setPersona] = React.useState<'buddha' | 'kali'>('buddha');
  const [encryptedLog, setEncryptedLog] = React.useState('');

  React.useEffect(() => {
    mentor.loadModel();
  }, [mentor]);

  const handleNext = async () => {
    const current = ritual.getCurrentStep();
    const intent = await mentor.recognizeIntent(current.content);
    setMentorMsg(mentor.guide(intent));
    if (!ritual.isComplete()) setStep(s => s + 1);
    else {
      // Ritual complete, encrypt log
      setEncryptedLog(encryptRitualData(ritual.getRitual()));
    }
  };

  const handlePersonaSwitch = () => {
    const next = persona === 'buddha' ? 'kali' : 'buddha';
    setPersona(next);
    mentor.setPersona(next);
  };

  const currentStep = ritual.getRitual().steps[step];

  return (
    <div className="p-6 flex flex-col gap-6 items-center">
      <SimpleRitualTemple3D />
      <div className="bg-black/70 text-white p-4 rounded-xl w-full max-w-xl flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">{ritual.getRitual().name}</span>
          <button onClick={handlePersonaSwitch} className="px-2 py-1 bg-indigo-700 rounded text-xs">Switch to {persona === 'buddha' ? 'Kali' : 'Buddha'}</button>
        </div>
        <div className="italic text-sm mb-2">{ritual.getRitual().description}</div>
        <div className="my-2">
          <span className="font-semibold">Step {step + 1}:</span> {currentStep.content}
        </div>
        <div className="text-cyan-300 mb-2">Mentor: {mentorMsg}</div>
        <button onClick={handleNext} className="bg-red-700 hover:bg-red-900 px-4 py-2 rounded text-white mt-2">{ritual.isComplete() ? 'Finish Ritual' : 'Next Step'}</button>
        {encryptedLog && (
          <div className="mt-4 text-xs break-all">Encrypted Ritual Log: {encryptedLog}</div>
        )}
      </div>
    </div>
  );
}

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
          <RitualExperience />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
