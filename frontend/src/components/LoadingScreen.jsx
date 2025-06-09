import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white w-10 h-10"
            >
              <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
              <path d="M21 12a9 9 0 0 0-9-9v9h9z" />
              <path d="M12 12 2.1 12.5" />
              <path d="m4.5 15 5 5" />
              <path d="m4.5 9 5-5" />
            </svg>
          </div>
        </div>
        
        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">EcoTravelAI</h2>
          <p className="text-gray-600">Loading your journey...</p>
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-green-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 