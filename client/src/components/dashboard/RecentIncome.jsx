import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import TransactionInfoCard from "../cards/TransactionInfoCard";

export default function RecentIncome({ transactions, onSeeMore }) {
  return (
    <div className="bg-white mt-5 rounded-lg p-10 w-full">
      <div className="border-b border-b-seafoam flex justify-between pb-5">
        <h3 className="text-md font-semibold text-charcoal">Income</h3>
        <button className="btn-secondary" onClick={() => onSeeMore()}>
          See More <FaArrowRight />
        </button>
      </div>
      <div>
        {transactions?.slice(0, 5).map((trans, index) => (
          <TransactionInfoCard
            key={trans._id}
            transaction={trans}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}
