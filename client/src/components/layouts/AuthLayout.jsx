import React from "react";
import AUTH_IMAGE from "../../assets/images/auth-image.png";
import AUTH_IMAGE2 from "../../assets/images/auth-image2.png";

export default function AuthLayout({ children }) {
  return (
    <div className="flex justify-center items-center md:flex-row flex-col mt-10 md:mt-0 h-screen overflow-hidden">
      <div className="lg:w-[40%] md:w-[50%] w-full h-screen flex justify-center items-center">
        {children}
      </div>
      <div className="md:w-[50%] h-screen md:flex justify-center items-center hidden">
        <img src={AUTH_IMAGE2} alt="Auth page image" className="lg:w-[90%]" />
      </div>
    </div>
  );
}
