import React from 'react';
import Login from './screens/Login';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './screens/components/ProtectedRoute';
import Home from './screens/Home';
import PageNotFound from './screens/components/PageNotFound';

const App = () => {

  return (
    <div className="App flex flex-col h-screen">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
