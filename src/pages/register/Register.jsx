import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../../services/index/users";

const Register = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
      navigate("/login");
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
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  const submitHandler = (data) => {
    let { name, email, password } = data;
    email = email.toLowerCase();
    mutate({ name, email, password });
  };

  return (
    <section className="container mx-auto px-5 py-5 lg:py-10">
      <div className="mx-auto flex w-full max-w-sm flex-col font-roboto">
        <h1 className="mb-8 text-center text-2xl font-bold text-dark-soft xl:text-3xl">
          Sign Up
        </h1>
        <div className="mx-4 flex flex-col gap-3  tracking-wide">
          <form
            className="flex flex-col text-dark-thin"
            onSubmit={handleSubmit(submitHandler)}
            action="/register"
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
                required: { value: true, message: "Please enter your name" },
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
                required: { value: true, message: "Please enter your email" },
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
                minLength: {
                  value: 6,
                  message: "Password length must be atleast 6 characters!",
                },
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
            <label className="mb-1 pl-1 text-sm" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: { value: true, message: "Re-enter your password" },
                validate: (value) => {
                  if (value !== password) {
                    return "Passwords do not match";
                  }
                },
              })}
              className={`mb-4 rounded-lg border px-3 py-2  text-dark-soft md:py-3 ${
                errors?.confirmPassword && "border-red-500 outline-none"
              }`}
              type="password"
              placeholder="Confirm password"
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
              Register
            </button>
            <p className="text-sm font-medium  text-dark-thin">
              Already have an account?
              <Link
                to={"/login"}
                className="pl-2 font-semibold text-primary transition-all ease-linear hover:text-blue-700 "
              >
                Login now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
