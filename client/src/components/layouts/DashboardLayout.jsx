import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import PageLoader from "../PageLoader";

export default function DasbhoardLayout({ children, activeMenu }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex md:px-5 px-2">
          <div className="w-65 h-[80vh]">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
}
