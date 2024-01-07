import { MdSpaceDashboard, MdComment } from "react-icons/md";
import { BsPostcardFill } from "react-icons/bs";

import { NavLink } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="flex min-h-full w-full flex-col bg-white drop-shadow-lg lg:w-80">
      <div className="border-b-2 py-4">
        <h2 className="text-center text-2xl font-bold text-dark-soft">
          ADMIN
        </h2>
        <h4 className="text-center text-sm font-semibold text-dark-thin">
          MAIN MENU
        </h4>
      </div>
      <div className="mx-auto my-10 flex lg:flex-col flex-wrap justify-around gap-5 lg:gap-20 pr-3 text-lg font-semibold">
        <NavLink
          to={"/admin/dashboard"}
          style={({ isActive }) => ({
            color: isActive ? "#1565D8" : "#183B56",
            fontWeight: isActive ? "700" : "600",
          })}
          className={"flex items-center gap-3 hover:text-primary"}
        >
          <MdSpaceDashboard />
          Dashboard
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#1565D8" : "#183B56",
            fontWeight: isActive ? "700" : "600",
          })}
          to={"/admin/comments"}
          className={"flex items-center gap-3 hover:text-primary"}
        >
          <MdComment /> Comments
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "#1565D8" : "#183B56",
            fontWeight: isActive ? "700" : "600",
          })}
          to={"/admin/posts"}
          className={"flex items-center gap-3 hover:text-primary"}
        >
          <BsPostcardFill /> Posts
        </NavLink>
      </div>
    </header>
  );
};

export default AdminHeader;
