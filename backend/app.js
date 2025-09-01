const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/expenseTracker")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ✅ Schema & Model
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

// ✅ Add Expense
app.post("/addExpense", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.json({ success: true, message: "Expense added", expense: newExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding expense" });
  }
});

// ✅ Get All Expenses
app.get("/getExpenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching expenses" });
  }
});

// ✅ Delete Expense
app.delete("/deleteExpense/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting expense" });
  }
});

// ✅ Update Expense
app.put("/updateExpense/:id", async (req, res) => {
  try {
    const { title, amount } = req.body;
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount },
      { new: true }
    );
    res.json({ success: true, message: "Expense updated", expense: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating expense" });
  }
});

app.listen(3000)