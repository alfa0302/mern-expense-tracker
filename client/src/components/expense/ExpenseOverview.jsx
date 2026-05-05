import React from "react";
import CustomBarChart from "../charts/CustomBarChart";
import { IoMdAdd } from "react-icons/io";

export default function ExpenseOverview({ transactions, addExpense }) {
  return (
    <div className="bg-white mt-3 rounded-lg p-10 w-full">
      <div className="border-b border-b-seafoam flex justify-between items-center pb-5">
        <div className="flex flex-col">
          <h3 className="text-md font-semibold text-charcoal">
            Expense Overview
          </h3>
          <p className="pt-2 text-gray-500 text-sm">
            Track your spending over time and analyse your expense trends
          </p>
        </div>
        <button className="btn-secondary py-1" onClick={() => addExpense()}>
          <IoMdAdd /> Add Expense
        </button>
      </div>
      <div className="mt-10">
        <CustomBarChart transactions={transactions} type="expense" />
      </div>
    </div>
  );
}
