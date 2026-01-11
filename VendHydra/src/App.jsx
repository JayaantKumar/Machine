import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductSelection from "./screens/ProductSelection.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import DispensingScreen from "./screens/DispensingScreen.jsx";
import ThankYouScreen from "./screens/ThankYouScreen.jsx";
import ErrorScreen from "./screens/ErrorScreen.jsx";
import AdminScreen from "./screens/AdminScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx"; // New Cart Screen
import Screensaver from "./components/Screensaver.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import useIdleTimer from "./hooks/useIdleTimer"; // Extension removed for safety
import { CartProvider } from "./context/CartContext.jsx"; // Context Provider
import PaymentSuccess from "./screens/PaymentSuccess.jsx";

const App = () => {
  // 1. Activate Idle Timer (e.g., 60 seconds)
  const isIdle = useIdleTimer(60000);

  // State to track if the boot animation has finished
  const [hasBooted, setHasBooted] = useState(false);

  return (
    <CartProvider>
      <div className="w-full h-full gradient-bg relative">
        {/* 1. Show Splash Screen ONLY if not booted yet */}
        {!hasBooted && <SplashScreen onFinish={() => setHasBooted(true)} />}

        {/* 2. Screensaver (Only active if booted AND idle) */}
        <Screensaver isActive={isIdle && hasBooted} />

        {/* Main App Routes */}
        <Routes>
          <Route path="/" element={<ProductSelection />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/dispensing" element={<DispensingScreen />} />
          <Route path="/thank-you" element={<ThankYouScreen />} />
          <Route path="/error" element={<ErrorScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;
