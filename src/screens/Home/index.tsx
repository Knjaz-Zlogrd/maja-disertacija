import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { signOut } from 'firebase/auth';
import { logout } from '../../store/loginSlice';
import { auth } from '../../firebaseConfig';


const Home = () => {
  const ownEmail = useAppSelector((state) => state.loginSlice.ownEmail);
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
    <div>
      <div>Welcome, {ownEmail}!</div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Home;