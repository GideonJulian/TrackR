import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();

  /**
   * MOCK STATE
   * later replace with real API data
   */
  const hasApplications = false;

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

      {/* EMPTY STATE */}
      {!hasApplications && (
        <div className="mt-10 bg-white border border-[#dde4dd] rounded-3xl p-8 md:p-12 flex flex-col items-center text-center">
          
          {/* ICON */}
          <div className="w-24 h-24 rounded-3xl bg-[#eef6ee] flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[#006c49] text-[48px]">
              work
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#161d19]">
            No applications yet
          </h2>

          {/* TEXT */}
          <p className="max-w-md mt-3 text-[#3c4a42] text-[16px] leading-7">
            Start tracking your job applications, interviews,
            and offers in one clean workspace.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            
            <button
              onClick={() => navigate("/dashboard/applications")}
              className="h-12 px-6 rounded-xl bg-[#006c49] hover:bg-[#00563a] text-white font-semibold transition-all"
            >
              Add Your First Job
            </button>

            <button
              className="h-12 px-6 rounded-xl border border-[#bbcabf] hover:bg-[#f4fbf4] text-[#161d19] font-semibold transition-all"
            >
              Setup Profile
            </button>

          </div>

          {/* SMALL INFO */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            
            <div className="border border-[#dde4dd] rounded-2xl p-5 bg-[#f8fbf8]">
              <span className="material-symbols-outlined text-[#006c49] text-[30px]">
                task_alt
              </span>

              <h3 className="font-bold mt-3 text-[#161d19]">
                Track Applications
              </h3>

              <p className="text-sm text-[#3c4a42] mt-1">
                Organize every role you've applied for.
              </p>
            </div>

            <div className="border border-[#dde4dd] rounded-2xl p-5 bg-[#f8fbf8]">
              <span className="material-symbols-outlined text-[#006c49] text-[30px]">
                event_available
              </span>

              <h3 className="font-bold mt-3 text-[#161d19]">
                Manage Interviews
              </h3>

              <p className="text-sm text-[#3c4a42] mt-1">
                Never miss upcoming interview schedules.
              </p>
            </div>

            <div className="border border-[#dde4dd] rounded-2xl p-5 bg-[#f8fbf8]">
              <span className="material-symbols-outlined text-[#006c49] text-[30px]">
                insights
              </span>

              <h3 className="font-bold mt-3 text-[#161d19]">
                See Progress
              </h3>

              <p className="text-sm text-[#3c4a42] mt-1">
                Visualize your job search journey easily.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;