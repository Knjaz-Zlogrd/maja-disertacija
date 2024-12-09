import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import InviteUsersForm from './InviteUsersForm';
import MeetingForm from './MeetingForm';

const CreateMeeting = () => {
  const dispatch = useAppDispatch();
  const meeting = useAppSelector((state) => state.meetingSlice.meeting);

  return (
    meeting ? <InviteUsersForm /> : <MeetingForm />
  );
}

export default CreateMeeting;
