import React from "react";
import { images } from "../../constants";

const CTA = () => {
  return (
    <>
      <svg
        className="w-full h-auto translate-y-1"
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
          // className="filter-[invert(10%) sepia(10%) saturate(5391%) hue-rotate(170deg) brightness(98%) contrast(93%);]"
        />
      </svg>
      <section className="px-5 bg-dark-hard ">
        <div className="container mx-auto flex gap-x-10 flex-col-reverse w-full lg:flex-row lg:items-center text-center lg:text-left justify-between text-white">
          <div className="flex flex-col items-center lg:items-start lg:w-1/2 xl:-mt-52 lg:-mt-40 md:-mt-10 mt-5">
            <h2 className="xl:text-4xl lg:text-3xl md:text-4xl text-3xl font-semibold">
              Get our stories delivered from us to your inbox daily.
            </h2>
            <div className="flex flex-col md:flex-row items-center lg:items-start gap-2 mt-4 md:mt-8 ">
              <input
                type="email"
                className="text-dark-hard outline-none md:h-9 h-10 w-[17rem] md:w-64 p-3 rounded-lg"
                placeholder="Your Email"
              />
              <button className="bg-primary hover:bg-blue-700 md:h-9 h-10 w-full md:w-max px-3 center rounded-lg font-semibold transition-all ease-linear ">
                Get started
              </button>
            </div>
            <p className="text-dark-thin mt-3 mb-10 md:mb-0">
              Enter your email above to join the DevBlog community!
            </p>
          </div>
          <div className="lg:w-1/2 md:mt-10 lg:mt-0 lg:-ml-0 hidden md:block ">
            <img src={images.CTACard} alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
