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

  const { userInfo} = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
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
      <div className="flex flex-col w-full max-w-sm mx-auto font-roboto">
        <div className="flex flex-col items-center">
          <h1 className="text-center text-dark-soft text-2xl xl:text-3xl font-bold mb-8">
            Update Profile
          </h1>
          <UpdateProfilePicture key={userInfo?._id} avatar={userInfo?.avatar} />
        </div>
        <div className="flex flex-col gap-3 mx-4  tracking-wide">
          <form
            className="flex flex-col text-dark-thin"
            onSubmit={handleSubmit(submitHandler)}
            action="/updateProfile"
            method="post"
          >
            <label className="pl-1 mb-1 text-sm" htmlFor="name">
              Name
            </label>
            <input
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "Name must be atleast 3 in length!",
                },
              })}
              className={`py-2 md:py-3 px-3 mb-4 rounded-lg  text-dark-soft border ${
                errors?.name && "border-red-500 outline-none"
              }`}
              type="text"
              placeholder="Enter name"
              id="name"
              name="name"
            />
            {errors.name?.message && (
              <p className="text-red-600 -mt-3 mb-3 text-[0.75rem] md:text-[0.8rem] italic ml-1">
                {errors.name?.message}
              </p>
            )}
            <label className="pl-1 mb-1 text-sm" htmlFor="email">
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
              className={`py-2 md:py-3 px-3 mb-4 rounded-lg  text-dark-soft border ${
                errors?.email && "border-red-500 outline-none"
              }`}
              type="email"
              placeholder="Enter email"
              id="email"
              name="email"
            />
            {errors.email?.message && (
              <p className="text-red-600 -mt-3 mb-3 text-[0.75rem] md:text-[0.8rem] italic ml-1">
                {errors.email?.message}
              </p>
            )}
            <label className="pl-1 mb-1 text-sm" htmlFor="password">
              Current Password
            </label>
            <input
              {...register("password", {
                required: newpassword ? true : false,
              })}
              className={`py-2 md:py-3 px-3 mb-4 rounded-lg  text-dark-soft border ${
                errors?.password && "border-red-500 outline-none"
              }`}
              type="password"
              placeholder="Enter current password"
              id="password"
              name="password"
            />
            {errors.password?.message && (
              <p className="text-red-600 -mt-3 mb-3 text-[0.75rem] md:text-[0.8rem] italic ml-1">
                {errors.password?.message}
              </p>
            )}
            <label className="pl-1 mb-1 text-sm" htmlFor="password">
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
              className={`py-2 md:py-3 px-3 mb-4 rounded-lg  text-dark-soft border ${
                errors?.newpassword && "border-red-500 outline-none"
              }`}
              type="password"
              placeholder="Enter new password"
              id="newpassword"
              name="newpassword"
            />
            {errors.newpassword?.message && (
              <p className="text-red-600 -mt-3 mb-3 text-[0.75rem] md:text-[0.8rem] italic ml-1">
                {errors.newpassword?.message}
              </p>
            )}
            <label className="pl-1 mb-1 text-sm" htmlFor="confirmPassword">
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
              className={`py-2 md:py-3 px-3 mb-4 rounded-lg  text-dark-soft border ${
                errors?.confirmPassword && "border-red-500 outline-none"
              }`}
              type="password"
              placeholder="Confirm new password"
              id="confirmPassword"
              name="confirmPassword"
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-600 -mt-3 mb-3 text-[0.75rem] md:text-[0.8rem] italic ml-1">
                {errors.confirmPassword?.message}
              </p>
            )}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`my-4 py-2 md:py-3 border-none cursor-pointer text-white hover:bg-blue-700 bg-primary rounded-lg font-semibold transition-all ease-linear disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-not-allowed`}
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
