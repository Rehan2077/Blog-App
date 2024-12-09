import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import { images } from "../constants";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-900">
      <footer className="container mx-auto grid grid-cols-10 gap-x-7 gap-y-10  px-5 py-10 md:gap-x-10 xl:grid-cols-12 xl:gap-x-10">
        <div className="col-span-5 md:col-span-3 md:col-start-5 lg:col-span-2">
          <h3 className="font-semibold text-dark-thin md:text-lg lg:text-xl">
            Products
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-[#959EAD] md:text-base lg:text-lg">
            <li>Tools</li>
            <li>Gadgets</li>
            <li>Merchandise</li>
            <li>Resources</li>
            <li>Referral Program</li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-3 md:col-start-8 md:row-start-1 lg:col-span-2">
          <h3 className="font-semibold text-dark-thin md:text-lg lg:text-xl">
            Sevices
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-[#959EAD] md:text-base lg:text-lg">
            <li>Consultants</li>
            <li>Workshops</li>
            <li>Support</li>
            <li>Assistance</li>
            <li>Documentation</li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-3 md:col-start-5 md:row-start-1 lg:col-span-2">
          <h3 className="font-semibold text-dark-thin md:text-lg lg:text-xl">
            Company
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-[#959EAD] md:text-base lg:text-lg">
            <li>About</li>
            <li>Team</li>
            <li>Media</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-3 md:col-start-8  lg:col-span-2">
          <h3 className="font-semibold text-dark-thin md:text-lg lg:text-xl">
            More
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-[#959EAD] md:text-base lg:text-lg">
            <li>Archive</li>
            <li>Forum</li>
            <li>Changelog</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="col-span-10 md:order-first md:col-span-4 md:-mt-4 lg:col-span-4 lg:row-start-1">
          <div
            onClick={() => navigate("/")}
            className="flex items-center justify-center md:justify-start "
          >
            <img
              src={images.Nexus}
              className=" h-auto w-32 cursor-pointer -ml-1"
              alt="NEXUS"
            />
            {/* <span className="cursor-pointer text-lg font-bold text-gray-100 md:text-xl">
              NEXUS
            </span> */}
          </div>
          <p className="text-center text-sm text-dark-thin md:text-start lg:text-lg">
            Elevate your knowledge with NEXUS -{" "}
            <br className="hidden lg:block" /> Where Passion Meets Innovation.
          </p>
          <ul className="mt-10 flex items-center justify-center gap-x-3 space-x-4 text-gray-300 md:justify-start md:text-lg">
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
        <div className=" col-span-10 hidden text-center italic tracking-wide text-[#7d8b97] md:block lg:col-span-12 lg:-mb-5 lg:mt-5">
          <h2>All rights reserved © 2024 NEXUS - rehan2077</h2>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
