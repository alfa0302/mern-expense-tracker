import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import SideMenu from "./SideMenu";

export default function Navbar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <header className="m-5 bg-white py-5 px-10 rounded-full text-charcoal">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpenSideMenu((prev) => !prev)}
          className="cursor-pointer lg:hidden"
        >
          {openSideMenu ? (
            <IoClose className="text-2xl" />
          ) : (
            <IoMenu className="text-2xl" />
          )}
        </button>
        <h1 className="font-bold text-lg">Expense tracker</h1>
      </div>
      {openSideMenu && <SideMenu />}
    </header>
  );
}
