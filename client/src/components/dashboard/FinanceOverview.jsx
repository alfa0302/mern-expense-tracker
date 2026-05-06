import React from "react";
import CustomPieChart from "../charts/CustomPieChart";

export default function FinanceOverview({
  totalExpense,
  totalIncome,
  totalBalance,
}) {
  const balanceData = [
    { name: "Income", value: totalIncome, fill: "rgb(44, 105, 117)" },
    { name: "Expense", value: totalExpense, fill: "rgb(104, 178, 160)" },
    { name: "Balance", value: totalBalance, fill: "rgb(54, 69, 79)" },
  ];

  // Check if there is any data to actually visualize
  const hasData = totalIncome > 0 || totalExpense > 0 || totalBalance > 0;

  return (
    <div className="bg-white mt-5 rounded-lg p-10 w-full">
      <div className="border-b border-b-seafoam flex justify-between pb-5">
        <h3 className="text-md font-semibold text-charcoal">
          Finance Overview
        </h3>
      </div>
      <div className="flex flex-col justify-center h-full">
        {hasData ? (
          <CustomPieChart
            data={balanceData}
            showTextAnchor
            label={["Total Balance", totalBalance]}
          />
        ) : (
          <div className="flex justify-center items-center py-10 h-full">
            <p className="text-charcoal opacity-60">No data to display</p>
          </div>
        )}
      </div>
    </div>
  );
}
