import React, { useState } from "react";
import { MeetingType } from "../../store/meetingSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetSelectedUsers } from "../../store/meetingSlice";
import { Meeting, Recurrence, RecurrenceType, useCreateMeetingMutation } from "../../store/api/meetingApi";
import { useGetOwnUserProfileQuery } from "../../store/api/userApi";

type RecurrenceFormProps = {
  meeting: MeetingType;
  selectedUserIds: string[];
}

const RecurrenceForm = ({ meeting, selectedUserIds }: RecurrenceFormProps) => {
  const [recurrence, setRecurrence] = useState<RecurrenceType>("none");
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [surveyStartTime, setSurveyStartTime] = useState<string>("");
  const [surveyEndTime, setSurveyEndTime] = useState<string>("");
  const [createMeeting, { isLoading, error }] = useCreateMeetingMutation();
  const ownEmail = useAppSelector((state) => state.loginSlice.ownEmail);
    const { data: ownUser } = useGetOwnUserProfileQuery(ownEmail ?? '', {
      skip: !ownEmail,
    });
  const dispatch = useAppDispatch();

  const toggleDay = (day: string) => {
    setDaysOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    // Construct the meeting data with recurrence details
    const meetingData: Meeting = {
      ...meeting, // title and questions from previous steps
      recurrence: {
        type: recurrence,
        daysOfWeek: recurrence === "weekly" ? daysOfWeek : [],
        startDate,         // Ensure this is in a format acceptable by your backend (e.g., ISO string)
        surveyStartTime,
        surveyEndTime,
      },
      invitedUsers: selectedUserIds, // array of emails
      meetingOwner: ownEmail ?? '',
    };

    try {
      const result = await createMeeting(meetingData).unwrap();
      console.log("Meeting scheduled successfully:", result);
      // Optionally, display a success message or redirect
    } catch (err) {
      console.error("Failed to schedule meeting:", err);
    }
  };

  const handleRecurrenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecurrence(e.target.value as RecurrenceType);
  };

  const handleGoBack = () => {
    dispatch(resetSelectedUsers());
  };

  return (
    <div className="flex mt-16 justify-center">
      <div className="p-4 bg-white shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Set Recurrence</h2>

        <label className="block text-sm font-medium mb-2">Recurrence Type</label>
        <select 
          className="w-full p-2 border rounded-md" 
          value={recurrence} 
          onChange={handleRecurrenceChange}
        >
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
        </select>

        {recurrence === "weekly" && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Select Days</label>
            <div className="flex gap-2 flex-wrap">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={daysOfWeek.includes(day)}
                    onChange={() => toggleDay(day)}
                    className="accent-blue-500"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input 
            type="date" 
            className="w-full p-2 border rounded-md" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Survey Start Time</label>
          <input 
            type="time" 
            className="w-full p-2 border rounded-md" 
            value={surveyStartTime} 
            onChange={(e) => setSurveyStartTime(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Survey End Time</label>
          <input 
            type="time" 
            className="w-full p-2 border rounded-md" 
            value={surveyEndTime} 
            onChange={(e) => setSurveyEndTime(e.target.value)}
          />
        </div>

        <div className="mt-6 flex gap-4">
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <button 
            onClick={handleGoBack} 
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Go Back
          </button>
        </div>


        {/* Display Selected Users */}
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Invited Users:</h3>
          {selectedUserIds.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedUserIds.map((id) => (
                <li key={id} className="text-sm text-gray-700">{id}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No users selected.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default RecurrenceForm;
