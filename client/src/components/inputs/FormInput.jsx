import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormInput({
  // title,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  const [showPass, setShowPass] = useState(false);
  if (type !== "password") {
    return (
      <div className="text-deep bg-mint-cream text-sm p-2 rounded-lg">
        {/* <label htmlFor={name} className="">{title}</label> */}
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="focus:outline-none bg-mint-cream"
        />
      </div>
    );
  } else {
    return (
      <div className="flex justify-between text-deep bg-mint-cream text-sm p-2 rounded-lg">
        {/* <label htmlFor={name} className="">{title}</label> */}
        <input
          type={showPass ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="focus:outline-none bg-mint-cream w-[100%] h-full"
        />
        <span
          onClick={() => {
            setShowPass((prev) => !prev);
          }}
        >
          {!showPass ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
    );
  }
}
