import React from "react";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

import { images } from "../constants";

const Footer = () => {
  return (
    <section className="bg-gray-900">
      <footer className="container mx-auto px-5 grid grid-cols-10 gap-x-7  md:gap-x-10 gap-y-10 py-10 xl:grid-cols-12 xl:gap-x-10">
        <div className="col-span-5 md:col-span-3 md:col-start-5 lg:col-span-2">
          <h3 className="text-dark-thin font-semibold md:text-lg lg:text-xl">
            Products
          </h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base lg:text-lg">
            <li>Tools</li>
            <li>Gadgets</li>
            <li>Merchandise</li>
            <li>Resources</li>
            <li>Referral Program</li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-3 md:col-start-8 md:row-start-1 lg:col-span-2">
          <h3 className="text-dark-thin font-semibold md:text-lg lg:text-xl">
            Sevices
          </h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base lg:text-lg">
            <li>Consultants</li>
            <li>Workshops</li>
            <li>Support</li>
            <li>Assistance</li>
            <li>Documentation</li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-3 md:col-start-5 md:row-start-1 lg:col-span-2">
          <h3 className="text-dark-thin font-semibold md:text-lg lg:text-xl">
            Company
          </h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base lg:text-lg">
            <li>About</li>
            <li>Team</li>
            <li>Media</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-3 md:col-start-8  lg:col-span-2">
          <h3 className="text-dark-thin font-semibold md:text-lg lg:text-xl">
            More
          </h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base lg:text-lg">
            <li>Archive</li>
            <li>Forum</li>
            <li>Changelog</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="col-span-10 md:order-first md:col-span-4 md:-mt-4 lg:col-span-4 lg:row-start-1">
          <div className="flex items-center justify-center md:justify-start ">
            <img
              src={images.Logo}
              className="w-[70px] h-auto -ml-5 md:-ml-3"
              alt="DevBlog"
            />
            <span className="text-gray-100 font-bold text-lg md:text-xl">
              DevBlog
            </span>
          </div>
          <p className="text-center md:text-start text-dark-thin text-sm lg:text-lg">
            Elevate your coding journey with DevBlog -{" "}
            <br className="hidden lg:block" /> Where Passion Meets Innovation.
          </p>
          <ul className="flex justify-center items-center md:justify-start gap-x-3 mt-10 space-x-4 text-gray-300 md:text-lg">
            <li>
              <RiTwitterXFill />
            </li>
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaYoutube />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaGithub />
            </li>
          </ul>
        </div>
        <div className=" col-span-10 text-center hidden md:block text-[#7d8b97] italic tracking-wide lg:mt-5 lg:-mb-5 lg:col-span-12">
          <h2>All rights reserved © 2023 DevBlog - rehan2077</h2>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
