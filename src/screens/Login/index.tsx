import React, { useState } from 'react';
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from '../../auth';
import { addAuthToken, addUID, setError, setLoading } from '../../store/loginSlice';
import { useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

type LoginScreenProps = {
  onLogin: (email: string) => void;
}

const Login = ({onLogin}: LoginScreenProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);


  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const user = await loginWithEmailAndPassword(email, password);
  //     console.log('User logged in:', user);
  //     onLogin(email);
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const user = await loginWithEmailAndPassword(email, password);
      const token = await user.getIdToken();
      const uid = user.uid;

      dispatch(addUID(uid));
      dispatch(addAuthToken(token));
      dispatch(setLoading(false));
      onLogin(email);
      navigate('/home');
    } catch (error) {
      console.log('Unable to login.', error);
      dispatch(setError('Login failed. Please try again.'));
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await registerWithEmailAndPassword(email, password);
      console.log('User registered:', user);
      onLogin(email);

    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder='Type your username'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder='Type your password'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </div>
          <div className="text-center">
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;