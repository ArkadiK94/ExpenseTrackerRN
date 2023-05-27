export default class Expense {
  constructor(title, price, date) {
    this.title = title;
    this.price = price;
    this.date = new Date(date);
  }
}
