import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#f4fbf4] border-b fixed top-0 left-0 right-0">
      <div className="flex justify-between items-center w-full px-margin py-md max-w-7xl mx-auto ">
        <span className="text-[#161d19] font-bold text-[24px] leading-[1.3]">
          TrackR
        </span>
        <div className="hidden md:flex items-center gap-20">
          <Link className=" text-label-sm text-on-surface-variant font-medium hover:text-[#006c49] transition-colors duration-200">
            Features
          </Link>
          <Link className=" text-label-sm text-on-surface-variant font-medium hover:text-[#006c49] transition-colors duration-200">
            How it works
          </Link>
          <Link className=" text-label-sm text-on-surface-variant font-medium hover:text-[#006c49] transition-colors duration-200">
            Contact
          </Link>
        </div>
        <button className="bg-[#006c49] text-white px-lg py-sm rounded-md font-label-sm text-label-sm font-bold scale-95 active:scale-90 transition-transform">
            Get Started
        </button>
      </div>
    </div>
  );
};

export default Navbar;
