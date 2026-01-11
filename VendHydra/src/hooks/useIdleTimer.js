import { useState, useEffect } from 'react';

// Default timeout: 60 seconds (60000 ms)
const useIdleTimer = (timeout = 60000) => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer;

    const handleActivity = () => {
      if (isIdle) {
        setIsIdle(false); // Wake up!
      }
      clearTimeout(timer);
      // Reset the timer on any activity
      timer = setTimeout(() => setIsIdle(true), timeout);
    };

    // Events to detect activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    // Start the timer immediately on mount
    timer = setTimeout(() => setIsIdle(true), timeout);

    return () => {
      // Cleanup
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [isIdle, timeout]);

  return isIdle;
};

export default useIdleTimer;