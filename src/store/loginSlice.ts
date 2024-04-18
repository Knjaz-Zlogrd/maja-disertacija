import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  authToken: string | null
  uid: string | null
}

const initialState: State = {
  authToken: null,
  uid: null,
};

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    addAuthToken: (state, action: PayloadAction<string | null>) => {
      state.authToken = action.payload;
    },
    removeAuthToken: (state) => {
      state.authToken = null;
    },
    addUID: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    }
  }
});

export const {
  addAuthToken,
  removeAuthToken,
  addUID,
} = loginSlice.actions;