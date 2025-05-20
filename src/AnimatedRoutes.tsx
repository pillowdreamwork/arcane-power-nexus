
import React, { Suspense, lazy } from 'react';
import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Codex = lazy(() => import("./pages/Codex"));
const Liberation = lazy(() => import("./pages/Liberation"));
const Rituals = lazy(() => import("./pages/Rituals"));
const Armory = lazy(() => import("./pages/Armory"));
const Echo = lazy(() => import("./pages/Echo"));
const Warfare = lazy(() => import("./pages/Warfare"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Practice = lazy(() => import("./pages/Practice"));
const Profile = lazy(() => import("./pages/Profile"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-grimoire-background">
    <div className="w-full max-w-md space-y-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  </div>
);

export default function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
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
      </Suspense>
    </AnimatePresence>
  );
}
