import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../store/reducers/user";
import { useEffect } from "react";
import { signin } from "../../services/index/users";

const Login = () => {
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
      dispatch(setUserInfo(data.user));
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
      <div className="flex flex-col w-full max-w-sm mx-auto font-roboto">
        <h1 className="text-center text-dark-soft text-2xl xl:text-3xl font-bold mb-8">
          Login
        </h1>
        <div className="flex flex-col gap-3 mx-4  tracking-wide">
          <form
            className="flex flex-col text-dark-thin"
            onSubmit={handleSubmit(submitHandler)}
            action="/register"
            method="post"
          >
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
                required: {
                  value: true,
                  message: "Please enter your registered email",
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
              Password
            </label>
            <input
              {...register("password", {
                required: { value: true, message: "Password is required!" },
              })}
              className={`py-2 md:py-3 px-3 mb-4 rounded-lg  text-dark-soft border ${
                errors?.password && "border-red-500 outline-none"
              }`}
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
            />
            {errors.password?.message && (
              <p className="text-red-600 -mt-3 mb-3 text-[0.75rem] md:text-[0.8rem] italic ml-1">
                {errors.password?.message}
              </p>
            )}

            <Link
              to={"$"}
              className="w-fit text-sm text-primary hover:text-blue-700 font-semibold transition-all ease-linear "
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`my-4 py-2 md:py-3 border-none cursor-pointer text-white hover:bg-blue-700 bg-primary rounded-lg font-semibold transition-all ease-linear disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-not-allowed`}
            >
              Login
            </button>
            <p className="text-dark-thin text-sm font-medium">
              Don't have an account?
              <Link
                to={"/register"}
                className="pl-2 font-semibold text-primary hover:text-blue-700 transition-all ease-linear "
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