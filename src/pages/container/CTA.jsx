import React, { useState } from "react";
import { images } from "../../constants";
import toast from "react-hot-toast";

const CTA = () => {
  const [email, setEmail] = useState("");
  const handleClick = () => {
    if (
      email.length > 0 &&
      email.indexOf("@") !== -1 &&
      email.indexOf(".") !== -1
    ) {
      toast.success("Thank you for joining the DevBlog newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <>
      <svg
        className="h-auto w-full translate-y-1"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
          className="dark:hidden"
        />
      </svg>
      <section className="bg-dark-hard px-5 dark:lg:-mt-20">
        <div className="container mx-auto flex w-full flex-col-reverse justify-between gap-x-10 text-center text-white lg:flex-row lg:items-center lg:text-left">
          <div className="mt-5 flex flex-col items-center md:-mt-10 lg:-mt-40 lg:w-1/2 lg:items-start xl:-mt-52">
            <h2 className="text-3xl font-semibold md:text-4xl lg:text-3xl xl:text-4xl">
              Receive daily doses of knowledge straight to your inbox.
            </h2>
            <div className="mt-4 flex flex-col items-center gap-2 md:mt-8 md:flex-row lg:items-start ">
              <input
                type="email"
                className="h-10 w-[17rem] rounded-lg p-3 text-dark-hard outline-none md:h-9 md:w-64"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleClick}
                className="center h-10 w-full rounded-lg bg-primary px-3 font-semibold transition-all ease-linear hover:bg-blue-700 md:h-9 md:w-max "
              >
                Get started
              </button>
            </div>
            <p className="mb-10 mt-3 text-dark-thin md:mb-0">
              Enter your email above to join the DevBlog newsletter!
            </p>
          </div>
          <div className="hidden md:mt-10 md:block lg:-mb-10 lg:-ml-0 lg:mt-10 lg:w-1/2 ">
            <img src={images.CTACard} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
