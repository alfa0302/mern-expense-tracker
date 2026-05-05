import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import TransactionInfoCard from "../cards/TransactionInfoCard";

export default function ExpenseList({ transactions, onDelete, onDownload }) {
  const modifiedTransaction = transactions.map((item) => ({
    ...item,
    type: "expense",
  }));

  return (
    <div className="bg-white mt-5 rounded-lg p-10 w-full">
      <div className="border-b border-b-seafoam flex justify-between pb-5">
        <h3 className="text-md font-semibold text-charcoal">Expenses</h3>
        <button className="btn-secondary" onClick={onDownload}>
          Download <MdOutlineFileDownload className="text-lg" />
        </button>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-5 gap-x-10">
        {modifiedTransaction?.map((trans) => (
          <TransactionInfoCard
            key={trans._id}
            transaction={trans}
            hideDeleteBtn={false}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
