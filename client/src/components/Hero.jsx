import React from "react";
import users1 from "../../public/users1.png";
import users2 from "../../public/users2.png";
import users3 from "../../public/users3.png";
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
            <img
              src={users1}
              alt="User 1"
              className="w-10 h-10 rounded-md border-2 border-white"
            />
            <img
              src={users2}
              alt="User 2"
              className="w-10 h-10 rounded-md border-2 border-white"
            />
            <img
              src={users3}
              alt="User 3"
              className="w-10 h-10 rounded-md border-2 border-white"
            />
          </div>
          <span className="text-black text-[16px] font-normal leading-[1.4]">
            Loved by 1,000+ Job Seekers
          </span>
        </div>
      </div>
      <div className="relative flex justify-center lg:justify-end">
        <div className="bg-[#10b981] w-full max-w-[450px] aspect-[4/5] rounded-[48px] flex items-center justify-center p-xl [perspective:1000px]">
          <div className="bg-[#161d19] w-[280px] h-[580px] rounded-[40px] border-[8px] border-[#161d19] overflow-hidden shadow-2xl animate-float-3d shadow-[20px_40px_60px_-15px_rgba(0,0,0,0.5)]">
            <div className="bg-[#f4fbf4] h-full w-full p-[16px] flex flex-col gap-[16px]">
              <div className="flex justify-between items-center mb-[8px]">
                <span className="material-symbols-outlined text-[#006c49]">
                  analytics
                </span>
                <div className="w-8 h-8 rounded-full bg-[#e8f0e9]"></div>
              </div>

              <div className="space-y-[9px]">
                <div className="h-4 bg-surface-variant w-1/2 rounded-md"></div>
                <div className="grid grid-cols-2 gap-[8px]">
                  <div className="bg-[#10b98133] p-[8px] rounded-lg border border-[#10b981]">
                    <h1 className="text-[10px] text-[#006c49] font-bold">
                      ACTIVE
                    </h1>
                    <div className="text-lg font-bold text-[#161d19]">24</div>
                  </div>
                  <div className="bg-[#e8f0e9] p-[8px] rounded-lg border border-[#10b981]">
                    <h1 className="text-[10px] text-[#3c4a42] font-bold">
                      OFFERS
                    </h1>
                    <div className="text-lg font-bold text-[#161d19]">3</div>
                  </div>
                </div>
              </div>

              <div className="mt-md space-y-[16px]">
                <div className="bg-[white] border border[#bbcabf] py-[17px] px-[8px] rounded-lg flex items-center gap-[8px]">
                  <div className="w-10 h-10 bg-[#161d19] rounded-md  flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold">Appl Inc.</div>
                    <div className="text-[10px] text-[#3c4a42]">
                      Product Designer
                    </div>
                    <span className="text-[10px] px-[8px] py-[4px] bg-[#b7ebce] text-[#3c6c54] rounded-full font-bold"></span>
                  </div>
                  <span className="text-[10px] px-[8px] py-[4px] bg-[#b7ebce] text-{#3c6c54} rounded-full font-bold">
                    Interview
                  </span>
                </div>
                <div className="bg-[white] border border[#bbcabf] py-[17px] px-[8px] rounded-lg flex items-center gap-[8px]">
                  <div className="w-10 h-10 bg-[#10b981] rounded-md  flex items-center justify-center text-white text-xs font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold">Appl Inc.</div>
                    <div className="text-[10px] text-[#3c4a42]">
                      UX Engineer
                    </div>
                    {/* <span className="text-[10px] px-[8px] py-[4px] bg-[#b7ebce] text-[#3c6c54] rounded-full font-bold"></span> */}
                  </div>
                  <span className="text-[10px] px-[8px] py-[4px] bg-[#e8f0e9] text-[#3c4a42] rounded-full font-bold">
                    Applied
                  </span>
                </div>
                <div className="bg-[white] border border[#bbcabf] py-[17px] px-[8px] rounded-lg flex items-center gap-[8px]">
                  <div className="w-10 h-10 bg-[#376850] rounded-md  flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold">Google.</div>
                    <div className="text-[10px] text-[#3c4a42]">
                      Frontend Lead
                    </div>
                    {/* <span className="text-[10px] px-[8px] py-[4px] bg-[#b7ebce] text-[#3c6c54] rounded-full font-bold"></span> */}
                  </div>
                  <span className="text-[10px] px-[8px] py-[4px] bg-[#fc7c7833] text-[#a43a3a] rounded-full font-bold">
                    Applied
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
