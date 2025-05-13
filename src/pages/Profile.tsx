
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Phone, User, Plus, CreditCard } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => navigate('/payment-method-edit')}
              >
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Payment Methods</p>
                    <p className="font-medium">Manage your payment methods</p>
                  </div>
                </div>
                <Plus className="h-5 w-5 text-primary" />
              </div>
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
