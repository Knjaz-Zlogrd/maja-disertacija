import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addMeeting } from '../../store/meetingSlice';
import { filteredUsers } from '../../store/usersSlice';

const InviteUsersForm = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useAppDispatch();

  const allUsers = useAppSelector((state) => state.usersSlice.allUsers);
  const ownUser = useAppSelector((state) => state.usersSlice.ownUser);
  const meeting = useAppSelector((state) => state.meetingSlice.meeting);

  // Get filtered users
  const usersToShow = filteredUsers(allUsers, searchTerm, ownUser);

  const handleGoBack = () => {
    dispatch(addMeeting(undefined));
  };

  return (
    <div className="p-4 mt-16 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Meeting Summary</h1>
        <button
          onClick={handleGoBack}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back
        </button>
      </div>

      {meeting ? (
        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">Meeting Title:</p>
          <p className="text-md mb-4">{meeting.title}</p>

          <p className="text-lg font-semibold mb-2">Questions:</p>
          <ul className="list-disc ml-6 mb-4">
            {meeting.questions.map((q, index) => (
              <li key={q.id} className="text-md mb-2">
                Question {index + 1}: {q.question}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-md text-gray-500">No meeting data available.</p>
      )}

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name"
          className="w-full p-2 border rounded mb-4"
        />
        <ul className="list-disc ml-6">
          {usersToShow.map((user, index) => (
            <li key={index} className="mb-2">
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InviteUsersForm;
