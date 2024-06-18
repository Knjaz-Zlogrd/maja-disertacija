import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';

const PageNotFound = () => {
  const navigate = useNavigate();
  const authToken = useAppSelector((state) => state.loginSlice.authToken);

  const handleBackToHomeButton = () => {
    if (authToken) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button onClick={handleBackToHomeButton} className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
          {authToken ? 'Back to Home' : 'Back to login'}
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
