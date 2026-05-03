import React from "react";
import CustomBarChart from "../charts/CustomBarChart";
import { IoMdAdd } from "react-icons/io";

export default function IncomeOverview({ transactions, addIncome }) {
  return (
    <div className="bg-white mt-3 rounded-lg p-10 w-full">
      <div className="border-b border-b-seafoam flex justify-between items-center pb-5">
        <div className="flex flex-col">
          <h3 className="text-md font-semibold text-charcoal">
            Income Overview
          </h3>
          <p className="pt-2 text-gray-500 text-sm">
            Track your earnings overtime and analyse your income trends
          </p>
        </div>
        <button className="btn-secondary py-1" onClick={() => addIncome()}>
          <IoMdAdd /> Add Income
        </button>
      </div>
      <div className="mt-10">
        <CustomBarChart transactions={transactions} />
      </div>
    </div>
  );
}
