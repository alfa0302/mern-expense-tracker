import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { FaUser } from "react-icons/fa";

export default function SideMenu({ activeMenu }) {
  const navigate = useNavigate();
  const { clearUser, user } = useContext(UserContext);
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };
  return (
    <aside className="m-2 bg-white h-full rounded-2xl md:flex flex-col py-10 px-5 hidden ">
      <div className="flex flex-col items-center">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="profile picture"
            className="h-14 w-14 rounded-full"
          />
        ) : (
          <FaUser className="h-14 w-14 text-deep rounded-full border-deep border p-1" />
        )}

        <h3 className="text-center text-md font-semibold text-charcoal my-2">
          {user.fullName}
        </h3>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        {SIDE_MENU_DATA.map((item) => (
          <button
            key={`menu-${item.id}`}
            className={`flex w-full p-2 ps-5 items-center gap-3 cursor-pointer rounded-lg ${activeMenu === item.label ? "bg-deep text-white" : "bg-gray-100"}`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon
              className={` ${activeMenu === item.label ? " text-white" : "text-charcoal"}`}
            />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
