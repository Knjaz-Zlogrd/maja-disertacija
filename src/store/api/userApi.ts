import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../usersSlice";

type HttpResponse = {
  message: string,
  data: Record<string, unknown>
};

type HttpResponseUser = {
  message: string,
  user: User,
};

type HttpResponseUsers = {
  message: string;
  users: User[];
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000", }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getOwnUserProfile: builder.query<User, string>({
      query: (email) => `user/get-user?email=${email}`,
      transformResponse: (response: HttpResponseUser) => {
        console.log("API response:", response); // Log the API response to verify its structure
        return response.user;
      },
      providesTags: ["User"], // Helps auto-update when data changes
    }),
    updateOwnUserProfile: builder.mutation<HttpResponse, { email: string; propsToUpdate: Partial<User> }>({
      query: ({email, propsToUpdate}) => ({
        url: "/user/update-user",
        method: "PUT",
        body: {email, propsToUpdate},
      }),
      invalidatesTags: ["User"], // Triggers a refetch of `getOwnUserProfile`
    }),
    getUsersByCompany: builder.query<User[], string>({
      query: (company) => `/user/get-users?company=${company}`,
      transformResponse: (response: HttpResponseUsers) => {
        console.log("API response:", response);
        return response.users; // Extract `users` from the response
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetOwnUserProfileQuery, useUpdateOwnUserProfileMutation, useGetUsersByCompanyQuery } = userApi;
