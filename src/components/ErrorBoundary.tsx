import React from 'react';

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Application error caught by boundary:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 text-center max-w-md">
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-2xl font-bold mb-4 text-red-400">Power Surge Detected!</h1>
          <p className="mb-6 text-purple-200">
            The arcane energies are unstable. Let me recalibrate the mystical systems...
          </p>
          <button
            onClick={() => {
              setHasError(false);
              window.location.reload();
            }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            🔮 Restore Balance
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
