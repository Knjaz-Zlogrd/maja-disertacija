import React, { useState } from "react";
import { Meeting } from "../../store/meetingSlice";
import { useAppDispatch } from "../../store";
import { resetSelectedUsers } from "../../store/meetingSlice";

interface RecurrenceFormProps {
  meeting: Meeting;
  selectedUserIds: string[];
}

const RecurrenceForm = ({ meeting, selectedUserIds }: RecurrenceFormProps) => {
  const [recurrence, setRecurrence] = useState<string>("none");
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const dispatch = useAppDispatch();

  const toggleDay = (day: string) => {
    setDaysOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = () => {
    console.log("Meeting:", meeting);
    console.log("Selected Users:", selectedUserIds);
    console.log("Recurrence Settings:", {
      recurrence,
      daysOfWeek: recurrence === "weekly" ? daysOfWeek : [],
      startDate,
    });
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
          onChange={(e) => setRecurrence(e.target.value)}
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