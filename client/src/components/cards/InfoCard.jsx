import React from "react";

export default function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-white w-[80%] rounded-lg p-5 flex items-center gap-5">
      {icon}
      <div>
        <h4 className="text-charcoal font-semibold">{label}</h4>
        <div className="text-gray-500">$ {value}</div>
      </div>
    </div>
  );
}
