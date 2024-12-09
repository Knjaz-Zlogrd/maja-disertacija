import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { signOut } from 'firebase/auth';
import { logout } from '../../store/loginSlice';
import { auth, db } from '../../firebaseConfig';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import About from '../About';
import CreateMeeting from '../Create';
import MyMeetings from '../Meetings';
import Profile from '../Profile';
import { collection, getDocs } from 'firebase/firestore';
import { addAllUsers } from '../../store/usersSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const ownEmail = useAppSelector((state) => state.loginSlice.ownEmail);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);

        const usersData: Record<string, any> = {};
        querySnapshot.forEach((doc) => {
          usersData[doc.id] = doc.data();
        });

        dispatch(addAllUsers(usersData));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div className="home-container">
      <Navigation />
      <Routes>
        <Route path="create-meeting" element={<CreateMeeting />} />
        <Route path="my-meetings" element={<MyMeetings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<About />} />
        <Route path="/" element={
          <div className="p-4 mt-16">
            <h1 className="text-2xl">Home</h1>
            <p>Welcome to the Home page, {ownEmail}!</p>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default Home;