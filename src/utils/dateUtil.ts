import get from 'lodash/get';

export const getDateFromString = (dateString: string) => {
  const parts = dateString.split('-');
  return {
    year: get(parts, [0], ''),
    month: get(parts, [1], ''),
    day: get(parts, [2], ''),
  };
};

export const toHourMinuteCompact = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};
