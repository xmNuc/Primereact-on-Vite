export const formatTimeString = (timeUtc: string) => {
  const userLocale = navigator.language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timeHH, timeMM] = timeUtc.split(':').map(Number);
  const objDate = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      timeHH,
      timeMM
    )
  );

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  const localTime = objDate.toLocaleString(userLocale, timeOptions);
  return localTime;
};
