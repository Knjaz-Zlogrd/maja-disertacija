import React from 'react';
import LoginScreen from './screens/Login';

function App() {
  const handleLogin = (email: string, password: string) => {
    // TO DO: Add Firebase login logic here
    console.log('Login attempt', { email, password });
  };

  return (
    <div className="App">
       <LoginScreen onLogin={handleLogin} />
    </div>
  );
}

export default App;
