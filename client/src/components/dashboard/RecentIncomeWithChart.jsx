import React from "react";
import CustomPieChart from "../charts/CustomPieChart";

export default function RecentIncomeWithChart({ transactions = [] }) {
  const incomeColor = "rgb(44, 105, 117)";
  const balanceColor = "rgb(54, 69, 79)";
  const totalIncome = transactions?.reduce((acc, item) => item.amount + acc, 0);
  const groupedData = transactions.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.source);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({
        name: curr.source,
        value: curr.amount,
        fill: acc.length % 2 === 0 ? incomeColor : "rgb(104, 178, 160)",
      });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white mt-5 rounded-lg p-6 w-full shadow-sm">
      <div className="border-b border-b-seafoam flex justify-between pb-5 mb-4">
        <h3 className="text-md font-semibold" style={{ color: balanceColor }}>
          Income Sources
        </h3>
      </div>
      <div>
        {groupedData.length > 0 ? (
          <CustomPieChart
            data={groupedData}
            label={["Total Income", totalIncome]}
          />
        ) : (
          <p className="text-center text-gray-400 py-10">
            No income data available
          </p>
        )}
      </div>
    </div>
  );
}
