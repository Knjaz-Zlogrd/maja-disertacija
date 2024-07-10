import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import QuestionCards from './QuestionCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const CreateMeeting = () => {
  const [title, setTitle] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOptionSelect = (option: string) => {
    setTitle(option);
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 mt-16">
      <h1 className="text-2xl">Create a Meeting</h1>
      <div className="mt-4 relative flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter meeting title"
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded justify-between"
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon size="lg" icon={faChevronDown} />
        </button>
        {dropdownVisible && (
          <div ref={dropdownRef} className="absolute z-10 w-full mt-2 bg-white border rounded shadow top-full">
            <div
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionSelect('Daily Standup')}
            >
              Daily Standup
            </div>
            <div
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionSelect('Sprint Retrospective')}
            >
              Sprint Retrospective
            </div>
          </div>
        )}
      </div>
      <QuestionCards selectedOption={selectedOption}/>
    </div>
  );
};

export default CreateMeeting;
