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
import RitualTemple3D from './components/RitualTemple3D';
import { RitualEngine, sampleRitual } from './lib/ritualEngine';
import { TantricMentorAI } from './lib/tantricMentorAI';
import { encryptRitualData, decryptRitualData } from './lib/encryption';

const queryClient = new QueryClient();

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
      <RitualTemple3D />
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

const App = () => (
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

export default App;
