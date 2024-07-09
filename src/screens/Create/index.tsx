import React, { useState, useRef, useEffect, ChangeEvent } from 'react';

const CreateMeeting: React.FC = () => {
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

  const renderCards = () => {
    if (selectedOption === 'Daily Standup') {
      return (
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-white rounded shadow">What did you do since last standup?</div>
          <div className="p-4 bg-white rounded shadow">What do you plan on achieving today?</div>
          <div className="p-4 bg-white rounded shadow">Do you have any blockers?</div>
          <div className="p-4 bg-white rounded shadow">Do you need anyone's help?</div>
        </div>
      );
    } else if (selectedOption === 'Sprint Retrospective') {
      return (
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-white rounded shadow">What did you particularly like this sprint?</div>
          <div className="p-4 bg-white rounded shadow">What didn't you like this sprint?</div>
          <div className="p-4 bg-white rounded shadow">What could have been done better?</div>
        </div>
      );
    }
    return null;
  };

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
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={toggleDropdown}
        >
          Select meeting type
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
      {renderCards()}
    </div>
  );
};

export default CreateMeeting;
