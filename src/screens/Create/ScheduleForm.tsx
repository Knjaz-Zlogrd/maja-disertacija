import React from 'react';
import { Meeting, resetSelectedUsers } from '../../store/meetingSlice';
import { useAppDispatch } from '../../store';

type ScheduleFormProps = {
  meeting: Meeting;
  selectedUserIds: string[];
}

const ScheduleForm = (props: ScheduleFormProps) => {
  console.log(props.meeting);
  console.log(props.selectedUserIds);
  const dispatch = useAppDispatch();
  const handleBack = () => {
    dispatch(resetSelectedUsers());
  }

  return (
    <div className="p-4 mt-16">
      <p className="text-2xl mb-6">We've made it to the schedule form, YAY!</p>
      <p className='mb-2'>{props.meeting.title}</p>
      {props.selectedUserIds.map((id) => (
        <p key={id}>{id}</p>
      ))}
      <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleBack}>
        GO BACK!
      </button>
    </div>
  );
}

export default ScheduleForm;