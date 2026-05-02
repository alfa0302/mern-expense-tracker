import React from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export default function CustomPieChart({ data, label }) {
  return (
    <div className="p-2 md:flex w-full">
      <div style={{ width: "70%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius="70%"
              outerRadius="90%"
              cornerRadius={10}
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={true}
            >
              <Label
                value={label?.[0] || ""}
                position="center"
                fill="#36454F"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              />
              <Label
                value={`$${label?.[1] || 0}`}
                position="center"
                fill="#6B7280"
                style={{ fontSize: "14px", fontWeight: "500" }}
                dy={20}
              />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                backgroundColor: "#fff",
              }}
              itemStyle={{
                color: "#1B4332",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
              labelStyle={{
                color: "#6B7280",
                fontSize: "12px",
                marginBottom: "4px",
              }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-row md:flex-col justify-center gap-5">
        {data.map((item, index) => (
          <Marker
            name={item.name}
            color={item.fill}
            key={`chart-label-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

const Marker = ({ name, color }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <div
        className="h-4 w-4 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <p className="text-sm text-charcoal">{name}</p>
    </div>
  );
};
