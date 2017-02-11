export const startEndDaysWeek = (date) => {
  const curr = new Date(date.getTime());
  let day = curr.getDay();
  // console.log(day);
  if (day === 0) { day = 7; }
  day--;
  const first = curr.getDate() - day;
  // console.log(first);
  const firstday = new Date(curr.setDate(first));
  firstday.setUTCHours(0);
  firstday.setUTCMinutes(0);
  firstday.setUTCSeconds(0);
  firstday.setUTCMilliseconds(0);
  const lastday = new Date(curr.setDate(firstday.getDate() + 6));
  lastday.setUTCHours(23);
  lastday.setUTCMinutes(59);
  lastday.setUTCSeconds(59);
  lastday.setUTCMilliseconds(999);
  return [firstday, lastday];
};

export const startEndDaysMonth = (date) => {
  const curr = new Date(date.getTime());
  const firstday = new Date(curr.setDate(1));
  firstday.setUTCHours(0);
  firstday.setUTCMinutes(0);
  firstday.setUTCSeconds(0);
  firstday.setUTCMilliseconds(0);
  const monthDays = (new Date(curr.getFullYear(), curr.getMonth() + 1, 0)).getDate();
  const lastday = new Date(curr.getFullYear(), curr.getMonth(), monthDays, 23, 59, 59, 999);
  return [firstday, lastday];
};

export const startEndDaysYear = (date) => {
  const curr = new Date(date.getTime());
  // const curr = new Date();  // change to a parameter date **************
  // console.log(curr);
  const firstday = new Date(curr.setDate(1));
  firstday.setMonth(0);
  // console.log(firstday);
  firstday.setUTCHours(0);
  firstday.setUTCMinutes(0);
  firstday.setUTCSeconds(0);
  firstday.setUTCMilliseconds(0);
  const lastday = new Date(curr.getFullYear(), 11, 31, 23, 59, 59, 999);
  return [firstday, lastday];
};

export const isDateBetween = (date, start, end) =>
  date.valueOf() >= start.valueOf() && date.valueOf() <= end.valueOf();

export const transformTimeDuration = ({seconds, minutes, hours}) => {
  const total = seconds + (minutes * 60) + (hours * 3600);
  const newHours = Math.floor(total / 3600);
  let newMinutes = Math.floor((total % 3600) / 60);
  let newSeconds = total % 60;
  newMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
  newSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
  return {hours: newHours, minutes: newMinutes, seconds: newSeconds};
};

export const toSeconds = ({seconds, minutes, hours}) =>
  seconds + (minutes * 60) + (hours * 3600);
