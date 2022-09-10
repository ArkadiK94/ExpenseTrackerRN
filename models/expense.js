export default class Expense {
  constructor(id, title, price, date) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.date = new Date(date);
  }
}
