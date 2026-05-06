import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import TransactionInfoCard from "../cards/TransactionInfoCard";

export default function ExpenseTransactions({ transactions, onSeeMore }) {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="bg-white mt-5 rounded-lg p-10 w-full">
      <div className="border-b border-b-seafoam flex justify-between pb-5">
        <h3 className="text-md font-semibold text-charcoal">Expenses</h3>
        {/* Conditionally render the See More button */}
        {hasTransactions && (
          <button className="btn-secondary" onClick={() => onSeeMore()}>
            See More <FaArrowRight />
          </button>
        )}
      </div>

      <div className="flex flex-col justify-center">
        {hasTransactions ? (
          transactions
            ?.slice(0, 5)
            .map((trans) => (
              <TransactionInfoCard
                key={trans._id}
                transaction={trans}
                hideDeleteBtn
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
