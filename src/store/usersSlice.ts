import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const Roles = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export type User = {
  email: string;
  userRole: Role;
  firstName: string;
  lastName: string;
  company: string;
  team: string;
}

export type State = {
  allUsers: Record<string, User>;
};

const initialState: State = {
  allUsers: {},
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    addAllUsers: (state, action: PayloadAction<Record<string, User>>) => {
      state.allUsers = action.payload;
    },
  },
});

export const { addAllUsers } = usersSlice.actions;