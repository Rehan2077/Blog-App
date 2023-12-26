import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { images } from "../constants";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowDownSLine, RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/index/users";

const Header = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const navVisiblitiyHandler = () => setNavIsVisible((prev) => !prev);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLogout, setIsLogout] = useState(false);

  const handleLogOut = () => {
    setIsLogout(true);
    dispatch(logout());
    navigate("/");
    setIsLogout(false);
  };

  return (
    <section className="shadow-md sticky top-0 z-50 bg-white">
      <header className="container h-16 flex mx-auto p-5 justify-between items-center text-dark-soft">
        <div className="flex items-center -ml-3">
          <img className="w-20 " src={images.Logo} alt="DEVBLOG" />
          <span className="text-xl md:text-2xl font-semibold">DevBlog</span>
        </div>
        <div
          className={`z-50 lg:hidden border py-1 px-2 active:border-gray-400 border-gray-600 rounded-xl`}
          onClick={navVisiblitiyHandler}
        >
          {navIsVisible ? (
            <RiCloseLine className="w-6 h-6" />
          ) : (
            <RxHamburgerMenu className="w-6 h-6" />
          )}
        </div>
        <div
          className={` ${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-16 text-white lg:text-dark-soft lg:mt-0 bg-dark-hard  lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0  lg:static`}
        >
          <ol
            className={`flex flex-col lg:flex-row gap-12 font-semibold items-center mr-5`}
          >
            <li
              className="hover:text-primary transition-colors ease-linear"
              onClick={navVisiblitiyHandler}
            >
              <Link to={""}>HOME</Link>
            </li>
            <li
              className="hover:text-primary transition-colors ease-linear"
              onClick={navVisiblitiyHandler}
            >
              <Link to={"article"}>ARTICLE</Link>
            </li>
            <li className="relative group">
              <Link to={""}>
                <span className=" flex items-center gap-1 ml-3 lg:m-0 hover:text-primary hover:cursor-pointer transition-colors ease-linear">
                  PAGES <RiArrowDownSLine />
                </span>
              </Link>
              <ol className="text-md  absolute left-[82px] -bottom-[20px]  lg:top-5 lg:pt-6 lg:-left-1  group-hover:block w-28 lg:w-32 hidden rounded-xl ">
                <Link to={""}>
                  <li
                    className={`pl-2 py-2 bg-gray-900 lg:bg-gray-100 lg:hover:bg-gray-200 text-center lg:text-left pr-2 w-full text-[0.9rem] hover:text-primary lg:pl-3 rounded-t-xl`}
                    onClick={navVisiblitiyHandler}
                  >
                    ABOUT US
                  </li>
                </Link>
                <Link to={""}>
                  <li
                    className={`pl-2 py-2 bg-gray-900 lg:bg-gray-100 lg:hover:bg-gray-200 text-center lg:text-left pr-2 w-full text-[0.9rem] hover:text-primary lg:pl-3 rounded-b-xl `}
                    onClick={navVisiblitiyHandler}
                  >
                    CONTACT US
                  </li>
                </Link>
              </ol>
            </li>
            <li
              className="hover:text-primary transition-colors ease-linear"
              onClick={navVisiblitiyHandler}
            >
              FAQ
            </li>
            <li>
              {userInfo ? (
                <ol>
                  <li className="relative group">
                    <Link to={""}>
                      <span className="flex items-center gap-1 ml-3 lg:m-0 border-2 px-3 py-1 w-[100px] text-[0.95rem] hover:text-white hover:bg-primary transition-colors ease-linear rounded-3xl border-primary hover:border-transparent text-primary hover:shadow-lg">
                        ACCOUNT <RiArrowDownSLine />
                      </span>
                    </Link>
                    <ol
                      className={`text-md absolute left-[7.3rem] -bottom-[20px] lg:top-7 lg:pt-6 lg:-left-3 group-hover:block w-28 lg:w-32 hidden rounded-xl `}
                    >
                      <Link to={"/profile"}>
                        <li
                          className={`pl-2 py-2 bg-gray-900 lg:bg-gray-100 lg:hover:bg-gray-200 text-center lg:text-left pr-2 w-full text-[0.9rem] hover:text-primary lg:pl-3 rounded-t-xl`}
                          onClick={navVisiblitiyHandler}
                        >
                          PROFILE
                        </li>
                      </Link>
                      <Link onClick={handleLogOut}>
                        <li
                          className={`pl-2 py-2 bg-gray-900 lg:bg-gray-100 lg:hover:bg-gray-200 text-center lg:text-left pr-2 w-full text-[0.9rem] hover:text-red-600 lg:pl-3 rounded-b-xl`}
                          onClick={navVisiblitiyHandler}
                        >
                          <button disabled={isLogout}>LOG OUT</button>
                        </li>
                      </Link>
                    </ol>
                  </li>
                </ol>
              ) : (
                <Link to={"/register"}>
                  <button
                    className="border-2 px-4 py-1 w-[100px] hover:text-white hover:bg-primary transition-colors ease-linear rounded-3xl border-primary hover:border-transparent text-primary hover:shadow-lg"
                    onClick={navVisiblitiyHandler}
                  >
                    SIGN IN
                  </button>
                </Link>
              )}
            </li>
          </ol>
        </div>
      </header>
    </section>
  );
};

export default Header;
