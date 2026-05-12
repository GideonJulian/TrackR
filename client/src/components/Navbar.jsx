import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/favicon.png";
import { Logo } from "./Logo";
const Navbar = () => {
  return (
    <div className="bg-[#f4fbf4] border-b fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center w-full px-margin py-md max-w-7xl mx-auto ">
        <div className="flex  items-center">
          <img src={logo} alt="TrackR Logo" className="w-10 h-10" />
          <span className="text-[#161d19] font-black text-2xl tracking-tight relative inline-flex items-center">
            Track
            <span className="relative text-[#006c49]">
              R
              <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-[#006c49] rounded-full animate-bounce" />
            </span>
          </span>
          {/* <span>
            <Logo />
          </span> */}
        </div>
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
