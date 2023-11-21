import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ data }) => {
  return (
    <div className="flex items-center py-4 md:pt-2 lg:pb-1 overflow-x-auto whitespace-nowrap text-black opacity-50 text-sm md:font-roboto lg:text-base">
      {data.map((item, index) => (
        <div key={index} className="flex">
          <Link to={item.link}>{item.name}</Link>
          {index !== data.length - 1 && <span className="px-2">/</span>}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
