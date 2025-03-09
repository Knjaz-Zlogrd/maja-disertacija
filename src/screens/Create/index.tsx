import React from 'react';
import { useAppSelector } from '../../store';
import InviteUsersForm from './InviteUsersForm';
import MeetingForm from './MeetingForm';
import RecurrenceForm from './RecurrenceForm';

const CreateMeeting = () => {
  const meeting = useAppSelector((state) => state.meetingSlice.meeting);
  const selectedUserIds = useAppSelector((state) => state.meetingSlice.selectedUserIds);

  return (
    meeting ? 
      selectedUserIds.length !== 0 ? 
        <RecurrenceForm meeting={meeting} selectedUserIds={selectedUserIds} /> : 
      <InviteUsersForm /> : 
    <MeetingForm />
  );
}

export default CreateMeeting;
