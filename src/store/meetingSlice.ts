import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Question = {
  id: string;
  question: string;
  type: string;
};

type Meeting = {
  title: string;
  questions: Question[];
};

type MeetingState = {
  meetings: Meeting[];
}

const initialState: MeetingState = {
  meetings: [],
};

export const meetingSlice = createSlice({
  name: 'meetingSlice',
  initialState,
  reducers: {
    addMeeting: (state, action: PayloadAction<Meeting>) => {
      state.meetings.push(action.payload);
    },
  },
});

export const { addMeeting } = meetingSlice.actions;
