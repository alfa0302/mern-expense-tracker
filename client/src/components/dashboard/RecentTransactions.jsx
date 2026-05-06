import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import TransactionInfoCard from "../cards/TransactionInfoCard";

export default function RecentTransactions({ onSeeMore, transactions }) {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="bg-white mt-5 rounded-lg p-10 w-full">
      <div className="border-b border-b-seafoam flex justify-between pb-5">
        <h3 className="text-md font-semibold text-charcoal">
          Recent Transactions
        </h3>
        {hasTransactions && (
          <button className="btn-secondary" onClick={() => onSeeMore()}>
            See More <FaArrowRight />
          </button>
        )}
      </div>
      <div className="flex flex-col h-full">
        {hasTransactions ? (
          transactions
            ?.slice(0, 5)
            .map((trans, index) => (
              <TransactionInfoCard
                key={trans._id}
                transaction={trans}
                hideDeleteBtn
              />
            ))
        ) : (
          <div className="flex justify-center items-center py-10 h-full">
            <p className="text-charcoal opacity-60">No data to display</p>
          </div>
        )}
      </div>
    </div>
  );
}
