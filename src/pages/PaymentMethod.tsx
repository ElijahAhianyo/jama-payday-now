
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

type PaymentMethod = 'momo' | 'bank';

interface LocationState {
  payment?: {
    id: number;
    month: string;
    year: number;
    amount: number;
  }
}

const PaymentMethod: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('momo');
  
  // Get payment data from location state
  const { payment } = (location.state as LocationState) || {};
  
  if (!payment) {
    // Navigate back to payments if no payment data
    navigate('/payments');
    return null;
  }
  
  const serviceFee = payment.amount * 0.04; // 4% service fee
  const totalAmount = payment.amount;
  
  const handleSubmit = () => {
    navigate('/payment-processing', { 
      state: { 
        payment,
        paymentMethod: selectedMethod,
        serviceFee 
      } 
    });
  };
  
  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-primary p-6 text-white">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white mr-2 -ml-2" 
            onClick={() => navigate('/payments')}
          >
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Payment Method</h1>
            <p className="text-white/80">Choose how you want to receive your money</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-medium text-lg">
                {payment.month} {payment.year} Allowance
              </h2>
              <p className="text-gray-500 text-sm">
                Choose your preferred payment method
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">GH₵ {payment.amount.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">Amount</p>
            </div>
          </div>
        </div>
        
        <Card className="mb-5">
          <CardContent className="p-4">
            <RadioGroup value={selectedMethod} onValueChange={(v) => setSelectedMethod(v as PaymentMethod)} className="space-y-4 py-2">
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="momo" id="momo" />
                <Label htmlFor="momo" className="flex flex-1 justify-between cursor-pointer">
                  <div>
                    <p className="font-medium">Mobile Money</p>
                    <p className="text-sm text-gray-500">Receive funds instantly on your mobile wallet</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex flex-1 justify-between cursor-pointer">
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Receive funds in your bank account (1-2 business days)</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Amount</span>
            <span className="font-medium">GH₵ {payment.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Service fee (4%)</span>
            <span className="font-medium">GH₵ {serviceFee.toFixed(2)}</span>
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between">
            <span className="font-medium">You'll receive</span>
            <span className="font-bold">GH₵ {(totalAmount - serviceFee).toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          onClick={handleSubmit}
          className="w-full mt-6 bg-primary hover:bg-primary/90"
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
