export const formatTimeString = (timeUtc: string, date: string) => {
  const userLocale = navigator.language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timeHH, timeMM] = timeUtc.split(':').map(Number);

  const [year, month, day] = date.split('-').map(Number);

  const objDate = new Date(Date.UTC(year, month - 1, day, timeHH, timeMM));

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const localTime = objDate.toLocaleString(userLocale, timeOptions);
  return localTime;
};

export const formatTimeStringUTC = (timeUtc: string, date: string) => {
  const userLocale = navigator.language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const pureDate = date.split(' ')[0];
  const dateTimeString = `${pureDate}T${timeUtc}Z`;
  const utcDate = new Date(dateTimeString);

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  return utcDate.toLocaleString(userLocale, timeOptions);
};

export const formatTimeStringDate = (timeUtc: string, date: string | Date) => {
  const userLocale = navigator.language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let dateString: string;
  if (date instanceof Date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    dateString = `${year}-${month}-${day}`;
  } else {
    dateString = date;
  }

  const dateTimeString = `${dateString}T${timeUtc}Z`;
  const utcDate = new Date(dateTimeString);

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  return utcDate.toLocaleString(userLocale, timeOptions);
};
