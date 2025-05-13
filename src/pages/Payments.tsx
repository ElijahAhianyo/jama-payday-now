
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../context/PaymentContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { toast } from '../hooks/use-toast';

const Payments: React.FC = () => {
  const navigate = useNavigate();
  const { payments, isLoading } = usePayment();

  // Filter to only show unpaid payments
  const unpaidPayments = payments.filter(p => p.status === 'unpaid');

  const handleRequestPayment = async (payment: any) => {
    navigate('/payment-method', { state: { payment } });
  };

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-primary p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">My Payments</h1>
        <p className="text-white/80">Request early payments</p>
      </div>
      <div className='p-2 mb-2'>

      <div className="mt-8 bg-primary/10 rounded-lg p-4">
          <h3 className="font-medium mb-2">How it works</h3>
          <p className="text-sm text-gray-600 mb-4">
            When you request an early payment, Jama will pay you within 24 hours. When the National Service Authority makes the payment, it will go directly to Jama.
          </p>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>No interest charged</li>
            <li>No hidden fees</li>
            <li>Get paid in 24 hours or less</li>
          </ul>
        </div>
      </div>
      {/* Payment List */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Unpaid Months</h2>
          <p className="text-gray-500 text-sm">
            Request early payments for months you haven't been paid yet
          </p>
        </div>
        
        <div className="space-y-4">
          {unpaidPayments.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              No unpaid months found
            </div>
          ) : (
            unpaidPayments.map((payment) => (
              <Card key={payment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">
                        {payment.month} {payment.year}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          Due: {format(new Date(payment.dueDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-4">
                        GH₵ {payment.amount.toFixed(2)}
                      </span>
                      <Button 
                        size="sm"
                        onClick={() => handleRequestPayment(payment)}
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Get Paid
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        
      </div>
    </div>
  );
};

export default Payments;
