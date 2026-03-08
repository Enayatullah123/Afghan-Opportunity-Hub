export function parseDeadline(deadlineValue) {
  if (!deadlineValue) return null;

  const parsed = new Date(deadlineValue);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const normalized = String(deadlineValue).replace(/(\d+)(st|nd|rd|th)/gi, '$1').trim();
  const fallback = new Date(normalized);
  if (!Number.isNaN(fallback.getTime())) return fallback;

  return null;
}

export function getDeadlineMeta(deadlineValue) {
  const date = parseDeadline(deadlineValue);
  if (!date) {
    return {
      hasDeadline: false,
      daysLeft: null,
      isUrgent: false,
      isExpired: false,
      label: 'No deadline',
    };
  }

  const now = new Date();
  const oneDayMs = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil((date.getTime() - now.getTime()) / oneDayMs);
  const isExpired = daysLeft < 0;
  const isUrgent = !isExpired && daysLeft < 5;

  let label = `${daysLeft} days left`;
  if (isExpired) label = 'Expired';
  if (daysLeft === 0) label = 'Last day';
  if (daysLeft === 1) label = '1 day left';

  return {
    hasDeadline: true,
    date,
    daysLeft,
    isUrgent,
    isExpired,
    label,
  };
}
