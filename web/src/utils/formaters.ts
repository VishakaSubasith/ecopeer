const dateFormat = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const dateTimeFormat = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

const currencyFormat = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});

export const formatDate = (date: string | number | Date) => {
  return dateFormat.format(new Date(date));
};

export const formatLocaleDate = (date: string | number | Date) => {
  const localeString = new Date(date).toLocaleString();
  const newDate = new Date(localeString);
  return dateTimeFormat.format(newDate);
};

export const formatCurrency = (amount: number | bigint | undefined) => {
  if (amount) {
    return currencyFormat.format(amount);
  }
  return "Not availlable";
};
