
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [nationalServiceId, setNationalServiceId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validateServiceId = async () => {
    setValidationError('');
    
    if (!nationalServiceId) {
      setValidationError('National Service ID is required');
      return;
    }

    // In a real app, you would validate this against a database
    // For now, we'll mock this by checking for certain IDs
    if (nationalServiceId !== 'NS12345' && nationalServiceId !== 'NS67890') {
      setValidationError('Invalid National Service ID');
      return;
    }
    
    // If valid, move to next step
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setValidationError('Password should be at least 6 characters');
      return;
    }

    try {
      await signup(nationalServiceId, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-6 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-jama-500 mb-2">Create Account</h1>
        <p className="text-gray-600">Get early access to your payments</p>
      </div>

      {step === 1 ? (
        <div className="space-y-6">
          <div>
            <label htmlFor="nationalServiceId" className="block text-sm font-medium text-gray-700 mb-1">
              National Service ID
            </label>
            <Input
              id="nationalServiceId"
              placeholder="e.g. NS12345"
              value={nationalServiceId}
              onChange={(e) => setNationalServiceId(e.target.value)}
              className="base-input"
              required
            />
          </div>

          {validationError && <div className="text-red-500 text-sm">{validationError}</div>}

          <Button
            onClick={validateServiceId}
            className="w-full bg-primary hover:bg-primary/90 transition-colors h-12 text-white font-medium rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify ID'}
          </Button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium">
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Try with demo IDs: NS12345 or NS67890</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Create Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="base-input"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="base-input"
              required
            />
          </div>

          {validationError && <div className="text-red-500 text-sm">{validationError}</div>}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1 h-12"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 transition-colors h-12 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
