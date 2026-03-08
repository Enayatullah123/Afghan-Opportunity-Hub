import React, { useEffect, useMemo, useState } from 'react';

const checklistItems = [
  'Read all requirements carefully',
  'Prepare CV/Resume',
  'Prepare motivation letter',
  'Prepare supporting documents',
  'Submit before deadline',
];

const ApplicationChecklist = ({ storageKey }) => {
  const [checkedMap, setCheckedMap] = useState({});

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '{}');
      setCheckedMap(existing);
    } catch (e) {
      setCheckedMap({});
    }
  }, [storageKey]);

  const doneCount = useMemo(() => Object.values(checkedMap).filter(Boolean).length, [checkedMap]);

  const toggle = (item) => {
    setCheckedMap((previous) => {
      const next = { ...previous, [item]: !previous[item] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-900">Application Checklist</p>
        <span className="text-xs text-gray-600">{doneCount}/{checklistItems.length} done</span>
      </div>
      <div className="space-y-2">
        {checklistItems.map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={Boolean(checkedMap[item])}
              onChange={() => toggle(item)}
              className="rounded border-gray-300"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ApplicationChecklist;
