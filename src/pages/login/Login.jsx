import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../services/index/users";
import { setUserInfo } from "../../store/reducers/user";

const Login = () => {
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(setUserInfo(data.user));
      localStorage.setItem("userInfo", JSON.stringify(data.user.token));
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
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    let { email, password } = data;
    email = email.toLowerCase();
    mutate({ email, password });
  };

  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);

  return (
    <section className="container mx-auto px-5 py-5 lg:py-10">
      <div className="mx-auto flex w-full max-w-sm flex-col font-roboto">
        <h1 className="mb-8 text-center text-2xl font-bold text-dark-soft xl:text-3xl">
          Login
        </h1>
        <div className="mx-4 flex flex-col gap-3  tracking-wide">
          <form
            className="flex flex-col text-dark-thin"
            onSubmit={handleSubmit(submitHandler)}
            action="/register"
            method="post"
          >
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
                required: {
                  value: true,
                  message: "Please enter your registered email",
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
              Password
            </label>
            <input
              {...register("password", {
                required: { value: true, message: "Password is required!" },
              })}
              className={`mb-4 rounded-lg border px-3 py-2  text-dark-soft md:py-3 ${
                errors?.password && "border-red-500 outline-none"
              }`}
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
            />
            {errors.password?.message && (
              <p className="-mt-3 mb-3 ml-1 text-[0.75rem] italic text-red-600 md:text-[0.8rem]">
                {errors.password?.message}
              </p>
            )}

            <Link
              to={"$"}
              className="w-fit text-sm font-semibold text-primary transition-all ease-linear hover:text-blue-700 "
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`my-4 cursor-pointer rounded-lg border-none bg-primary py-2 font-semibold text-white transition-all ease-linear hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary md:py-3`}
            >
              Login
            </button>
            <p className="text-sm font-medium text-dark-thin">
              Don't have an account?
              <Link
                to={"/register"}
                className="pl-2 font-semibold text-primary transition-all ease-linear hover:text-blue-700 "
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
