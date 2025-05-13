
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Phone, User, Plus, CreditCard, Banknote } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '../hooks/use-toast';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPaymentType, setSelectedPaymentType] = useState<'bank' | 'momo'>('momo');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [momoProvider, setMomoProvider] = useState('');
  const [momoNumber, setMomoNumber] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
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
    
    setDialogOpen(false);
  };

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-primary text-white p-6 pb-24 text-center">
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        <p className="text-white/80">Your National Service Information</p>
      </div>
      
      {/* Profile Card */}
      <div className="px-6 -mt-16">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 flex flex-col items-center">
            <Avatar className="h-24 w-24 border-4 border-white mb-4">
              <AvatarImage src={user?.photoUrl} alt={user?.name} />
              <AvatarFallback className="bg-primary/20 text-primary text-xl">
                {user?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-primary/80 mb-2">{user?.nationalServiceId}</p>
            <p className="text-gray-500">{user?.position}</p>
          </div>
          
          <CardContent className="p-0">
            <div className="border-t border-gray-100">
              <div className="p-4 flex items-center">
                <User className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Institution</p>
                  <p className="font-medium">{user?.institution}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100">
              <div className="p-4 flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{user?.district}, {user?.region}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100">
              <div className="p-4 flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Service Period</p>
                  <p className="font-medium">
                    {new Date(user?.startDate || '').toLocaleDateString()} - 
                    {new Date(user?.endDate || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100">
              <div className="p-4 flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{user?.contact}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Payment Methods</p>
                        <p className="font-medium">Manage your payment methods</p>
                      </div>
                    </div>
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <RadioGroup 
                      value={selectedPaymentType} 
                      onValueChange={(value: 'bank' | 'momo') => setSelectedPaymentType(value)}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex items-center cursor-pointer">
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Bank Account</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
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
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Logout Button */}
      <div className="p-6 mt-6">
        <Button 
          variant="outline"
          className="w-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
