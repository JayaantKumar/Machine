import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get('orderId');

  useEffect(() => {
    if (!orderId) return;

    axios.post(`${API_URL}/orders/${orderId}/confirm-payment`)
      .then(() => {
        navigate('/dispensing', { state: { orderId } });
      })
      .catch(() => {
        navigate('/error', { state: { message: 'Payment confirmation failed' } });
      });
  }, [orderId]);

  return (
    <div className="flex items-center justify-center h-screen text-2xl font-bold">
      Finalizing your order...
    </div>
  );
}
