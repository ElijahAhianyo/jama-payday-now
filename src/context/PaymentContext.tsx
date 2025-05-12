
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { paymentMonths, PaymentMonth } from '../data/mockData';
import { toast } from '../hooks/use-toast';

interface PaymentContextType {
  payments: PaymentMonth[];
  isLoading: boolean;
  requestPayment: (paymentId: number) => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<PaymentMonth[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setPayments(paymentMonths[user.id] || []);
    }
  }, [user]);

  const requestPayment = async (paymentId: number) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Update the status of the payment in our local state
      const updatedPayments = payments.map(payment => 
        payment.id === paymentId ? { ...payment, status: 'requested' as const } : payment
      );
      
      setPayments(updatedPayments);
      
      // Show success toast
      toast({
        title: "Payment request submitted",
        description: "You will receive your payment within 24 hours.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to request payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ payments, isLoading, requestPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
