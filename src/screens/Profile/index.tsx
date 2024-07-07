import React, { useState } from 'react';
import { useAppSelector } from '../../store';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import useUserProfile from '../../hooks/useUserProfile';
import { User } from '../../store/usersSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const uid = useAppSelector((state) => state.loginSlice.uid);
  const { user, loading, error } = useUserProfile(uid);

  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleEditClick = () => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uid && editUser) {
      try {
        await updateDoc(doc(db, 'users', uid), {
          firstName: editUser.firstName,
          lastName: editUser.lastName,
          company: editUser.company,
          team: editUser.team,
        });
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } catch (err) {
        console.error("Failed to update profile", err);
        toast.error('Failed to update profile');
      }
    }
  };

  const handleChange = (field: keyof User, value: string) => {
    setEditUser((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-grow overflow-y-auto bg-blue-300 flex-col">
      <ToastContainer 
        position="top-center" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        style={{ zIndex: 9999 }}  // Ensure it appears above other elements
      />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {isEditing ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={editUser?.email ?? ''}
                  disabled
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editUser?.firstName ?? ''}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editUser?.lastName ?? ''}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Company"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editUser?.company ?? ''}
                  onChange={(e) => handleChange('company', e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="team">Team</label>
                <input
                  type="text"
                  id="team"
                  placeholder="Team"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editUser?.team ?? ''}
                  onChange={(e) => handleChange('team', e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-6 mx-4">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
                >
                  Submit Changes
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Profile</h2>
            <div className="mb-4">
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>First Name:</strong> {user.firstName || <span className="text-gray-400">Tell us your first name</span>}</p>
              <p className="text-gray-700"><strong>Last Name:</strong> {user.lastName || <span className="text-gray-400">Tell us your last name</span>}</p>
              <p className="text-gray-700"><strong>Company:</strong> {user.company || <span className="text-gray-400">Tell us the name of your company</span>}</p>
              <p className="text-gray-700"><strong>Team:</strong> {user.team || <span className="text-gray-400">Tell us the name of your team</span>}</p>
            </div>
            <div className="flex items-center justify-center mb-6">
              <button
                onClick={handleEditClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
