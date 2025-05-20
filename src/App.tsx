
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

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
          <Route path="/practice" element={<Practice />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
