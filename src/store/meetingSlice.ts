import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Question = {
  id: string;
  question: string;
  type: string;
};

export type MeetingType = {
  title: string;
  questions: Question[];
};

export type State = {
  meeting: MeetingType | undefined;
  selectedUserIds: string[];
}

const initialState: State = {
  meeting: undefined,
  selectedUserIds: [],
};

export const meetingSlice = createSlice({
  name: 'meetingSlice',
  initialState,
  reducers: {
    addMeeting: (state, action: PayloadAction<MeetingType | undefined>) => {
      state.meeting = action.payload;
    },
    addSelectedUsers: (state, action: PayloadAction<string[]>) => {
      state.selectedUserIds = action.payload;
    },
    resetSelectedUsers: (state) => {
      state.selectedUserIds = initialState.selectedUserIds;
    }
  },
});

export const { addMeeting, addSelectedUsers, resetSelectedUsers } = meetingSlice.actions;
