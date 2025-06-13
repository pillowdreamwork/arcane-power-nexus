
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = React.useState<ErrorBoundaryState>({ hasError: false });

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Application error caught by boundary:', error);
      setState({ hasError: true, error: error.error });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setState({ hasError: true, error: new Error(event.reason) });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const handleRestore = () => {
    setState({ hasError: false, error: undefined });
    // Clear any error states and reload
    window.location.reload();
  };

  const handleReportError = () => {
    // In production, you could send error reports to a logging service
    if (state.error) {
      console.error('Error reported:', state.error);
      // Example: sendErrorReport(state.error);
    }
  };

  if (state.hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 text-center max-w-md">
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-2xl font-bold mb-4 text-red-400">Arcane Disruption Detected</h1>
          <p className="mb-6 text-purple-200">
            The mystical energies have encountered an unexpected disturbance. 
            Let us restore the cosmic balance...
          </p>
          
          {import.meta.env.DEV && state.error && (
            <details className="mb-4 text-left bg-black/20 rounded p-3">
              <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
              <pre className="mt-2 text-xs text-red-300 overflow-auto">
                {state.error.message}
                {state.error.stack && '\n' + state.error.stack}
              </pre>
            </details>
          )}
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestore}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              🔮 Restore Balance
            </button>
            
            {import.meta.env.PROD && (
              <button
                onClick={handleReportError}
                className="px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-all duration-300 text-sm"
              >
                📋 Report Issue
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
