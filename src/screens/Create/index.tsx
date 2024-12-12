import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import InviteUsersForm from './InviteUsersForm';
import MeetingForm from './MeetingForm';
import ScheduleForm from './ScheduleForm';

const CreateMeeting = () => {
  const dispatch = useAppDispatch();
  const meeting = useAppSelector((state) => state.meetingSlice.meeting);
  const selectedUserIds = useAppSelector((state) => state.meetingSlice.selectedUserIds);
  console.log(selectedUserIds, 'selkasdasd')

  return (
    meeting ? selectedUserIds.length !== 0 ? <ScheduleForm meeting={meeting} selectedUserIds={selectedUserIds} /> : <InviteUsersForm /> : <MeetingForm />
  );
}

export default CreateMeeting;
