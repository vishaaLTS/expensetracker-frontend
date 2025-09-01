const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://vishaal:dbuservishaal@cluster0.p60wbum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
useNewUrlParser:true,
useUnifiedTopology:true

  })
  
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);

app.post("/addExpense", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.json({ success: true, message: "Expense added", expense: newExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding expense" });
  }
});


app.get("/getExpenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching expenses" });
  }
});


app.delete("/deleteExpense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.json({ success: true, message: "Expense deleted successfully", expense });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting expense", error: err.message });
  }
});


app.put("/updateExpense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      id,
      { title, amount },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.json({ success: true, message: "Expense updated successfully", expense });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating expense", error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
