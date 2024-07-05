import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
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