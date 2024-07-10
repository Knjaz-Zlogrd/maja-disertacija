import react from 'react';

type QuestionCardsProps = {
  selectedOption: string;
}

const QuestionCards = ({selectedOption}: QuestionCardsProps) => {
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

export default QuestionCards;