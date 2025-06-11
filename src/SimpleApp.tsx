import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages to prevent initial loading issues
const Index = React.lazy(() => import("./pages/Index").catch(() => ({ 
  default: () => <div className="p-8 text-center text-purple-300">Loading Arcane Index...</div> 
})));

const Codex = React.lazy(() => import("./pages/Codex").catch(() => ({ 
  default: () => <div className="p-8 text-center text-purple-300">Loading Codex...</div> 
})));

const Echo = React.lazy(() => import("./pages/Echo").catch(() => ({ 
  default: () => <div className="p-8 text-center text-purple-300">Loading Echo...</div> 
})));

const NotFound = React.lazy(() => import("./pages/NotFound").catch(() => ({ 
  default: () => <div className="p-8 text-center text-purple-300">Page Not Found</div> 
})));

// Simplified QueryClient with basic error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function SimpleApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/codex" element={<Codex />} />
                <Route path="/echo" element={<Echo />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default SimpleApp;
