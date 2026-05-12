import React from "react";
import users1 from "../../public/users1.png";
import users2 from "../../public/users2.png";
import users3 from "../../public/users3.png";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-margin py-12 lg:py-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

      {/* LEFT SECTION */}
      <div className="flex flex-col items-start gap-5 text-center lg:text-left">

        <span className="text-xs sm:text-sm font-semibold text-[#006c49] tracking-widest uppercase">
          THE SMART JOB TRACKER
        </span>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-[40px] leading-tight font-black text-[#161d19] max-w-lg">
          Track every application. Land your dream job.
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-[#161d19] max-w-md">
          Trackr helps organize job applications, monitor progress, and never
          miss an opportunity with professional-grade precision.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">

          <button className="bg-[#006c49] text-white cursor-pointer px-6 sm:px-10 py-3 rounded-lg font-semibold text-sm sm:text-base hover:brightness-90 transition-all w-full sm:w-auto">
            Get Started Free
          </button>

          <button className="bg-white border border-gray-300 text-black cursor-pointer px-6 sm:px-10 py-3 rounded-lg font-semibold text-sm sm:text-base hover:brightness-90 transition-all w-full sm:w-auto">
            See how it works
          </button>
        </div>

        {/* USERS */}
        <div className="flex items-center gap-3 mt-6 justify-center lg:justify-start">

          <div className="flex -space-x-2">
            <img src={users1} className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border-2 border-white" />
            <img src={users2} className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border-2 border-white" />
            <img src={users3} className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border-2 border-white" />
          </div>

          <span className="text-sm sm:text-base text-black font-normal">
            Loved by 1,000+ Job Seekers
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="relative flex justify-center lg:justify-end">

        <div className="bg-[#10b981] w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[450px] aspect-[4/5] rounded-[40px] sm:rounded-[48px] flex items-center justify-center p-6 sm:p-xl [perspective:1000px]">

          {/* PHONE */}
          <div className="bg-[#161d19] w-[220px] sm:w-[250px] lg:w-[270px] h-[460px] sm:h-[520px] lg:h-[550px] rounded-[36px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-[#161d19] overflow-hidden shadow-2xl animate-float-3d shadow-[20px_40px_60px_-15px_rgba(0,0,0,0.5)] [transform:rotateY(-14deg)_rotateX(6deg)] transition-transform duration-300 hover:[transform:rotateY(-8deg)_rotateX(4deg)]">

            <div className="bg-[#f4fbf4] h-full w-full p-4 flex flex-col gap-4">

              {/* TOP BAR */}
              <div className="flex justify-between items-center">
                <span className="material-symbols-outlined text-[#006c49]">
                  analytics
                </span>
                <div className="w-7 h-7 rounded-full bg-[#e8f0e9]" />
              </div>

              {/* STATS */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 w-1/2 rounded-md" />

                <div className="grid grid-cols-2 gap-2">

                  <div className="bg-[#10b98133] p-2 rounded-lg border border-[#10b981]">
                    <h1 className="text-[10px] text-[#006c49] font-bold">
                      ACTIVE
                    </h1>
                    <div className="text-base font-bold text-[#161d19]">
                      24
                    </div>
                  </div>

                  <div className="bg-[#e8f0e9] p-2 rounded-lg border border-[#10b981]">
                    <h1 className="text-[10px] text-[#3c4a42] font-bold">
                      OFFERS
                    </h1>
                    <div className="text-base font-bold text-[#161d19]">
                      3
                    </div>
                  </div>

                </div>
              </div>

              {/* LIST */}
              <div className="mt-3 space-y-3 text-xs">

                {/* ITEM 1 */}
                <div className="bg-white border border-[#bbcabf] py-3 px-2 rounded-lg flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#161d19] rounded-md flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>

                  <div className="flex-1">
                    <div className="text-xs font-bold">Apple Inc.</div>
                    <div className="text-[10px] text-[#3c4a42]">
                      Product Designer
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-1 bg-[#b7ebce] text-[#3c6c54] rounded-full font-bold">
                    Interview
                  </span>
                </div>

                {/* ITEM 2 */}
                <div className="bg-white border border-[#bbcabf] py-3 px-2 rounded-lg flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#10b981] rounded-md flex items-center justify-center text-white text-xs font-bold">
                    S
                  </div>

                  <div className="flex-1">
                    <div className="text-xs font-bold">Stripe</div>
                    <div className="text-[10px] text-[#3c4a42]">
                      UX Engineer
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-1 bg-[#e8f0e9] text-[#3c4a42] rounded-full font-bold">
                    Applied
                  </span>
                </div>

                {/* ITEM 3 */}
                <div className="bg-white border border-[#bbcabf] py-3 px-2 rounded-lg flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#376850] rounded-md flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>

                  <div className="flex-1">
                    <div className="text-xs font-bold">Google</div>
                    <div className="text-[10px] text-[#3c4a42]">
                      Frontend Lead
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-1 bg-[#fc7c7833] text-[#a43a3a] rounded-full font-bold">
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