
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Banknote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '../hooks/use-toast';

const PaymentMethodEdit: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPaymentType, setSelectedPaymentType] = useState<'bank' | 'momo'>('momo');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [momoProvider, setMomoProvider] = useState('');
  const [momoNumber, setMomoNumber] = useState('');
  
  const handleSavePaymentMethod = () => {
    if (selectedPaymentType === 'bank') {
      if (!bankName || !accountNumber || !branch) {
        toast({
          title: "Missing information",
          description: "Please fill all bank details",
          variant: "destructive"
        });
        return;
      }
    } else {
      if (!momoProvider || !momoNumber) {
        toast({
          title: "Missing information",
          description: "Please fill all mobile money details",
          variant: "destructive"
        });
        return;
      }
      
      if (momoNumber.length !== 10) {
        toast({
          title: "Invalid number",
          description: "Mobile money number must be 10 digits",
          variant: "destructive"
        });
        return;
      }
    }
    
    toast({
      title: "Payment method saved",
      description: "Your payment method has been saved successfully"
    });
    
    navigate('/profile');
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
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add Payment Method</h1>
            <p className="text-white/80">Enter your preferred payment details</p>
          </div>
        </div>
      </div>
      
      {/* Payment Method Form */}
      <div className="p-6">
        <RadioGroup 
          value={selectedPaymentType} 
          onValueChange={(value: 'bank' | 'momo') => setSelectedPaymentType(value)}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-3">
            <RadioGroupItem value="bank" id="bank" />
            <Label htmlFor="bank" className="flex items-center cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Bank Account</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-lg p-3">
            <RadioGroupItem value="momo" id="momo" />
            <Label htmlFor="momo" className="flex items-center cursor-pointer">
              <Banknote className="mr-2 h-4 w-4" />
              <span>Mobile Money</span>
            </Label>
          </div>
        </RadioGroup>
        
        {selectedPaymentType === 'bank' ? (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Select value={bankName} onValueChange={setBankName}>
                <SelectTrigger id="bank-name">
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gcb">Ghana Commercial Bank</SelectItem>
                  <SelectItem value="ecobank">Ecobank</SelectItem>
                  <SelectItem value="stanbic">Stanbic Bank</SelectItem>
                  <SelectItem value="absa">Absa Bank</SelectItem>
                  <SelectItem value="cal">CAL Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input 
                id="account-number" 
                placeholder="Enter account number" 
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input 
                id="branch" 
                placeholder="Enter branch name" 
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Mobile Money Provider</Label>
              <Select value={momoProvider} onValueChange={setMomoProvider}>
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                  <SelectItem value="telecel">Telecel Cash</SelectItem>
                  <SelectItem value="airteltigo">AirtelTigo Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="momo-number">Mobile Money Number</Label>
              <Input 
                id="momo-number" 
                placeholder="Enter mobile money number" 
                value={momoNumber}
                onChange={(e) => setMomoNumber(e.target.value)}
                maxLength={10}
                type="tel"
              />
            </div>
          </div>
        )}
        
        <Button 
          className="mt-6 w-full"
          onClick={handleSavePaymentMethod}
        >
          Save Payment Method
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodEdit;
