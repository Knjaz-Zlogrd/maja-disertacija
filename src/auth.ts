import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Role, User } from './store/usersSlice';


import axios from "axios";
const BASE_URL = "http://localhost:5000";

// export default axios.create({
//   baseURL: BASE_URL,
// });

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  //send back out http only secure cookie with each request
  withCredentials: true,
});

export const loginWithEmailAndPassword = async (email: string, password: string) => {

  try {
    const response = await axiosPrivate.post<{email: string, password: string}, {data: {accessToken: string, userId: string}}>('/auth/login', 
      { email, password },
    );


    return response;
  } catch (error) {
    console.error(error);
  }

}

export const register = async (email: string, password: string, firstName: string, lastName: string, team: string, company: string,role: string) => {

  try {
    const response = await axiosPrivate.post('/auth/register', 
      {email, password , lastName, firstName, team, role, company}
    )

    if (response) {
      const res = await loginWithEmailAndPassword(email, password);

      return res;
    }

   return undefined
  } catch (error) {
    
  }
}

// export const registerWithEmailAndPassword = async (email: string, password: string, role: Role): Promise<FirebaseUser> => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Store user information in Firestore
//     const userData: User = {
//       email,
//       userRole: role,
//       firstName: '',
//       lastName: '',
//       company: '',
//       team: '',
//     };

//     await setDoc(doc(db, "users", user.uid), userData);

//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

// export const loginWithEmailAndPassword = async (email: string, password: string): Promise<FirebaseUser> => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     throw error;
//   }
// };

// export const fetchUserRole = async (uid: string): Promise<Role | null> => {
//   try {
//     const userDoc = await getDoc(doc(db, "users", uid));
//     if (userDoc.exists()) {
//       const userData = userDoc.data() as User;
//       return userData.userRole;
//     } else {
//       console.error("No such document!");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching user role:", error);
//     return null;
//   }
// };
