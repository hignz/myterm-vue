import { formatDistanceToNow, formatRelative, lightFormat } from 'date-fns';

export function format(date) {
  return lightFormat(new Date(date), 'dd-MM-yyyy');
}

export function formatToNow(date, suffix = false) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: suffix
  });
}

export function relative(date) {
  return formatRelative(new Date(date), Date.now());
}

export function isTimeWithinRange(time, range) {
  return (
    new Date(`01/01/1990 ${time}`).getTime() >=
      new Date(`01/01/1990 ${range.start}`).getTime() &&
    new Date(`01/01/1990 ${time}`).getTime() <
      new Date(`01/01/1990 ${range.end}`).getTime()
  );
}
