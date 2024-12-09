import React, { useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { addMeeting, Meeting } from '../../store/meetingSlice';
import { useAppDispatch } from '../../store';

// type MeetingFormProps = {
//   onSubmit: (data: Meeting) => void;
// }

const MeetingForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // Default question data for predefined options
  const predefinedOptions: Record<string, string[]> = {
    'Daily Standup': [
      'What did you do since last standup?',
      'What do you plan on achieving today?',
      'Do you have any blockers?',
      'Do you need anyone\'s help?',
    ],
    'Sprint Retrospective': [
      'What did you particularly like this sprint?',
      'What didn\'t you like this sprint?',
      'What could have been done better?',
    ],
  };

  // Initialize form with react-hook-form
  const { control, handleSubmit, register, reset, setValue, formState: {errors} } = useForm<Meeting>({
    defaultValues: {
      title: '',
      questions: [{ id: uuidv4(), question: '', type: 'text' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit: SubmitHandler<Meeting> = (data) => {
    console.log(data);
    dispatch(addMeeting(data));
  };

  const handleOptionChange = (option: string) => {
    // Set the title based on the selected option
    setValue('title', option);

    // Reset the questions based on the selected option
    const questions = predefinedOptions[option] || [];

    // Reset the form and append new questions
    reset({
      title: option,
      questions: questions.map((question) => ({
        id: uuidv4(),
        question,
        type: 'text',
      })),
    });

    setDropdownOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 mt-16 max-w-2xl mx-auto relative">
      <h1 className="text-2xl mb-4">Create a Survey</h1>

      <div className="mb-8 relative">
        <div className="relative">
          <input
            {...register('title', { required: 'Survey title is required.' })}
            className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
            placeholder="Enter survey title"
          />
          <span
            className={`text-red-500 text-sm mt-1 absolute -bottom-6 left-0 transition-opacity duration-200 ${
              errors.title ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ minHeight: '1.25rem' }}
          >
            {errors.title && errors.title.message}
          </span>

          <button
            type="button"
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>

          {/* Dropdown Options */}
          {dropdownOpen && (
            <div
              className="absolute z-10 w-full bg-white border rounded shadow-lg"
              style={{ top: 'calc(100% + 0.5rem)' }} // Position just below the input
            >
              <div
                onClick={() => handleOptionChange('Daily Standup')}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Daily Standup
              </div>
              <div
                onClick={() => handleOptionChange('Sprint Retrospective')}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Sprint Retrospective
              </div>
            </div>
          )}
        </div>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex items-center space-x-2">
          {/* Input and Error Message */}
          <div className="flex flex-col w-3/6">
            <input
              {...register(`questions.${index}.question`, { required: 'Question is required.' })}
              className={`w-full p-2 border rounded ${errors.questions?.[index]?.question ? 'border-red-500' : ''}`}
              placeholder={`Question ${index + 1}`}
              defaultValue={field.question}
            />
            <span
              className={`text-red-500 text-sm mt-1 transition-opacity duration-200 ${errors.questions?.[index]?.question ? 'opacity-100' : 'opacity-0'}`}
              style={{ minHeight: '1.25rem' }} // Reserve space for error
            >
              {errors.questions?.[index]?.question && errors.questions[index]?.question?.message}
            </span>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 hover:text-red-700 mb-6"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-4 flex items-center space-x-4">
        <button
          type="button"
          onClick={() => append({ id: uuidv4(), question: '', type: 'text' })}
          className="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MeetingForm;