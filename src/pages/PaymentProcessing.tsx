
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface LocationState {
  payment?: {
    id: number;
    month: string;
    year: number;
    amount: number;
  },
  paymentMethod?: 'momo' | 'bank',
  serviceFee?: number
}

const PaymentProcessing: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { payment, paymentMethod } = (location.state as LocationState) || {};
  
  useEffect(() => {
    // If no payment data is present, navigate back to payments
    if (!payment || !paymentMethod) {
      navigate('/payments');
    }
  }, [payment, paymentMethod, navigate]);

  // Return early if no payment data
  if (!payment || !paymentMethod) {
    return null;
  }
  
  return (
    <div className="min-h-[80vh] flex flex-col p-6 animate-fade-in">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="bg-primary/10 rounded-full p-6 mb-6">
          <CheckCircle size={64} className="text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Payment Request Submitted</h1>
        <p className="text-gray-600 mb-8">
          Your payment for {payment.month} {payment.year} is being processed. You'll receive 
          GH₵ {(payment.amount - (location.state as LocationState).serviceFee!).toFixed(2)} via {paymentMethod === 'momo' ? 'Mobile Money' : 'Bank Transfer'}.
        </p>
        
        <p className="bg-primary/10 p-4 rounded-lg text-sm text-gray-700 mb-8">
          Payment will be processed within 24 hours. You'll receive a notification once the money has been sent.
        </p>
        
        <div className="flex flex-col w-full space-y-3">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-primary hover:bg-primary/90 w-full"
          >
            Go to Dashboard
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/payments')}
            className="w-full"
          >
            View Payments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
