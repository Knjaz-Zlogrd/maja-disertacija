import React, { useState } from 'react';
import Login from './screens/Login';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './screens/components/ProtectedRoute';
import Home from './screens/Home';
import PageNotFound from './screens/components/PageNotFound';
import { useAppDispatch } from './store';
import { addOwnEmail } from './store/loginSlice';

const App = () => {
  const dispatch = useAppDispatch();

  const handleLogin = (email: string) => {
    dispatch(addOwnEmail(email));
  };

  return (
    <div className="App flex flex-col h-screen">
      <Routes>
        <Route index element={<Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home/*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
