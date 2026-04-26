import React from "react";
import AUTH_IMAGE from "../../assets/images/auth-image.png";
import AUTH_IMAGE2 from "../../assets/images/auth-image2.png";

export default function AuthLayout({ children }) {
  return (
    <div className="flex justify-center">
      <div className="md:w-[30%] w-screen flex justify-center items-center">
        {children}
      </div>
      <div className="md:w-[50%] w-screen h-screen flex justify-center items-center">
        <img src={AUTH_IMAGE2} alt="Auth page image" className="w-[90%]" />
      </div>
    </div>
  );
}
