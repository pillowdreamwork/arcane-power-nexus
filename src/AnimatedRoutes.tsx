
import React, { Suspense, lazy } from 'react';
import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

// Lazy load pages with error boundaries
const Index = lazy(() => import("./pages/Index").catch(() => ({ default: () => <div>Error loading Index</div> })));
const Codex = lazy(() => import("./pages/Codex").catch(() => ({ default: () => <div>Error loading Codex</div> })));
const Liberation = lazy(() => import("./pages/Liberation").catch(() => ({ default: () => <div>Error loading Liberation</div> })));
const Rituals = lazy(() => import("./pages/Rituals").catch(() => ({ default: () => <div>Error loading Rituals</div> })));
const Armory = lazy(() => import("./pages/Armory").catch(() => ({ default: () => <div>Error loading Armory</div> })));
const Echo = lazy(() => import("./pages/Echo").catch(() => ({ default: () => <div>Error loading Echo</div> })));
const Warfare = lazy(() => import("./pages/Warfare").catch(() => ({ default: () => <div>Error loading Warfare</div> })));
const NotFound = lazy(() => import("./pages/NotFound").catch(() => ({ default: () => <div>Error loading NotFound</div> })));
const Auth = lazy(() => import("./pages/Auth").catch(() => ({ default: () => <div>Error loading Auth</div> })));
const Practice = lazy(() => import("./pages/Practice").catch(() => ({ default: () => <div>Error loading Practice</div> })));
const Profile = lazy(() => import("./pages/Profile").catch(() => ({ default: () => <div>Error loading Profile</div> })));

// Enhanced loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-grimoire-background">
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-center mb-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-grimoire-primary"></div>
      </div>
      <Skeleton className="h-12 w-3/4 mx-auto bg-grimoire-muted" />
      <Skeleton className="h-32 w-full bg-grimoire-muted" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-grimoire-muted" />
        <Skeleton className="h-4 w-5/6 bg-grimoire-muted" />
        <Skeleton className="h-4 w-4/6 bg-grimoire-muted" />
      </div>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error }: { error?: Error }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-grimoire-background text-grimoire-foreground">
    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
    <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
    <p className="text-grimoire-foreground/70 mb-4 text-center max-w-md">
      {error?.message || "An unexpected error occurred while loading this page."}
    </p>
    <button 
      onClick={() => window.location.reload()} 
      className="px-4 py-2 bg-grimoire-primary text-white rounded hover:bg-grimoire-primary/90 transition-colors"
    >
      Reload Page
    </button>
  </div>
);

// Route error boundary
class RouteErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Route error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <RouteErrorBoundary>
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
    </RouteErrorBoundary>
  );
}
