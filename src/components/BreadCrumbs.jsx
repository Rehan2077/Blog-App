import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ data }) => {
  return (
    <div className="flex items-center overflow-x-auto whitespace-nowrap py-4 text-sm text-black opacity-50 md:pt-2 md:font-roboto lg:pb-1 lg:text-base">
      {data.map((item, index) => (
        <div key={index} className="flex">
          {index !== data.length - 1 ? (
            <Link to={item.link}>{item.name}</Link>
          ) : (
            <span className="cursor-pointer">{item.name}</span>
          )}

          {index !== data.length - 1 && <span className="px-2">/</span>}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
