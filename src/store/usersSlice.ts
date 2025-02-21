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
    updateOwnUserProfileDepr: (state, action: PayloadAction<Partial<User>>) => {
      if (state.ownUser) {
        state.ownUser = { ...state.ownUser, ...action.payload };
      } else {
        state.ownUser = action.payload as User; // Initialize if ownUser is null
      }
    },
  },
});

export const filteredUsers = (
  allUsers: Record<string, User> | undefined,
  searchString: string,
  ownUser: User | null
) => {
  if (!ownUser || !allUsers) return [];
  return Object.values(allUsers).filter(
    (user) =>
      user.company === ownUser.company &&
      user.team === ownUser.team &&
      user.email !== ownUser.email &&
      (user.firstName + ' ' + user.lastName).toLowerCase().includes(searchString.toLowerCase())
  );
};


export const { addAllUsers, updateOwnUserProfileDepr } = usersSlice.actions;
