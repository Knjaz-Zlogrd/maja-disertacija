import React, { useState } from 'react';
import { loginWithEmailAndPassword, register } from '../../auth';
import { addAuthToken, addOwnEmail, addUID, setError, setLoading } from '../../store/loginSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';
import { Role, Roles } from '../../store/api/userApi';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [team, setTeam] = useState('');
  const [role, setRole] = useState<Role>(Roles.USER);

  const error = useAppSelector((state) => state.loginSlice.error);
  const loading = useAppSelector((state) => state.loginSlice.loading);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await loginWithEmailAndPassword(
        email, 
        password
      );
      
      dispatch(addUID(response?.data.userId ?? null));
      dispatch(addAuthToken(response?.data.accessToken ?? null));
      dispatch(setLoading(false));
      dispatch(addOwnEmail(email));
      navigate('/home');

    } catch (error) {
      console.log('Unable to login.', error);
      dispatch(setError('Login failed. Please try again.'));
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await register(
        email, 
        password, 
        firstName, 
        lastName, 
        team, 
        company, 
        role
      );

      dispatch(addUID(response?.data.userId ?? null));
      dispatch(addAuthToken(response?.data.accessToken ?? null));
      dispatch(setLoading(false));
      dispatch(addOwnEmail(email));
      navigate('/home');

      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error registering:', error);
      dispatch(setError('Registration failed. Please try again.'));
      dispatch(setLoading(false));
    }
  };

  const handleIsRegistering = () => {
    setIsRegistering(!isRegistering);
    dispatch(setLoading(false));
    dispatch(setError(''));
    setEmail('')
    setPassword('');
  }

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
              placeholder="Type your username"
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
              placeholder="Type your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isRegistering && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="team">
                  Team
                </label>
                <input
                  type="text"
                  id="team"
                  placeholder="Enter your team"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  placeholder="Enter your company"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  required
                >
                  <option value={Roles.USER}>User</option>
                  <option value={Roles.ADMIN}>Admin</option>
                </select>
              </div>
            </>
          )}
          {loading && <div className="text-center text-blue-500 mb-4">Loading...</div>}
          {error && !loading && <div className="text-center text-red-500 mb-4">{error}</div>}
          <div className="flex items-center justify-center mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
              // disabled={loading}
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </div>
          <div className="text-center">
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={handleIsRegistering}
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
