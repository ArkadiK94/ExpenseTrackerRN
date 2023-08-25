export default class Expense {
  constructor(title, price, date, userEmail) {
    this.title = title;
    this.price = price;
    this.date = new Date(date);
    this.userEmail = userEmail;
  }
}
