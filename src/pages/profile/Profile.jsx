import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { VscVerified } from "react-icons/vsc";

import { formatDate } from "../../utils/formatDate";
import { useEffect } from "react";
import ProfilePicture from "../../components/ProfilePicture";

const Profile = () => {
  //   const { mutate, isLoading } = useMutation({

  //     mutationFn: update,
  //     onSuccess: (data) => {
  //       toast.success(data.message);
  //       console.log(data);
  //       navigate("/login");
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //       console.log(error);
  //     },
  //   });

  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo);
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
      <div className="flex flex-col text-dark-soft mx-auto font-roboto">
        <h1 className="text-center text-2xl xl:text-3xl font-bold mb-8">
          Profile
        </h1>
        <div className="flex flex-col items-center gap-1 mx-4 tracking-wide">
          <ProfilePicture photo={userInfo?.avatar} />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center">
              <div className="flex gap-1 items-center justify-center text-dark-hard text-2xl font-bold">
                {userInfo?.name}{" "}
                {userInfo?.verified && <VscVerified className="text-primary text-xl" />}
              </div>
              <div className="tracking-normal font-mono">{userInfo?._id}</div>
            </div>
            <div
              className={`flex flex-col lg:flex-row font-semibold gap-1 lg:gap-10 justify-between`}
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
                <div>Posts: null</div>
                <div>Comments: null</div>
              </div>
            </div>
            <button
              className="w-full lg:w-72 my-5 bg-primary mx-auto text-white py-3 hover:bg-blue-700 rounded-lg transition-all ease-linear"
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
