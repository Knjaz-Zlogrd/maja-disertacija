import React from 'react';
import { User } from '../../App';
import { useAppDispatch } from '../../store';
import { signOut } from 'firebase/auth';
import { logout } from '../../store/loginSlice';
import { auth } from '../../firebaseConfig';

type HomeProps = {
  user: User | null;
}

const Home = (props: HomeProps) => {
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
      <div>Welcome, {props.user?.email}!</div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Home;