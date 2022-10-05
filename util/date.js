const getFormattedDate = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${date.getFullYear()}-${month}-${day}`;
};

const isNotBeforeXDays = (date, days) => {
  const msOfDays = days * 24 * 60 * 60 * 1000;
  const msTillToday = new Date() - new Date(date);
  return msTillToday < msOfDays && msTillToday > 0;
};

export { getFormattedDate, isNotBeforeXDays };
