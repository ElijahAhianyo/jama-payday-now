
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePayment } from '../context/PaymentContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { payments } = usePayment();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const unpaidMonths = payments.filter(p => p.status === 'unpaid').length;
  const requestedMonths = payments.filter(p => p.status === 'requested').length;
  const totalUnpaid = payments
    .filter(p => p.status === 'unpaid' || p.status === 'requested')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header with greeting */}
      <div className="bg-primary/10 p-6 pt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-medium text-gray-500">{greeting}</h1>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
          </div>
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src={user?.photoUrl} alt={user?.name} />
            <AvatarFallback className="bg-primary/20 text-primary">
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        
        {/* Overview card */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-500">My Allowance</h3>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(currentTime, { addSuffix: true })}
              </span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">Total unpaid</span>
              <span className="text-xl font-bold">GH₵ {totalUnpaid.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>{unpaidMonths} month{unpaidMonths !== 1 ? 's' : ''} unpaid</span>
              <span>{requestedMonths} request{requestedMonths !== 1 ? 's' : ''} pending</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversational UI */}
      <div className="p-6 space-y-6">
        <h3 className="text-xl font-semibold mb-4">What would you like to do?</h3>
        
        <Link to="/profile">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer card-hover">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">View my profile</h4>
                <p className="text-sm text-gray-500">See your service details</p>
              </div>
              <ArrowRight className="text-primary" size={20} />
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/payments">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer card-hover">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">Request payment</h4>
                <p className="text-sm text-gray-500">Get paid for unpaid months</p>
              </div>
              <ArrowRight className="text-primary" size={20} />
            </CardContent>
          </Card>
        </Link>
        
        {unpaidMonths > 0 && (
          <div className="mt-8">
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
              asChild
            >
              <Link to="/payments">Request payment now</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
