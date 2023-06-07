import { formatDate } from "./formaters";

enum UNITS {
  year = 24 * 60 * 60 * 1000 * 365,
  month = (24 * 60 * 60 * 1000 * 365) / 12,
  day = 24 * 60 * 60 * 1000,
  hour = 60 * 60 * 1000,
  minute = 60 * 1000,
  second = 1000,
}

const rtf = new Intl.RelativeTimeFormat("ja", { numeric: "auto" });

export const getRelativeTime = (
  previousDate: any,
  currentDate: any = new Date()
) => {
  const timezoneOffset = previousDate.getTimezoneOffset();
  const hoursDiff = Math.trunc(timezoneOffset / 60);
  const minuteDiff = timezoneOffset % 60;

  previousDate.setHours(previousDate.getHours() - hoursDiff);
  previousDate.setMinutes(previousDate.getMinutes() - minuteDiff);

  const elapsed = currentDate - previousDate;

  if (Math.abs(elapsed) > UNITS.hour) {
    return formatDate(previousDate);
  }

  if (Math.abs(elapsed) > UNITS.minute) {
    return rtf.format(-Math.round(elapsed / UNITS.minute), "minutes");
  } else {
    return rtf.format(-Math.round(elapsed / UNITS.second), "second");
  }
};
