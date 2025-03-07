import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { addMeeting, addSelectedUsers } from '../../store/meetingSlice';
import { useGetOwnUserProfileQuery, useGetUsersByCompanyQuery } from '../../store/api/userApi';

const InviteUsersForm = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const dispatch = useAppDispatch();

  const meeting = useAppSelector((state) => state.meetingSlice.meeting);

  const ownEmail = useAppSelector((state) => state.loginSlice.ownEmail);
    const { data: ownUser } = useGetOwnUserProfileQuery(ownEmail ?? '', {
      skip: !ownEmail,
    });

  const { data: users, error, isLoading } = useGetUsersByCompanyQuery(
    ownUser?.company ? encodeURIComponent(ownUser.company) : "",
  );
    

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

    // Filter the users based on search term and exclude the ownUser
    const filteredUsers = users?.filter(
      (user) =>
        user.email !== ownUser?.email && 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleGoBack = () => {
    dispatch(addMeeting(undefined));
  };

  const handleUserClick = (userEmail: string) => {
    setSelectedUsers((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(userEmail)) {
        newSelected.delete(userEmail);
      } else {
        newSelected.add(userEmail);
      }
      return newSelected;
    });
  };

  const handleNext = () => {
    // const selectedUserIds = Object.keys(allUsers).filter((userId) =>
    //   selectedUsers.has(allUsers[userId].email)
    // );
    if (!users) return;

    const selectedUserIds = users
      .filter((user) => selectedUsers.has(user.email))
      .map((user) => user.email);
  
    dispatch(addSelectedUsers(selectedUserIds));
  };
  
  console.log('bbb');
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
        <h2 className="text-lg font-semibold mb-2">Users to Invite</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name"
            className="w-full p-2 border rounded mr-2"
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        {/* <ul>
          {users.map((user, index) => (
            <li
              key={index}
              onClick={() => handleUserClick(user.email)}
              style={{userSelect: 'none'}}
              className={`mb-2 p-2 border rounded cursor-pointer ${
                selectedUsers.has(user.email) ? 'bg-green-100' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span>
                  {user.firstName} {user.lastName}
                </span>
                {selectedUsers.has(user.email) && (
                  <span className="font-bold">✔</span>
                )}
              </div>
            </li>
          ))}
        </ul> */}
        <div className="max-h-120 overflow-y-auto border rounded p-2">
          {filteredUsers && filteredUsers.length > 0 ? (
            <ul>
              {filteredUsers.map((user, index) => (
                <li
                  key={index}
                  onClick={() => handleUserClick(user.email)}
                  style={{ userSelect: "none" }}
                  className={`mb-2 p-2 border rounded cursor-pointer ${
                    selectedUsers.has(user.email) ? "bg-green-100" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    {selectedUsers.has(user.email) && (
                      <span className="font-bold">✔</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteUsersForm;
