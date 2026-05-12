import React from "react";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-margin py-xl grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
      <div className="flex flex-col items-start gap-md">
        <span className="text-label-sm font-label-sm text-[#006c49] tracking-widest uppercase">
          THE SMART JOB TRACKER
        </span>
        <h1 className="font-display text-[40px] leading-[1.1] font-black text-[#161d19] max-w-lg">
          Track every application. Land your dream job.
        </h1>
        <p className="text-[18px] leading-[1.6] font-normal text-[#161d19]  max-w-md">
          Trackr helps organize job applications, monitor progress, and never
          miss an opportunity with professional-grade precision.
        </p>

        <div className="flex flex-wrap gap-4  mt-[16px] ">
          <button className="bg-[#006c49] text-white cursor-pointer px-[64px] py-[16px] rounded-lg font-label-sm text-label-sm font-bold hover:brightness-90 transition-all">
            Get Started Free
          </button>
          <button className="bg-[#fff] border text-black  cursor-pointer px-[64px] py-[16px] rounded-lg font-label-sm text-label-sm font-bold hover:brightness-90 transition-all">
            See how it works
          </button>
        </div>

        <div className="flex items-center gap-[8px] mt-[32px]">
            <div className="flex -space-x-2">
                <img src="" alt="" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
