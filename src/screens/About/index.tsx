import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4 mt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">About This App</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          This app is designed to replace traditional scrum meetings with written surveys.
          It allows managers to create surveys with specific questions and schedule them
          to be filled out by team members at regular intervals. The goal is to improve
          efficiency by eliminating the need for in-person meetings and providing a more
          flexible way for team members to report their progress.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Features include:
        </p>
        <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mt-2">
          <li>Role-based access control for managers and team members</li>
          <li>Survey creation and scheduling</li>
          <li>Real-time updates and notifications</li>
          <li>User profile management</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

