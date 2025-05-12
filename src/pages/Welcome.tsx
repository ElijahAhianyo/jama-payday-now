
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Hero Section */}
      <div className="bg-primary/10 flex-1 flex flex-col items-center justify-center text-center p-6">
        <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
            J
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-primary">Jama</span>
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-sm">
          Get early access to your National Service payments when you need them most
        </p>
        
        <div className="space-y-4 w-full max-w-sm">
          <Button asChild className="w-full h-12 bg-primary hover:bg-primary/90">
            <Link to="/login">Log In</Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full h-12">
            <Link to="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
      
      {/* Features */}
      <div className="bg-white p-6 space-y-6">
        <h2 className="text-xl font-bold text-center mb-6">How It Works</h2>
        
        <div className="flex items-start space-x-4">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
            1
          </div>
          <div>
            <h3 className="font-medium mb-1">Sign Up</h3>
            <p className="text-sm text-gray-600">Create an account with your National Service ID</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
            2
          </div>
          <div>
            <h3 className="font-medium mb-1">Request Payment</h3>
            <p className="text-sm text-gray-600">Select the months you want to get paid early</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">
            3
          </div>
          <div>
            <h3 className="font-medium mb-1">Get Paid</h3>
            <p className="text-sm text-gray-600">Receive your payment within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
