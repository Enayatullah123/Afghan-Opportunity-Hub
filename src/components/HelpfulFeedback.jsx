import React, { useEffect, useState } from 'react';

const HelpfulFeedback = ({ storageKey }) => {
  const [choice, setChoice] = useState('');

  useEffect(() => {
    try {
      const existing = localStorage.getItem(storageKey);
      if (existing) setChoice(existing);
    } catch (e) {
      // ignore
    }
  }, [storageKey]);

  const saveChoice = (value) => {
    setChoice(value);
    try {
      localStorage.setItem(storageKey, value);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-sm font-semibold text-gray-900 mb-3">Was this information helpful?</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => saveChoice('helpful')}
          className={`px-3 py-1.5 rounded-lg text-sm border ${choice === 'helpful' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
        >
          Helpful
        </button>
        <button
          type="button"
          onClick={() => saveChoice('not-helpful')}
          className={`px-3 py-1.5 rounded-lg text-sm border ${choice === 'not-helpful' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
        >
          Not Helpful
        </button>
      </div>
    </div>
  );
};

export default HelpfulFeedback;
