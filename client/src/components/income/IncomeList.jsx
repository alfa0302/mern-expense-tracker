import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import TransactionInfoCard from "../cards/TransactionInfoCard";

export default function IncomeList({ transactions, onDelete, onDownload }) {
  const hasTransactions = transactions && transactions.length > 0;

  const modifiedTransaction = transactions?.map((item) => ({
    ...item,
    type: "income",
  }));

  return (
    <div className="bg-white mt-5 rounded-lg p-10 w-full">
      <div className="border-b border-b-seafoam flex justify-between pb-5">
        <h3 className="text-md font-semibold text-charcoal">Income</h3>
        {hasTransactions && (
          <button className="btn-secondary" onClick={onDownload}>
            Download <MdOutlineFileDownload className="text-lg" />
          </button>
        )}
      </div>

      <div
        className={
          hasTransactions
            ? "grid lg:grid-cols-2 grid-cols-1 gap-y-5 gap-x-10"
            : "flex flex-col justify-center"
        }
      >
        {hasTransactions ? (
          modifiedTransaction?.map((trans) => (
            <TransactionInfoCard
              key={trans._id}
              transaction={trans}
              hideDeleteBtn={false}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="flex justify-center items-center py-10">
            <p className="text-charcoal opacity-60">No data to display</p>
          </div>
        )}
      </div>
    </div>
  );
}
