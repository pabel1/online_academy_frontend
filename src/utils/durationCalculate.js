import moment from "moment";

export const calculateDuration = (date) => {
  const duration = moment.duration(moment().diff(date));
  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  const durationArray = [];

  if (years > 0) durationArray.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) durationArray.push(`${months} month${months > 1 ? 's' : ''}`);
  if (days > 0) durationArray.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) durationArray.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) durationArray.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);

  return durationArray.length > 0 ? durationArray.join(', ') + ' ago' : 'Just now';
};