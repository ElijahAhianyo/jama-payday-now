
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MobileBottomNav from './MobileBottomNav';

const Layout: React.FC = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <div className="app-container">
      <div className="flex-1">
        <Outlet />
      </div>
      
      {isLoggedIn && <MobileBottomNav />}
    </div>
  );
};

export default Layout;
