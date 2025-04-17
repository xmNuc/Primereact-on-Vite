export const formatTimeString = (timeUtc: string, date: string) => {
  const userLocale = navigator.language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timeHH, timeMM, timeSS = '0'] = timeUtc.split(':').map(Number);

  const [year, month, day] = date.split('-').map(Number);

  const objDate = new Date(Date.UTC(year, month - 1, day, timeHH, timeMM, timeSS));

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const localTime = objDate.toLocaleString(userLocale, timeOptions);
  return localTime;
};
