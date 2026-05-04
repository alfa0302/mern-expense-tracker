import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";
import moment from "moment";

export default function TransactionInfoCard({
  transaction,
  hideDeleteBtn,
  onDelete,
}) {
  const formattedDate = moment(transaction.date).format("DD MMM YYYY");
  return (
    <div className="flex justify-between items-center mt-5">
      <div className="flex gap-5 items-center">
        <div>
          {transaction.icon ? (
            <div className="rounded-full h-10 w-10 p-1 flex justify-center items-center bg-gray-300 text-2xl">
              {transaction.icon}
            </div>
          ) : (
            <LuUtensils className="text-white rounded-full bg-deep h-9 w-9 p-2" />
          )}
        </div>
        <div>
          <div className="text-charcoal text-sm">{transaction.source}</div>
          <div className="text-gray text-sm">{formattedDate}</div>
        </div>
      </div>
      <div className="flex gap-10">
        {!hideDeleteBtn && (
          <button onClick={() => onDelete(transaction._id)}>
            <LuTrash2 className="text-2xl text-red-500 hover:bg-gray-300 rounded-full p-1 cursor-pointer" />
          </button>
        )}
        <div
          className={`btn-label w-20 ${transaction.type === "income" ? "bg-green-100 text-deep " : "bg-red-100 text-red-500 "}`}
        >
          <div>
            <span>{transaction.type === "income" ? "+" : "-"}</span>
            <span>{transaction.amount}</span>
          </div>

          {transaction.type === "income" ? (
            <LuTrendingUp />
          ) : (
            <LuTrendingDown />
          )}
        </div>
      </div>
    </div>
  );
}
