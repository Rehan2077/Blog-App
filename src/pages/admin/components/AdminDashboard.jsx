import { FiSearch } from "react-icons/fi";
import AdminCommentComponent from "./AdminCommentComponent";
import { Link } from "react-router-dom";
import AdminPostComponent from "./AdminPostComponent";

const AdminDashboard = () => {
  return (
    <div className="flex h-full w-full flex-col px-10 py-6 text-dark-hard">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="relative my-5 lg:my-0">
          <FiSearch className=" absolute left-2 top-[10px] h-5 w-5 text-[#959EAD] md:top-[12px]" />
          <input
            className="h-10 w-72 rounded-lg pl-10 pr-3 text-dark-hard shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] outline-none transition-all ease-linear placeholder:font-semibold focus:shadow-[rgba(13,_38,_200,_0.3)_0px_9px_20px] md:h-11 md:flex-1 md:pr-24"
            type="text"
            placeholder="Search here"
          />
        </div>
      </div>
      <div className="my-4 flex flex-col items-center gap-7 lg:flex-row lg:items-start">
        <div className="h-fit w-full rounded-lg bg-white px-5 py-5 shadow-md lg:w-96 lg:px-5 ">
          <h3 className="text-lg font-bold text-dark-soft">Comments</h3>
          <p className="text-sm text-dark-thin">
            You have <span className="font-semibold">{`34`}</span> comments
          </p>
          <div className="my-4">
            <AdminCommentComponent classname="" />
            <AdminCommentComponent classname="" />
            <AdminCommentComponent classname="" />
            <AdminCommentComponent classname="" />
            <AdminCommentComponent classname="" />
            <AdminCommentComponent classname="" />
          </div>
          <div className="text-center">
            <Link to={"/admin/comments"}>
              <button className="w-full rounded-lg bg-blue-100 py-2.5 text-sm  font-semibold text-primary transition-all ease-linear hover:bg-blue-600 hover:text-white">
                View More
              </button>
            </Link>
          </div>
        </div>
        <div className="h-fit w-full rounded-lg bg-white px-5 py-5 shadow-md">
          <h3 className="text-lg font-bold text-dark-soft">Recent Posts</h3>
          <p className="text-sm text-dark-thin">
            View and edit your latest posts
          </p>
          <div className="my-4">
            <AdminPostComponent classname="" />
            <AdminPostComponent classname="" />
            <AdminPostComponent classname="" />
            <AdminPostComponent classname="" />
          </div>
          <div className="text-center">
            <Link to={"/admin/posts"}>
              <button className="w-full rounded-lg bg-blue-100 py-2.5 text-sm font-semibold text-primary transition-all ease-linear hover:bg-blue-600 hover:text-white lg:w-72">
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
