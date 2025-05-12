
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login: React.FC = () => {
  const [nationalServiceId, setNationalServiceId] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(nationalServiceId, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-6 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-jama-500 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Log in to access your early payments</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="base-input"
            required
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 transition-colors h-12 text-white font-medium rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Try with demo accounts:</p>
        <p>ID: NS12345, Password: password123</p>
      </div>
    </div>
  );
};

export default Login;
