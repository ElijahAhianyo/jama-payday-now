
import React, { createContext, useContext, useState, useEffect } from 'react';
import { users, User } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (nationalServiceId: string, password: string) => Promise<void>;
  signup: (nationalServiceId: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('jama_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error('Failed to parse stored user', err);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (nationalServiceId: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Check if user exists in our mock data
      const user = users[nationalServiceId];
      
      if (!user) {
        throw new Error('Invalid National Service ID or password');
      }
      
      // In a real app, you'd validate the password against a hash
      // Here we just check if the password is longer than 5 chars as a mock validation
      if (password.length < 6) {
        throw new Error('Invalid National Service ID or password');
      }
      
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('jama_user', JSON.stringify(user));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (nationalServiceId: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Check if the ID exists in our mock data
      const user = users[nationalServiceId];
      
      if (!user) {
        throw new Error('Invalid National Service ID');
      }
      
      // In a real app, you would hash the password and store the user in a database
      // Here we just validate the password length as a mock validation
      if (password.length < 6) {
        throw new Error('Password should be at least 6 characters');
      }
      
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('jama_user', JSON.stringify(user));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('jama_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
