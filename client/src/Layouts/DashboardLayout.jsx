import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  /**
   * ACTIVE TAB STATE
   */
  const [activeTab, setActiveTab] = useState("dashboard");

  /**
   * SIDEBAR ITEMS
   */
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "dashboard",
    },
    {
      id: "applications",
      label: "Applications",
      icon: "work",
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: "event_available",
    },
    {
      id: "resumes",
      label: "Resumes",
      icon: "description",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4fbf4] text-[#161d19]">

      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col h-full w-60 bg-[#eef6ee] border-r border-[#bbcabf] p-4 space-y-4 fixed left-0 top-0">

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-8 px-2">

          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[#006c49] text-[28px]">
              track_changes
            </span>
          </div>

          <div>
            <h1 className="text-[#161d19] font-black text-2xl tracking-tight">
              Track<span className="text-[#006c49]">R</span>
            </h1>

            <p className="text-xs text-gray-500 font-medium">
              Career Manager
            </p>
          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2">

          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-[#006c49] text-white shadow-md"
                    : "text-gray-600 hover:bg-[#dde4dd]"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </button>
            );
          })}

        </nav>

        {/* ADD JOB BUTTON */}
        <button className="w-full py-3 bg-[#006c49] hover:bg-[#00563a] transition-all text-white rounded-xl flex items-center justify-center gap-2 font-semibold shadow-md">
          <span className="material-symbols-outlined text-[20px]">
            add
          </span>

          Add New Job
        </button>

      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 ml-0 md:ml-60 overflow-y-auto">

        {/* TOP BAR */}
        <header className="flex justify-between items-center h-16 px-6 bg-white border-b border-[#dde4dd] sticky top-0 z-20">

          <div>
            <h2 className="text-xl font-bold capitalize text-[#161d19]">
              {activeTab}
            </h2>

            <p className="text-sm text-gray-500">
              Manage your career journey
            </p>
          </div>

          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div className="hidden lg:flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-[#f8fbf8]">
              <span className="material-symbols-outlined text-gray-400 text-[20px]">
                search
              </span>

              <input
                type="text"
                placeholder="Search applications..."
                className="bg-transparent outline-none text-sm ml-2 w-56"
              />
            </div>

            {/* NOTIFICATION */}
            <button className="w-10 h-10 rounded-full hover:bg-[#eef6ee] flex items-center justify-center transition-all">
              <span className="material-symbols-outlined text-gray-600">
                notifications
              </span>
            </button>

            {/* USER */}
            <div className="w-10 h-10 rounded-full bg-[#dde4dd] overflow-hidden border border-gray-300">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </main>
    </div>
  );
};

export default DashboardLayout;