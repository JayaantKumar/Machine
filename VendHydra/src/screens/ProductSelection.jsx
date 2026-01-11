
import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx'; // Import Context

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Use hook
  const [scoops, setScoops] = useState(1);
  
  const totalPrice = product.price * scoops;

  const handleIncrement = (e) => { 
    e.stopPropagation(); 
    if (scoops < 3) setScoops(p => p + 1); 
  };

  const handleDecrement = (e) => { 
    e.stopPropagation(); 
    if (scoops > 1) setScoops(p => p - 1); 
  };

  const handleAdd = () => {
    addToCart(product, scoops, totalPrice);
    
    // Visual feedback logic (Change button text temporarily)
    const btn = document.getElementById(`btn-${product.id}`);
    if(btn) {
        const originalText = btn.innerText;
        btn.innerText = "Added!";
        btn.classList.add("bg-green-600");
        setTimeout(() => {
            btn.innerText = "Add to Cart";
            btn.classList.remove("bg-green-600");
        }, 1000);
    }
  };

  return (
    <div 
      className="product-card group relative flex flex-col justify-end overflow-hidden cursor-pointer"
      style={{ backgroundImage: `url('${product.image}')` }}
    >
      {/* Dark Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-3xl" />
      
      <div className="relative z-10 p-6 flex flex-col gap-3">
        <h3 className="text-4xl font-bold text-white drop-shadow-lg leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-2">
          {/* Price Display */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-300 font-medium uppercase">Total</span>
            <span className="text-3xl font-black text-primary drop-shadow-md">
              ₹{totalPrice}
            </span>
          </div>

          {/* Scoop Selector */}
          <div 
            className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={handleDecrement} 
              disabled={scoops === 1} 
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl transition-all ${scoops===1?'bg-white/10 text-gray-400 cursor-not-allowed':'bg-white text-black hover:bg-gray-200 active:scale-95'}`}
            >
              -
            </button>
            
            <div className="flex flex-col items-center w-8">
              <span className="text-xl font-bold text-white">{scoops}</span>
              <span className="text-[8px] uppercase text-white/80 font-bold tracking-wide">Scoop</span>
            </div>
            
            <button 
              onClick={handleIncrement} 
              disabled={scoops === 3} 
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl transition-all ${scoops===3?'bg-white/10 text-gray-400 cursor-not-allowed':'bg-primary text-white hover:bg-green-600 active:scale-95'}`}
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
            id={`btn-${product.id}`}
            onClick={(e) => { e.stopPropagation(); handleAdd(); }}
            className="mt-2 w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-all shadow-lg active:scale-95 border border-white/10"
        >
            Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductSelection = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header currentStep={1} />
      
      {/* FIX: Added 'pt-44' to push content below the large header */}
      <main className="flex-1 flex flex-col items-center justify-center pt-44 pb-10 overflow-hidden">
        
        <h1 className="text-6xl font-black text-white drop-shadow-xl text-center">
          Ethereal Flavor Journey
        </h1>
        <h2 className="text-2xl text-white/90 drop-shadow-lg mt-4 text-center max-w-3xl">
          Choose up to <span className="text-primary font-bold">3 scoops</span>. Add multiple drinks to cart.
        </h2>

        {/* Horizontal Scroll Container */}
        <div className="w-full max-w-[95vw] mt-8 flex-1 flex items-center">
          <div className="flex gap-8 p-8 carousel-container overflow-x-auto pb-12 snap-x w-full">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductSelection;