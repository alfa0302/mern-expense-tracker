import React from "react";
import CustomBarChart from "../charts/CustomBarChart";

export default function Last30DaysExpenses({ transactions }) {
  return (
    <div className="bg-white mt-5 rounded-lg p-10 w-full">
      <div className="border-b border-b-seafoam flex justify-between pb-5">
        <h3 className="text-md font-semibold text-charcoal">
          Last 30 Days Expense
        </h3>
      </div>
      <div>
        <CustomBarChart transactions={transactions} showTextAnchor />
      </div>
    </div>
  );
}
