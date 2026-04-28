const Income = require("../models/Income");
const User = require("../models/User");
const XLSX = require("xlsx");

const addIncome = async (req, res) => {
  const { icon, source, amount, date } = req.body;
  if (!source || !amount || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userId = req.userId;
  try {
    const data = new Income({
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
const getAllIncome = async (req, res) => {
  const userId = req.userId;
  try {
    const allIncome = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json({ allIncome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const downloadIncomeExcel = async (req, res) => {
  const userId = req.userId;
  try {
    const allIncome = await Income.find({ userId }).sort({ date: -1 });
    const formattedData = allIncome.map((item) => ({
      Date: item.date,
      Source: item.source,
      Income: item.amount,
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="income_details.xlsx"',
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
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
};
