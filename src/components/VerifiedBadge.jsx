import React from 'react';
import { BadgeCheck, ShieldAlert, Clock3 } from 'lucide-react';

const statusStyles = {
  verified: {
    label: 'Verified',
    className: 'bg-green-100 text-green-700 border-green-200',
    Icon: BadgeCheck,
  },
  pending: {
    label: 'Pending Review',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Icon: Clock3,
  },
  unverified: {
    label: 'Unverified',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
    Icon: ShieldAlert,
  },
};

const normalizeStatus = (value) => {
  if (!value) return 'unverified';
  const key = String(value).toLowerCase();
  if (key === 'verified') return 'verified';
  if (key === 'pending') return 'pending';
  return 'unverified';
};

const VerifiedBadge = ({ status, className = '' }) => {
  const normalized = normalizeStatus(status);
  const config = statusStyles[normalized];
  const Icon = config.Icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.className} ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

export default VerifiedBadge;
