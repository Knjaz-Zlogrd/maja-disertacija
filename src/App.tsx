import React, { useState } from 'react';
import Login from './screens/Login';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './screens/components/ProtectedRoute';
import Home from './screens/Home';
import PageNotFound from './screens/components/PageNotFound';

export type User = {
  email: string | null;
  uid?: string | null;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string) => {
    setUser({email})
  };

  console.log(user, 'user');

  return (
    <div className="App">
      <Routes>
        <Route index element={<Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home/*" element={<ProtectedRoute><Home user={user} /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
