import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("userInfo").replace(/['"]+/g, "");
      if (!token) {
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (!userInfo?.admin || !isLoading) {
      toast.error("You are not an admin!");
      setIsLoading(false);
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex h-full w-full flex-col bg-gray-100 lg:flex-row">
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
