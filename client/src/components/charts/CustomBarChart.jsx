import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function CustomBarChart({ transactions }) {
  const colors = {
    income: "rgb(44, 105, 117)",
    expense: "rgb(104, 178, 160)",
    balance: "rgb(54, 69, 79)",
  };
  const chartData = transactions
    .reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      const existingDate = acc.find((item) => item.date === date);
      if (existingDate) {
        existingDate.amount += curr.amount;
      } else {
        acc.push({ date, amount: curr.amount });
      }
      return acc;
    }, [])
    .reverse();

  return (
    <div className="bg-white rounded-lg w-full">
      <div className="h-70 w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={true}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="date"
                axisLine={true}
                tickLine={true}
                tick={{ fill: colors.balance, fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: colors.balance, fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                cursor={{ fill: "#f3f4f6", opacity: 0.4 }}
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                }}
                itemStyle={{ color: colors.expense, fontWeight: "bold" }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={35}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors.expense} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>No expense data for this period.</p>
          </div>
        )}
      </div>
    </div>
  );
}
