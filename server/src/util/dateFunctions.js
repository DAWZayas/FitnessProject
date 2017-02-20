export const startEndDaysWeek = (date) => {
  const curr = new Date(date.getTime());
  let day = curr.getDay();
  if (day === 0) { day = 7; }
  day--;
  const first = curr.getDate() - day;
  const firstday = new Date(curr.setDate(first));
  firstday.setHours(0);
  firstday.setMinutes(0);
  firstday.setSeconds(0);
  firstday.setMilliseconds(0);
  const lastday = new Date(curr.setDate(firstday.getDate() + 6));
  lastday.setHours(23);
  lastday.setMinutes(59);
  lastday.setSeconds(59);
  lastday.setMilliseconds(999);
  return [firstday, lastday];
};

export const startEndDaysMonth = (date) => {
  const curr = new Date(date.getTime());
  const firstday = new Date(curr.setDate(1));
  firstday.setHours(0);
  firstday.setMinutes(0);
  firstday.setSeconds(0);
  firstday.setMilliseconds(0);
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
  firstday.setHours(0);
  firstday.setMinutes(0);
  firstday.setSeconds(0);
  firstday.setMilliseconds(0);
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
  Number(seconds) + (Number(minutes) * 60) + (Number(hours) * 3600);

  export const toTimeObject = (seconds) => {
    const total = Math.abs(seconds);
    const newHours = Math.floor(total / 3600);
    let newMinutes = Math.floor((total % 3600) / 60);
    let newSeconds = total % 60;
    newMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
    newSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
    return {hours: newHours, minutes: newMinutes, seconds: newSeconds};
  };
