import { useEffect, useState } from "react";

const ExpenseForm = ({ addExpense, editItem, updateExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setAmount(editItem.amount);
    } else {
      setTitle("");
      setAmount("");
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    if (editItem) {
      updateExpense(editItem._id, title, amount); 
    } else {
      addExpense(title, amount); 
    }

    setTitle("");
    setAmount("");
  };

  return (
    <div className="expense-form">
      <h4>{editItem ? "Edit" : "Add"} Transaction</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">{editItem ? "Edit" : "Add"} Transaction</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
