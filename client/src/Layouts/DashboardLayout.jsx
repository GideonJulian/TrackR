import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f4fbf4] text-[#161d19]">
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col h-full w-60 bg-[#eef6ee] border-r border-[#bbcabf] p-[16px] space-y-[16px] fixed left-0 top-0">
        {/* LOGO */}
        <div className="flex items-center gap-sm mb-lg px-sm">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[#006c49] text-8xl">
              track_changes
            </span>
          </div>

          <div>
            <span className="text-[#161d19] font-black text-xl sm:text-2xl tracking-tight">
              Track<span className="text-[#006c49]">R</span>
            </span>

            <p className="text-[13px] leading-[1.4] font-[500] tracking-[0.01rem] text-gray-500">
              Career Manager
            </p>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-[8px]  px-[8px]  py-md bg-[#006c49] text-white rounded-lg">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </a>

          <a className="flex items-center gap-[8px]  px-[8px]  py-md text-gray-600 hover:bg-[#dde4dd] cursor-pointer hover:px-[8px] hover:py-[16px] rounded-lg">
            <span className="material-symbols-outlined">work</span>
            Applications
          </a>

          <a className="flex items-center gap-[8px]  px-[8px]  py-md text-gray-600 hover:bg-[#dde4dd] cursor-pointer hover:px-[8px] hover:py-[16px] rounded-lg">
            <span className="material-symbols-outlined">event_available</span>
            Interviews
          </a>

          <a className="flex items-center gap-[8px]  px-[8px]  py-md text-gray-600 hover:bg-[#dde4dd] cursor-pointer hover:px-[8px] hover:py-[16px] rounded-lg">
            <span className="material-symbols-outlined">description</span>
            Resumes
          </a>
        </nav>

        {/* ADD BUTTON */}
        <button className="w-full py-md bg-primary text-white rounded-lg flex items-center justify-center gap-sm font-semibold">
          <span className="material-symbols-outlined">add</span>
          Add New Job
        </button>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 ml-0 md:ml-60 overflow-y-auto">
        {/* TOP BAR */}
        <header className="flex justify-between items-center h-16 px-6 bg-white border-b">
          <h2 className="text-xl font-bold text-primary">Dashboard</h2>

          <div className="flex items-center gap-4">
            <input
              placeholder="Search applications..."
              className="hidden lg:block border px-3 py-2 rounded-md w-64"
            />

            <span className="material-symbols-outlined cursor-pointer">
              notifications
            </span>

            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
