import React, { useEffect } from 'react'
import AdminHeader from './components/AdminHeader'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.admin){
      toast.error("You are not an admin!");
      navigate("/");
    } 
  }, [navigate, userInfo]);


  return (
    <div className='flex flex-col lg:flex-row h-full w-full bg-gray-100'>
        <AdminHeader />
        <Outlet />
    </div>
  )
}

export default AdminLayout