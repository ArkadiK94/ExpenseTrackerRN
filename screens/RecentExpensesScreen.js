import ExpensesList from "../components/ExpensesList";

const data = [
  { id: 1, title: "Test", date: "2022-5-19", price: "19.99" },
  { id: 2, title: "Another Book", date: "2022-2-18", price: "18.59" },
  { id: 3, title: "Another Book", date: "2022-2-18", price: "18.59" },
  { id: 4, title: "Another Book", date: "2022-2-18", price: "18.59" },
  { id: 5, title: "Another Book", date: "2022-2-18", price: "18.59" },
  { id: 6, title: "Another Book", date: "2022-2-18", price: "18.59" },
  { id: 7, title: "Another Book", date: "2022-2-18", price: "18.59" },
];

const RecentExpensesScreen = () => {
  return <ExpensesList title="Last 7 Days" sum={18.59} data={data} />;
};

export default RecentExpensesScreen;
