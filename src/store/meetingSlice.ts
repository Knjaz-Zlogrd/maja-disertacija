import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Question = {
  id: string;
  question: string;
  type: string;
};

export type Meeting = {
  title: string;
  questions: Question[];
};

export type State = {
  meeting: Meeting | undefined;
}

const initialState: State = {
  meeting: undefined,
};

export const meetingSlice = createSlice({
  name: 'meetingSlice',
  initialState,
  reducers: {
    addMeeting: (state, action: PayloadAction<Meeting | undefined>) => {
      state.meeting = action.payload;
    },
  },
});

export const { addMeeting } = meetingSlice.actions;
