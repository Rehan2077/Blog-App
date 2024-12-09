import { VscVerified } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import ProfilePicture from "../../components/ProfilePicture";
import { formatDate } from "../../utils/formatDate";
import Verify from "./Verify";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);

  console.log(userInfo);

  const navigate = useNavigate();
  const joinedDate = formatDate(userInfo?.createdAt);
  const formattedDate = new Date(joinedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    if (!userInfo) navigate("/");
  }, [navigate, userInfo]);

  return (
    <section className="container mx-auto px-5 py-5 lg:py-10">
      <div className="mx-auto flex flex-col font-roboto text-dark-soft">
        <h1 className="mb-8 text-center text-2xl font-bold xl:text-3xl">
          Profile
        </h1>
        <div className="mx-4 flex flex-col items-center gap-1 tracking-wide">
          <ProfilePicture photo={userInfo?.avatar} />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-1 text-2xl font-bold text-dark-hard">
                {userInfo?.name}{" "}
                {userInfo?.verified && (
                  <VscVerified className="text-xl text-primary" />
                )}
              </div>
              <div className="font-mono tracking-normal">{userInfo?._id}</div>
            </div>
            <div
              className={`flex flex-col justify-between gap-1 font-semibold lg:flex-row lg:gap-10`}
            >
              <div>
                <div>
                  Email:{" "}
                  <span className="font-normal text-dark-thin">
                    {userInfo?.email}
                  </span>
                </div>
                <div>
                  Joined:{" "}
                  <span className="font-normal text-dark-thin">
                    {" "}
                    {formattedDate ? formattedDate : joinedDate}
                  </span>
                </div>
              </div>
              <div>
                <div>Posts: {userInfo?.totalPosts || "0"}</div>
                <div>Comments: {userInfo?.totalComments || "0"}</div>
              </div>
            </div>
            {!userInfo?.verified && (
              <Verify token={userInfo?.token} />
            )}
            <button
              className="mx-auto my-5 w-full rounded-lg bg-primary py-3 text-white transition-all ease-linear hover:bg-blue-700 lg:w-72"
              onClick={() => navigate("/updateprofile")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
