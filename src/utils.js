const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function capitalizeFirstLetter(string) {
  if (typeof string !== "string") return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDateString(string) {
  if (typeof string !== "string") return string;
  const date = new Date(string);
  return `${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
}
