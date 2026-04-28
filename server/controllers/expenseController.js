const Expense = require("../models/Income");
const User = require("../models/User");
const XLSX = require("xlsx");

const addExpense = async (req, res) => {
  const { icon, source, amount, date } = req.body;
  if (!source || !amount || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userId = req.userId;
  try {
    const data = new Expense({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    await data.save();
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getAllExpense = async (req, res) => {
  const userId = req.userId;
  try {
    const allExpense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json({ allExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const downloadExpenseExcel = async (req, res) => {
  const userId = req.userId;
  try {
    const allExpense = await Expense.find({ userId }).sort({ date: -1 });
    const formattedData = allExpense.map((item) => ({
      Date: item.date,
      Source: item.source,
      Expense: item.amount,
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expense");
    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="expense_details.xlsx"',
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    return res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
};
