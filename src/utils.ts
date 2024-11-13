const days = [
  "Vasárnap",
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
];
const months = [
  "Január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];

export const formatDate = (date: Date): string => {
  const day = days[date.getDay()];
  const month = months[date.getMonth()];

  return `${month} ${date.getDate()}. ${day}, ${date.getHours()}:${date.getMinutes()} ${date.getFullYear()}`;
};

export const wasHoursAgo = (exactNumber: number): Date => {
  const date = new Date();
  date.setHours(date.getHours() - exactNumber);
  return date;
};

export const wasDaysAgo = (exactNumber: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - exactNumber);
  return date;
};

export const wasMonthsAgo = (exactNumber: number): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() - exactNumber);
  return date;
};

export const wasYearsAgo = (exactNumber: number): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - exactNumber);
  return date;
};

export const afterHours = (exactNumber: number): Date => {
  const date = new Date();
  date.setHours(date.getHours() + exactNumber);
  return date;
};

export const afterDays = (exactNumber: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + exactNumber);
  return date;
};

export const afterMonths = (exactNumber: number): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() + exactNumber);
  return date;
};

export const afterYears = (exactNumber: number): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + exactNumber);
  return date;
};
