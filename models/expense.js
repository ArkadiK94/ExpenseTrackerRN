export default class Expense {
  constructor(title, price, date, email) {
    this.title = title;
    this.price = price;
    this.date = new Date(date);
    this.email = email;
  }
}
