
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePayment } from '../context/PaymentContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { payments } = usePayment();
  
  const transaction = payments.find(p => p.id === Number(id));
  
  if (!transaction) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Transaction not found</p>
        <Button 
          className="mt-4"
          variant="outline"
          onClick={() => navigate('/transactions')}
        >
          Back to Transactions
        </Button>
      </div>
    );
  }
  
  const statusIcon = {
    paid: <CheckCircle className="text-green-500" />,
    unpaid: <XCircle className="text-red-500" />,
    pending: <Clock className="text-yellow-500" />,
    requested: <Clock className="text-blue-500" />
  };
  
  const statusText = {
    paid: 'Paid',
    unpaid: 'Unpaid',
    pending: 'Pending',
    requested: 'Processing'
  };
  
  const serviceFee = transaction.status === 'requested' || transaction.status === 'paid' 
    ? transaction.amount * 0.04 
    : 0;
  
  const netAmount = transaction.amount - serviceFee;

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
            <h1 className="text-2xl font-bold">Transaction Details</h1>
            <p className="text-white/80">{transaction.month} {transaction.year}</p>
          </div>
        </div>
      </div>
      
      {/* Status Card */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              {statusIcon[transaction.status]}
            </div>
            <h2 className="text-xl font-bold">{statusText[transaction.status]}</h2>
            <p className="text-gray-500">
              {transaction.status === 'requested' 
                ? 'Your payment is being processed' 
                : transaction.status === 'paid' 
                ? 'Payment completed' 
                : 'Not yet processed'}
            </p>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Amount</span>
              <span className="font-bold">GH₵ {transaction.amount.toFixed(2)}</span>
            </div>
            
            {(transaction.status === 'requested' || transaction.status === 'paid') && (
              <>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Service Fee (4%)</span>
                  <span>GH₵ {serviceFee.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-2">
                  <span className="font-medium">You received</span>
                  <span className="font-bold">GH₵ {netAmount.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Transaction Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold mb-4">Transaction Information</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span>#{transaction.id.toString().padStart(6, '0')}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Month</span>
              <span>{transaction.month} {transaction.year}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Due Date</span>
              <span>{format(new Date(transaction.dueDate), 'MMM d, yyyy')}</span>
            </div>
            
            {transaction.status === 'requested' && (
              <div className="flex justify-between">
                <span className="text-gray-500">Request Date</span>
                <span>{format(new Date(), 'MMM d, yyyy')}</span>
              </div>
            )}
            
            {transaction.status === 'paid' && (
              <div className="flex justify-between">
                <span className="text-gray-500">Paid Date</span>
                <span>{format(new Date(transaction.dueDate), 'MMM d, yyyy')}</span>
              </div>
            )}
            
            {(transaction.status === 'requested' || transaction.status === 'paid') && (
              <div className="border-t border-gray-200 pt-4 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span>Mobile Money</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
