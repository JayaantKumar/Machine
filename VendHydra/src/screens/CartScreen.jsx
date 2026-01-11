import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useCart } from '../context/CartContext.jsx';

const CartScreen = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, cartTotal } = useCart();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/payment');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header currentStep={2} />
      <main className="flex-1 flex flex-col items-center justify-start pt-44 pb-10 px-10 overflow-y-auto">
        <h1 className="text-5xl font-black text-white drop-shadow-xl mb-8">Your Order</h1>

        {cartItems.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-2xl text-white/80 mb-8">Your cart is empty.</p>
            <button onClick={() => navigate('/')} className="px-8 py-3 bg-white text-black font-bold rounded-full text-xl hover:bg-gray-200">
              Go Back to Menu
            </button>
          </div>
        ) : (
          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            {cartItems.map((item) => (
              <div key={item.cartId} className="flex items-center justify-between border-b border-white/10 py-4 last:border-0">
                <div className="flex items-center gap-6">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                    <p className="text-lg text-white/70">{item.scoops} x Scoops</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {/* Changed text-primary to text-white here */}
                  <span className="text-2xl font-bold text-white">₹{item.price}</span>
                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="w-10 h-10 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8 flex items-center justify-between border-t border-white/30 pt-6">
              <span className="text-3xl font-black text-white">Total</span>
              {/* Changed text-primary to text-white here */}
              <span className="text-4xl font-black text-white">₹{cartTotal}</span>
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={() => navigate('/')} className="flex-1 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 text-xl">
                Add More
              </button>
              <button onClick={handleCheckout} className="flex-[2] py-4 bg-primary text-white font-bold rounded-xl hover:bg-green-600 text-xl shadow-lg shadow-primary/30">
                Checkout & Pay
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartScreen;