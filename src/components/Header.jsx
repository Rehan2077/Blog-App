import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { images } from "../constants";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiArrowDownSLine, RiCloseLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/index/users";

const Header = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const navVisiblitiyHandler = () => setNavIsVisible((prev) => !prev);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <section className="sticky top-0 z-50 bg-white shadow-md">
      <header className="container mx-auto flex h-16 items-center justify-between p-5 text-dark-soft">
        <div className="-ml-3 flex items-center">
          <Link to={"/"}>
            <img className="w-20 " src={images.Logo} alt="DEVBLOG" />
          </Link>
          <Link to={"/"}>
            <span className="text-xl font-semibold md:text-2xl">DevBlog</span>
          </Link>
        </div>
        <div
          className={`z-50 rounded-xl border border-gray-600 px-2 py-1 active:border-gray-400 lg:hidden`}
          onClick={navVisiblitiyHandler}
        >
          {navIsVisible ? (
            <RiCloseLine className="h-6 w-6" />
          ) : (
            <RxHamburgerMenu className="h-6 w-6" />
          )}
        </div>
        <div
          className={` ${
            navIsVisible ? "right-0" : "-right-full"
          } fixed bottom-0 top-0 z-[49] mt-16 flex w-full  flex-col justify-center bg-dark-hard text-white transition-all duration-300 lg:static lg:mt-0 lg:w-auto lg:flex-row lg:justify-end lg:bg-transparent  lg:text-dark-soft`}
        >
          <ol
            className={`mr-5 flex flex-col items-center gap-12 font-semibold lg:flex-row`}
          >
            <li
              className="transition-colors ease-linear hover:text-primary"
              onClick={navVisiblitiyHandler}
            >
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#1565D8" : "#183B56",
                  fontWeight: isActive ? "700" : "600",
                })}
                to={"/"}
              >
                HOME
              </NavLink>
            </li>
            <li
              className="transition-colors ease-linear hover:text-primary"
              onClick={navVisiblitiyHandler}
            >
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#1565D8" : "#183B56",
                  fontWeight: isActive ? "700" : "600",
                })}
                to={"article"}
              >
                ARTICLE
              </NavLink>
            </li>
            <li className="group relative">
              <span to={""}>
                <span className=" ml-3 flex items-center gap-1 transition-colors ease-linear hover:cursor-pointer hover:text-primary lg:m-0">
                  PAGES <RiArrowDownSLine />
                </span>
              </span>
              <ol className="text-md  absolute -bottom-[20px] left-[82px]  hidden w-28 rounded-xl  group-hover:block lg:-left-1 lg:top-5 lg:w-32 lg:pt-6 ">
                <Link to={"/about-us"}>
                  <li
                    className={`w-full rounded-t-xl bg-gray-900 py-2 pl-2 pr-2 text-center text-[0.9rem] hover:text-primary lg:bg-gray-100 lg:pl-3 lg:text-left lg:hover:bg-gray-200`}
                    onClick={navVisiblitiyHandler}
                  >
                    ABOUT US
                  </li>
                </Link>
                <Link to={"/contact-us"}>
                  <li
                    className={`w-full rounded-b-xl bg-gray-900 py-2 pl-2 pr-2 text-center text-[0.9rem] hover:text-primary lg:bg-gray-100 lg:pl-3 lg:text-left lg:hover:bg-gray-200 `}
                    onClick={navVisiblitiyHandler}
                  >
                    CONTACT US
                  </li>
                </Link>
              </ol>
            </li>
            {userInfo && userInfo?.admin ? (
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#1565D8" : "#183B56",
                  fontWeight: isActive ? "700" : "600",
                })}
                className="transition-colors ease-linear hover:text-primary"
                onClick={navVisiblitiyHandler}
                to={"/admin/posts/create"}
              >
                <button className="w-full rounded-lg bg-blue-100 px-5 py-2.5 text-sm font-semibold uppercase text-primary transition-all ease-linear hover:bg-blue-600 hover:text-white">
                  Create Post
                </button>
              </NavLink>
            ) : (
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#1565D8" : "#183B56",
                  fontWeight: isActive ? "700" : "600",
                })}
                className="transition-colors ease-linear hover:text-primary"
                onClick={navVisiblitiyHandler}
                to={"/faq"}
              >
                FAQ
              </NavLink>
            )}
            <li>
              {userInfo ? (
                <ol>
                  <li className="group relative">
                    <Link to={""}>
                      <span className="ml-3 flex w-[100px] items-center gap-1 rounded-3xl border-2 border-primary px-3 py-1 text-[0.95rem] text-primary transition-colors ease-linear hover:border-transparent hover:bg-primary hover:text-white hover:shadow-lg lg:m-0">
                        ACCOUNT <RiArrowDownSLine />
                      </span>
                    </Link>
                    <ol
                      className={`text-md absolute -bottom-[20px] left-[7.3rem] hidden w-28 rounded-xl group-hover:block lg:-left-3 lg:top-7 lg:w-32 lg:pt-6 `}
                    >
                      <Link to={"/profile"}>
                        <li
                          className={`w-full rounded-t-xl bg-gray-900 py-2 pl-2 pr-2 text-center text-[0.9rem] hover:text-primary lg:bg-gray-100 lg:pl-3 lg:text-left lg:hover:bg-gray-200`}
                          onClick={navVisiblitiyHandler}
                        >
                          PROFILE
                        </li>
                      </Link>
                      {userInfo?.admin && (
                        <Link to={"/admin/dashboard"}>
                          <li
                            className={`w-full bg-gray-900 py-2 pl-2 pr-2 text-center text-[0.9rem] hover:text-primary lg:bg-gray-100 lg:pl-3 lg:text-left lg:hover:bg-gray-200 `}
                            onClick={navVisiblitiyHandler}
                          >
                            ADMIN
                          </li>
                        </Link>
                      )}
                      <Link onClick={handleLogOut}>
                        <li
                          className={`w-full rounded-b-xl bg-gray-900 py-2 pl-2 pr-2 text-center text-[0.9rem] hover:text-red-600 lg:bg-gray-100 lg:pl-3 lg:text-left lg:hover:bg-gray-200`}
                          onClick={navVisiblitiyHandler}
                        >
                          <button>LOG OUT</button>
                        </li>
                      </Link>
                    </ol>
                  </li>
                </ol>
              ) : (
                <Link to={"/login"}>
                  <button
                    className="w-[100px] rounded-3xl border-2 border-primary px-4 py-1 text-primary transition-colors ease-linear hover:border-transparent hover:bg-primary hover:text-white hover:shadow-lg"
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
