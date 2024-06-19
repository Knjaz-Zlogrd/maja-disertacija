import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { signOut } from 'firebase/auth';
import { logout } from '../../store/loginSlice';
import { auth } from '../../firebaseConfig';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import About from '../About';
import CreateMeeting from '../Create';
import MyMeetings from '../Meetings';

const Home = () => {
  const ownEmail = useAppSelector((state) => state.loginSlice.ownEmail);

  return (
    <div className="home-container">
      <Navigation />
      <Routes>
        <Route path="create-meeting" element={<CreateMeeting />} />
        <Route path="my-meetings" element={<MyMeetings />} />
        <Route path="about" element={<About />} />
        <Route path="/" element={
          <div className="p-4">
            <h1 className="text-2xl">Home</h1>
            <p>Welcome to the Home page, {ownEmail}!</p>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default Home;