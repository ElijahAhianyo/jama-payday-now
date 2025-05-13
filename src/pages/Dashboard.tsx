
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
  
  // Calculate total unpaid amount
  const totalUnpaid = payments
    .filter(p => p.status === 'unpaid' || p.status === 'requested')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  // Calculate total ever requested amount
  const totalEverRequested = payments
    .filter(p => p.status === 'requested' || p.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  // Get earliest and latest unpaid months for period display
  const unpaidPayments = payments.filter(p => p.status === 'unpaid' || p.status === 'requested');
  const earliestMonth = unpaidPayments.length > 0 ? 
    unpaidPayments.reduce((earliest, current) => {
      const currentDate = new Date(current.dueDate);
      const earliestDate = new Date(earliest.dueDate);
      return currentDate < earliestDate ? current : earliest;
    }, unpaidPayments[0]) : null;
    
  const latestMonth = unpaidPayments.length > 0 ?
    unpaidPayments.reduce((latest, current) => {
      const currentDate = new Date(current.dueDate);
      const latestDate = new Date(latest.dueDate);
      return currentDate > latestDate ? current : latest;
    }, unpaidPayments[0]) : null;
  
  const periodText = earliestMonth && latestMonth ? 
    `${earliestMonth.month.substring(0, 3)}, ${earliestMonth.year} - ${latestMonth.month.substring(0, 3)}, ${latestMonth.year}` : 
    "No unpaid months";

  // Get recent transactions (limit to 5)
  const recentTransactions = [...payments]
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
    .slice(0, 5);

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
      </div>
      
      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Total Requested Section */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Requested</p>
            <h3 className="text-3xl font-bold">GH₵ {totalEverRequested.toFixed(2)}</h3>
          </div>
          <Button 
            className="bg-green-500 hover:bg-green-600"
            asChild
          >
            <Link to="/payments">Make a request</Link>
          </Button>
        </div>
        
        {/* Total Unpaid Card */}
        <Card className="bg-gray-100 border-0">
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold">Total unpaid</h3>
                <p className="text-gray-500 text-sm">{periodText}</p>
                <Link to="/payments" className="flex items-center text-primary mt-4">
                  View <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold">GH₵ {totalUnpaid.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Transaction History */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Transaction History</h3>
            <Link to="/transactions" className="text-primary text-sm">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="text-center p-8 text-gray-500">
                No transactions found
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <Link 
                  to={`/transaction/${transaction.id}`} 
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border-b"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">{transaction.month} {transaction.year}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.status === 'paid' ? 'Paid' : 
                         transaction.status === 'requested' ? 'Processing' : 'Unpaid'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">GH₵ {transaction.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(transaction.dueDate), { addSuffix: true })}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
