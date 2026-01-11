import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Wait for animation to play (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
      // 2. Tell the parent App that we are done
      if (onFinish) onFinish();
    }, 3500); // 3.5 seconds total duration

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center animate-fade-out">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <img 
          src="/logo.png" 
          alt="Boot Logo" 
          className="w-64 h-auto drop-shadow-2xl animate-pulse-slow mb-8"
        />
        
        {/* Loading Bar / Text */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-8">
          <div className="h-full bg-primary animate-loading-bar"></div>
        </div>
        
        <p className="text-gray-500 text-sm mt-4 font-mono animate-pulse">
          INITIALIZING SYSTEMS...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;