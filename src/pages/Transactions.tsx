
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../context/PaymentContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const Transactions: React.FC = () => {
  const navigate = useNavigate();
  const { payments } = usePayment();
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...payments].sort(
    (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'requested':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <h1 className="text-2xl font-bold">Transaction History</h1>
            <p className="text-white/80">All your transactions</p>
          </div>
        </div>
      </div>
      
      {/* Transaction List */}
      <div className="p-6">
        {sortedTransactions.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No transaction records found
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="bg-white rounded-lg shadow p-4"
                onClick={() => navigate(`/transaction/${transaction.id}`)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{transaction.month} {transaction.year}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(transaction.status)}`}>
                      {transaction.status === 'requested' ? 'Processing' : transaction.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Due: {format(new Date(transaction.dueDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">GH₵ {transaction.amount.toFixed(2)}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary p-0 h-auto"
                    >
                      View details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
