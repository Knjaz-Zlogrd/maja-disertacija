import React from 'react';
import { useNavigate } from 'react-router-dom'; // Or your navigation library

const ScheduleForm = () => {

  return (
    <div className="p-4 mt-16 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Placeholder Screen</h1>
      <p className="mb-4">This is a placeholder screen.</p>
      <button
        onClick={() => console.log('go back!')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back
      </button>
    </div>
  );
};

export default ScheduleForm;
