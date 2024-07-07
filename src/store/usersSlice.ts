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
  ownUser: User | null;
};

const initialState: State = {
  allUsers: {},
  ownUser: null,
};

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    addAllUsers: (state, action: PayloadAction<Record<string, User>>) => {
      state.allUsers = action.payload;
    },
    updateOwnUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.ownUser) {
        state.ownUser = { ...state.ownUser, ...action.payload };
      } else {
        state.ownUser = action.payload as User; // Initialize if ownUser is null
      }
    },
  },
});

export const { addAllUsers, updateOwnUserProfile } = usersSlice.actions;
