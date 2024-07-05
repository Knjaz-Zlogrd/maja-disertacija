import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Role, User } from './store/usersSlice';

export const registerWithEmailAndPassword = async (email: string, password: string, role: Role): Promise<FirebaseUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user information in Firestore
    const userData: User = {
      email,
      userRole: role,
      firstName: '',
      lastName: '',
      company: '',
      team: '',
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return user;
  } catch (error) {
    throw error;
  }
};

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const fetchUserRole = async (uid: string): Promise<Role | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      return userData.userRole;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};
