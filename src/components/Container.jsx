import { useState, useEffect } from "react";
import History from "./History";
import ExpenseForm from "./ExpenseForm";
import BalanceContainer from "../BalanceContainer";
import { toast } from "react-toastify";

const Container = () => {
  const [transactions, setTransactions] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // ✅ Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:3000/getExpenses");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ Add Expense
  const addExpense = async (title, amount) => {
    try {
      const res = await fetch("http://localhost:3000/addExpense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount: Number(amount) }),
      });

      if (res.ok) {
        toast.success("Transaction added Successfully");
        fetchExpenses();
      } else {
        toast.error("Error adding transaction");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Error adding transaction");
    }
  };

  // ✅ Delete Expense
  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/deleteExpense/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Transaction deleted Successfully");
        fetchExpenses();
      } else {
        toast.error("Error deleting transaction");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // ✅ Update Expense
  const updateExpense = async (id, title, amount) => {
    try {
      const res = await fetch(`http://localhost:3000/updateExpense/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount: Number(amount) }),
      });
      if (res.ok) {
        toast.success("Transaction updated Successfully");
        fetchExpenses();
        setEditItem(null); // reset after editing
      } else {
        toast.error("Error updating transaction");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  // ✅ Set item for editing
  const editExpense = (item) => {
    setEditItem(item);
  };

  return (
    <div className="container">
      <h2>Expense Tracker</h2>
      <BalanceContainer transactions={transactions} />
      <History
        transactions={transactions}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />
      <ExpenseForm
        addExpense={addExpense}
        editItem={editItem}
        updateExpense={updateExpense}
      />
    </div>
  );
};

export default Container;
