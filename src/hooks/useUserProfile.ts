import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { User } from '../store/usersSlice';

const useUserProfile = (uid: string | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (uid) {
          const userDoc = await getDoc(doc(db, 'users', uid));
          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
          } else {
            setError("User data not found");
          }
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [uid]);

  return { user, loading, error };
};

export default useUserProfile;
