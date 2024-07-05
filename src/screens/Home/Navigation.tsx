import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatchValue } from './../../hooks/useRouteMatchValue';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/loginSlice';

const Navigation = () => {
  const location = useLocation();
  const currentRoute = useRouteMatchValue(location.pathname);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center space-x-4">
        <div className="flex space-x-4">
          <li className={currentRoute === 'create-meeting' ? 'text-white' : 'text-gray-400'}>
            <Link to="/home/create-meeting">Create a Meeting</Link>
          </li>
          <li className={currentRoute === 'my-meetings' ? 'text-white' : 'text-gray-400'}>
            <Link to="/home/my-meetings">My Meetings</Link>
          </li>
          <li className={currentRoute === 'profile' ? 'text-white' : 'text-gray-400'}>
            <Link to="/home/profile">Profile</Link>
          </li>
          <li className={currentRoute === 'about' ? 'text-white' : 'text-gray-400'}>
            <Link to="/home/about">About</Link>
          </li>
        </div>
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default Navigation;
