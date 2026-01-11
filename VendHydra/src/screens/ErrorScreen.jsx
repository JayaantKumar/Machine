import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

// Red Warning Icon SVG
const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[150px] h-[150px] text-red-500"
  >
    <path
      fillRule="evenodd"
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.556 13.004c1.154 2-.29 4.5-2.599 4.5H4.444C2.136 20.507.7 18.007 1.846 16.007l7.556-13.004zM12 1.5c-2.22 0-4.203 1.53-4.908 3.593L.034 18.097c-1.396 2.417.1 5.403 2.91 5.403h18.11c2.81 0 4.306-2.986 2.91-5.403L16.908 5.093C16.203 3.03 14.22 1.5 12 1.5zm.01 13.5a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0V15a.75.75 0 01.75-.75zM12 8.25a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);

const ErrorScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = location.state || {};
  const [countdown, setCountdown] = useState(15);

  const errorMessage = message || 'An unknown error occurred.';

  // Auto-redirect to home
  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleContact = () => {
    alert(
      'Please contact staff for assistance.\nPhone: 1-800-VEND-HYDRA\nMachine ID: VH-1024'
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Header currentStep={1} />
      <main className="flex-1 flex flex-col items-center justify-center p-10 gap-6">
        <WarningIcon />
        <h1 className="text-5xl font-black text-red-500 drop-shadow-xl">
          Oops! Something Went Wrong
        </h1>
        <h2 className="text-3xl text-white/90 drop-shadow-lg -mt-2 text-center">
          {errorMessage}
        </h2>

        {/* Troubleshooting Card */}
        <div className="w-full max-w-lg bg-white/95 text-gray-800 p-8 rounded-2xl shadow-2xl mt-8">
          <h3 className="text-3xl font-bold text-black border-b border-gray-300 pb-3 mb-4 text-center">
            Troubleshooting
          </h3>
          <ul className="text-xl text-gray-700 space-y-3 list-disc list-inside">
            <li>Please wait a moment and try your order again.</li>
            <li>Check if your desired item is in stock.</li>
            <li>Verify that your payment was not deducted.</li>
            <li>If the problem persists, please contact staff.</li>
          </ul>
        </div>

        <div className="flex gap-6 mt-10">
          <Link
            to="/"
            className="px-12 py-5 bg-primary text-white text-3xl font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </Link>
          <button
            onClick={handleContact}
            className="px-12 py-5 bg-white text-gray-800 text-3xl font-bold rounded-full shadow-lg hover:bg-gray-200 transition-colors"
          >
            Contact Staff
          </button>
        </div>
        
        <p className="text-lg text-white/80 drop-shadow-md mt-6">
          Redirecting to home screen in {countdown} seconds...
        </p>

        <div className="absolute bottom-4 left-4 text-sm text-white/50">
          Machine ID: VH-1024 | Error Code: E-PAY-TIMEOUT
        </div>
      </main>
    </div>
  );
};

export default ErrorScreen;