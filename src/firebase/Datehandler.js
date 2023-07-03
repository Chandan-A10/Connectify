import { format, isToday, isYesterday } from 'date-fns';
export const formatDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'dd/MM/yyyy');
    }
};