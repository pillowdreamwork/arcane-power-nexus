import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-purple-900">
      <div className="text-center p-8 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-red-400 mb-4">⚡ Power Overload!</h2>
        <p className="text-gray-300 mb-6">Something went wrong with the arcane energies.</p>
        <pre className="text-red-300 text-sm mb-6 p-4 bg-black rounded overflow-auto">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Reset Power Grid
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;