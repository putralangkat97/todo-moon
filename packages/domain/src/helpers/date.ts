import {format} from 'date-fns';

export const formatDate = (date: string | Date, dateFormat: string = 'PPP') => {
  return format(date, dateFormat);
};
