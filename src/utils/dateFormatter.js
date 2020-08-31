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
