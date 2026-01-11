import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';

// Safe access to API_URL
const API_URL = (import.meta && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:3000/api';

const DispensingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const { orderId } = location.state || {};

  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('Initializing...');
  
  // Ref to prevent double-firing in React Strict Mode
  const hasDispensed = useRef(false);

  // 1. Clear Cart on Mount (Once dispensing starts, cart is empty)
  useEffect(() => {
    if(orderId) {
        clearCart();
    }
  }, [orderId]);

  // 2. Validation Redirect
  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  // 3. Trigger Dispense Command (Once)
  useEffect(() => {
    if (!orderId) return;
    
    if (hasDispensed.current) return;
    hasDispensed.current = true;

    const triggerDispense = async () => {
      try {
        await axios.post(`${API_URL}/orders/${orderId}/dispense`);
        setStepText('Sending command to machine...');
      } catch (err) {
        console.error('Failed to trigger dispense', err);
        // Ignore 400 errors (Race condition: Order already dispensing)
        if (err.response && err.response.status === 400) {
            console.warn("Dispense might have already started, ignoring 400 error.");
        } else {
            navigate('/error', { state: { message: 'Hardware command failed.' } });
        }
      }
    };

    triggerDispense();
  }, [orderId, navigate]);

  // 4. Poll for Status Updates
  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${API_URL}/orders/${orderId}/status`);
        const { status, progress, currentStep } = response.data;

        setProgress(progress);
        setStepText(currentStep);

        if (status === 'COMPLETED') {
          clearInterval(interval);
          console.log('Order completed!');
          // Wait 1 second before showing Thank You screen
          setTimeout(() => {
            navigate('/thank-you', { state: { orderId } });
          }, 1000);
        }
        
        if (status === 'FAILED') {
           clearInterval(interval);
           navigate('/error', { state: { message: 'Dispensing failed.' } });
        }

      } catch (err) {
        console.error('Failed to get order status', err);
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);

  }, [orderId, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <Header currentStep={3} />
      <main className="flex-1 flex flex-col items-center justify-center p-10 gap-10">
        <h1 className="text-5xl font-black drop-shadow-xl">
          Making Your Drinks
        </h1>
        
        {/* Spinning Loader */}
        <div className="spinner"></div>

        {/* Dynamic Step Text */}
        <h3 className="text-3xl text-white font-bold drop-shadow-lg h-10 text-center w-full animate-pulse">
          {stepText}
        </h3>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl bg-white/20 rounded-full h-8 overflow-hidden shadow-inner border border-white/10">
          <div
            className="bg-primary h-full transition-all duration-500 ease-linear shadow-[0_0_15px_rgba(34,197,94,0.6)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <span className="text-2xl font-bold drop-shadow-md -mt-4 text-white/80 font-mono">
          {progress}%
        </span>

        <div className="mt-8 bg-white/10 backdrop-blur-md text-white p-8 rounded-2xl shadow-2xl border border-white/20">
          <h4 className="text-2xl font-bold text-center">
            Please wait while the machine prepares your order.
          </h4>
        </div>
      </main>
    </div>
  );
};

export default DispensingScreen;