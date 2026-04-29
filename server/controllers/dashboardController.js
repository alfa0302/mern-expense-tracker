const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;
    const userObjectId = new Types.ObjectId(String(userId));
    console.log("userId:", userId, "userObjId:", userObjectId);

    // fetch Income and Expense data
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log("Total income", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log("Total income", {
      totalExpense,
      userId: isValidObjectId(userId),
    });

    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, income) => sum + income.amount,
      0,
    );

    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    // Fetch last 5 transactions
    const incomeTxns = await Income.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);

    const expenseTxns = await Expense.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);

    const lastTransactions = [
      ...incomeTxns.map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),
      ...expenseTxns.map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // final respnse
    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getDashboardData };
