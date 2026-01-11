import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaShoppingCart,
  FaListUl,
  FaCreditCard,
  FaSmile,
} from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';

const Step = ({ number, label, icon: Icon, isActive, isCompleted }) => {
  const pillClasses = `
    step-item flex items-center gap-2 px-5 py-2 rounded-full
    shadow-md transition-all duration-300
    ${isActive
      ? 'bg-primary text-white scale-105 shadow-primary/40'
      : 'bg-black/20 text-white/80 hover:bg-black/30'
    }
  `;

  const circleClasses = `
    flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold
    ${isActive
      ? 'bg-white text-primary'
      : isCompleted
        ? 'bg-emerald-500 text-white'
        : 'bg-white/20 text-white'
    }
  `;

  return (
    <div className={pillClasses}>
      <span className={circleClasses}>{number}</span>

      {Icon && <Icon className="text-sm opacity-90" />}

      <span className="text-sm font-semibold tracking-wide">
        {label}
      </span>
    </div>
  );
};

const Header = ({ currentStep = 1 }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  const steps = [
    { label: 'Select', icon: FaListUl },
    { label: 'Cart', icon: FaShoppingCart },
    { label: 'Pay', icon: FaCreditCard },
    { label: 'Enjoy', icon: FaSmile },
  ];

  return (
    <header className="w-full p-6 flex justify-between items-center bg-black/10 shadow-lg backdrop-blur-sm z-50">
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          src="/logo.png"
          alt="Vending Logo"
          className="h-24 w-auto drop-shadow-lg object-contain"
        />
      </div>

      {/* Step Indicator Bar */}
      <nav className="flex items-center gap-3 bg-black/20 px-4 py-3 rounded-full shadow-inner">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            number={index + 1}
            label={step.label}
            icon={step.icon}
            isActive={currentStep === index + 1}
            isCompleted={currentStep > index + 1}
          />
        ))}
      </nav>

      {/* Cart Icon Button */}
      <button
        onClick={() => navigate('/cart')}
        className="relative w-14 h-14 rounded-full bg-white/10 border border-white/20
                   flex items-center justify-center shadow-lg hover:bg-white/20 transition-all"
      >
        <FaShoppingCart className="text-white text-2xl" />

        {itemCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs
                       w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md"
          >
            {itemCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
