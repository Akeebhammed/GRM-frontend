function getDayOfYear() {
  //get current date
  const now = new Date();

  //get the beginning of the year
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  //calculate the numbers of days between the current date and the start of thee year
  const diff = (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);

  const dayOfYear = Math.floor(diff) + 1;

  return dayOfYear.toString().padStart(3, "0");
}
export default ({ app }, inject) => {
  inject("dayOfYear", getDayOfYear);
};
