import React from 'react';
import { Clock3 } from 'lucide-react';
import { getDeadlineMeta } from '../lib/deadline.js';

const DeadlineBadge = ({ deadline }) => {
  const meta = getDeadlineMeta(deadline);

  if (!meta.hasDeadline) return null;

  const colorClass = meta.isExpired
    ? 'bg-red-100 text-red-700'
    : meta.isUrgent
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-green-100 text-green-700';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      <Clock3 className="w-3.5 h-3.5" />
      {meta.label}
    </span>
  );
};

export default DeadlineBadge;
