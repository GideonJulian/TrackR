import React from "react";

const DashboardHome = () => {
  // Fetching user data
  return (
    <div>
      {/* DESKTOP HERO */}
      <div className="hidden md:block">
        <h1 className="text-[45px] leading-[1.1] tracking-[0.02rem] font-bold font-display text-[#161d19]">
          Welcome back, Gideon!
        </h1>

        <p className="text-[18px] leading-[1.6] font-normal font-body-lg text-[#3c4a42] mt-1">
          Here's what's happening with your applications today.
        </p>
      </div>

      {/* MOBILE HERO */}
      <div className="flex md:hidden justify-between items-end">
        <h2 className="text-[24px] leading-[1.3] font-semibold text-[#161d19]">
          Your Activity
        </h2>

        <span className="text-[13px] leading-[1.4] font-medium text-[#3c4a42]">
          Last 30 days
        </span>
      </div>
    </div>
  );
};

export default DashboardHome;
