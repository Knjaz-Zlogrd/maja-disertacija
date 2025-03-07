import { Role, User } from './store/api/userApi';


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
    throw error;
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
