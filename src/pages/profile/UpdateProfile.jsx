import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { updateProfile } from "../../services/index/users";
import UpdateProfilePicture from "../../components/UpdateProfilePicture";
import { setUserInfo } from "../../store/reducers/user";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password, newpassword }) => {
      return updateProfile({
        userData: { name, email, password, newpassword },
        token: userInfo.token,
      });
    },
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(setUserInfo(data.user));
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      newpassword: "",
      confirmPassword: "",
    },
    values: { name: userInfo?.name, email: userInfo?.email },
    mode: "onChange",
  });

  const password = watch("password");
  const newpassword = watch("newpassword");

  const submitHandler = (data) => {
    let { name, email, password, newpassword } = data;
    email = email.toLowerCase();
    mutate({ name, email, password, newpassword });
  };

  useEffect(() => {
    if (!userInfo) navigate("/");
  }, [navigate, userInfo]);

  return (
    <section className="container mx-auto px-5 py-5 lg:py-10">
      <div className="mx-auto flex w-full max-w-sm flex-col font-roboto">
        <div className="flex flex-col items-center">
          <h1 className="mb-8 text-center text-2xl font-bold text-dark-soft xl:text-3xl">
            Update Profile
          </h1>
          <UpdateProfilePicture key={userInfo?._id} avatar={userInfo?.avatar} />
        </div>
        <div className="mx-4 flex flex-col gap-3  tracking-wide">
          <form
            className="flex flex-col text-dark-thin"
            onSubmit={handleSubmit(submitHandler)}
            action="/updateProfile"
            method="post"
          >
            <label className="mb-1 pl-1 text-sm" htmlFor="name">
              Name
            </label>
            <input
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "Name must be atleast 3 in length!",
                },
              })}
              className={`mb-4 rounded-lg border px-3 py-2  text-dark-soft md:py-3 ${
                errors?.name && "border-red-500 outline-none"
              }`}
              type="text"
              placeholder="Enter name"
              id="name"
              name="name"
            />
            {errors.name?.message && (
              <p className="-mt-3 mb-3 ml-1 text-[0.75rem] italic text-red-600 md:text-[0.8rem]">
                {errors.name?.message}
              </p>
            )}
            <label className="mb-1 pl-1 text-sm" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              className={`mb-4 rounded-lg border px-3 py-2  text-dark-soft md:py-3 ${
                errors?.email && "border-red-500 outline-none"
              }`}
              type="email"
              placeholder="Enter email"
              id="email"
              name="email"
            />
            {errors.email?.message && (
              <p className="-mt-3 mb-3 ml-1 text-[0.75rem] italic text-red-600 md:text-[0.8rem]">
                {errors.email?.message}
              </p>
            )}
            <label className="mb-1 pl-1 text-sm" htmlFor="password">
              Current Password
            </label>
            <input
              {...register("password", {
                required: newpassword ? true : false,
              })}
              className={`mb-4 rounded-lg border px-3 py-2  text-dark-soft md:py-3 ${
                errors?.password && "border-red-500 outline-none"
              }`}
              type="password"
              placeholder="Enter current password"
              id="password"
              name="password"
            />
            {errors.password?.message && (
              <p className="-mt-3 mb-3 ml-1 text-[0.75rem] italic text-red-600 md:text-[0.8rem]">
                {errors.password?.message}
              </p>
            )}
            <label className="mb-1 pl-1 text-sm" htmlFor="password">
              New Password
            </label>
            <input
              {...register("newpassword", {
                minLength: {
                  value: 6,
                  message: "Password length must be atleast 6 characters!",
                },
                required: password ? true : false,
              })}
              className={`mb-4 rounded-lg border px-3 py-2  text-dark-soft md:py-3 ${
                errors?.newpassword && "border-red-500 outline-none"
              }`}
              type="password"
              placeholder="Enter new password"
              id="newpassword"
              name="newpassword"
            />
            {errors.newpassword?.message && (
              <p className="-mt-3 mb-3 ml-1 text-[0.75rem] italic text-red-600 md:text-[0.8rem]">
                {errors.newpassword?.message}
              </p>
            )}
            <label className="mb-1 pl-1 text-sm" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                validate: (value) => {
                  if (value !== newpassword) {
                    return "Passwords do not match";
                  }
                },
              })}
              className={`mb-4 rounded-lg border px-3 py-2  text-dark-soft md:py-3 ${
                errors?.confirmPassword && "border-red-500 outline-none"
              }`}
              type="password"
              placeholder="Confirm new password"
              id="confirmPassword"
              name="confirmPassword"
            />
            {errors.confirmPassword?.message && (
              <p className="-mt-3 mb-3 ml-1 text-[0.75rem] italic text-red-600 md:text-[0.8rem]">
                {errors.confirmPassword?.message}
              </p>
            )}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`my-4 cursor-pointer rounded-lg border-none bg-primary py-2 font-semibold text-white transition-all ease-linear hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary md:py-3`}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
