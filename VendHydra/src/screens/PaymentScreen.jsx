import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import axios from "axios";
import { useCart } from "../context/CartContext.jsx";

// Safe access to API_URL
const API_URL =
  (import.meta && import.meta.env && import.meta.env.VITE_API_URL) ||
  "http://localhost:3000/api";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [orderId, setOrderId] = useState("");
  const [upiUrl, setUpiUrl] = useState("");
  const [paymentSessionId, setPaymentSessionId] = useState(""); // ✅ ADD
  const [timeLeft, setTimeLeft] = useState(300);

  // Create Order on Mount
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
      return;
    }

    const createOrder = async () => {
      try {
        const response = await axios.post(`${API_URL}/orders`, {
          items: cartItems,
          totalAmount: cartTotal,
          machineId: "vm_001",
        });
        if (response.data.orderId) {
          setOrderId(response.data.orderId);
          setPaymentSessionId(response.data.paymentSessionId); // ✅ ADD
        }
      } catch (err) {
        console.error("Order creation failed", err);
      }
    };

    createOrder();
  }, []);

  // Timer
  useEffect(() => {
    if (!orderId) return;
    if (timeLeft === 0) {
      navigate("/error", { state: { message: "Timeout" } });
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, orderId]);

  // ❌ DO NOT use unsupported backend endpoint
  // ✅ Instead, use Cashfree SDK to extract UPI intent URL
  useEffect(() => {
    if (!paymentSessionId) return;

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js";
    script.onload = () => {
      const cf = new window.Cashfree(paymentSessionId);
      cf.redirect();
    };
    document.body.appendChild(script);
  }, [paymentSessionId]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col h-screen">
      <Header currentStep={3} />
      <main className="flex-1 flex flex-col items-center justify-center pt-44 p-10 gap-8">
        <h1 className="text-5xl font-black drop-shadow-xl text-white">
          Scan to Pay
        </h1>

        <div className="flex gap-12 items-start">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-2xl">
              <span className="text-lg font-semibold text-gray-700">
                Redirecting to payment...
              </span>
            </div>
            <span className="text-4xl font-black text-primary drop-shadow-lg">
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="w-96 bg-white/95 text-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col gap-4">
            <h3 className="text-2xl font-bold border-b pb-3">Order Summary</h3>

            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="flex justify-between text-lg border-b border-gray-200 pb-1 last:border-0"
                >
                  <span className="truncate w-48 font-medium">
                    {item.name} ({item.scoops})
                  </span>
                  <span className="font-mono text-gray-600">₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xl pt-2 border-t-2 border-gray-300">
              <span className="font-bold">Total</span>
              <span className="font-black text-primary text-3xl">
                ₹{cartTotal}
              </span>
            </div>

            <div className="text-center bg-gray-100 p-2 rounded text-xs text-gray-500 font-mono">
              Order ID: {orderId || "..."}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/cart")}
          className="mt-4 px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 shadow-lg transition-all active:scale-95"
        >
          Back to Cart
        </button>
      </main>
    </div>
  );
};

export default PaymentScreen;
