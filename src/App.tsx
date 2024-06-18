import React, { useState } from 'react';
import LoginScreen from './screens/Login';

type User = {
  email: string,
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    setUser({email})
  };

  return (
    <div className="App">
      {user ? (
        <div>Welcome, {user.email}!</div>
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
