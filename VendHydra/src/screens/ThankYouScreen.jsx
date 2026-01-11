import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

// Green Checkmark Icon SVG
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[150px] h-[150px] text-primary"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const ThankYouScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};
  const [countdown, setCountdown] = useState(10);

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

  return (
    <div className="flex flex-col h-screen">
      <Header currentStep={4} />
      <main className="flex-1 flex flex-col items-center justify-center p-10 gap-6">
        <CheckIcon />
        <h1 className="text-6xl font-black drop-shadow-xl">
          Enjoy Your Shake!
        </h1>
        {product && (
          <h2 className="text-3xl text-white/90 drop-shadow-lg -mt-2">
            You ordered: <span className="font-bold">{product.name}</span>
          </h2>
        )}

        {/* Pro Tips Card */}
        <div className="w-full max-w-lg bg-white/95 text-gray-800 p-8 rounded-2xl shadow-2xl mt-8">
          <h3 className="text-3xl font-bold text-black border-b border-gray-300 pb-3 mb-4 text-center">
            Pro Tips
          </h3>
          <ul className="text-xl text-gray-700 space-y-3 list-disc list-inside">
            <li>Shake well for another 10-15 seconds.</li>
            <li>For best taste, consume within 30 minutes.</li>
            <li>Perfect for post-workout recovery.</li>
            <li>Remember to stay hydrated throughout the day!</li>
          </ul>
        </div>

        <Link
          to="/"
          className="mt-10 px-12 py-5 bg-primary text-white text-3xl font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          Order Another Shake
        </Link>
        <p className="text-lg text-white/80 drop-shadow-md mt-4">
          Redirecting to home screen in {countdown} seconds...
        </p>
      </main>
    </div>
  );
};

export default ThankYouScreen;