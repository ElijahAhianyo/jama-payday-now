
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Calendar } from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center h-16 px-6">
      <NavLink
        to="/dashboard"
        className={({isActive}) => `flex flex-col items-center ${isActive ? 'text-primary' : 'text-gray-500'}`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>
      
      <NavLink
        to="/payments"
        className={({isActive}) => `flex flex-col items-center ${isActive ? 'text-primary' : 'text-gray-500'}`}
      >
        <Calendar size={24} />
        <span className="text-xs mt-1">Payments</span>
      </NavLink>
      
      <NavLink
        to="/profile"
        className={({isActive}) => `flex flex-col items-center ${isActive ? 'text-primary' : 'text-gray-500'}`}
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </div>
  );
};

export default MobileBottomNav;
