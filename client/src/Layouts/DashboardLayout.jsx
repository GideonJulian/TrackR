import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import MobileBottomNav from "../components/Dashboard/MobileBottomNav";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");

  const navItems = [
    {
      id: "dashboard",
      label: "Home",
      icon: "home",
      path: "/dashboard",
    },
    {
      id: "applications",
      label: "Apps",
      icon: "list_alt",
      path: "/dashboard/applications",
    },
    {
      id: "interviews",
      label: "Add Job",
      icon: "add_box",
      path: "/dashboard/interviews",
    },
    {
      id: "resumes",
      label: "Resume",
      icon: "article",
      path: "/dashboard/resumes",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "person",
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4fbf4] text-[#161d19]">
      {/* DESKTOP SIDEBAR */}
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

            <p className="text-xs text-gray-500 font-medium">Career Manager</p>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="flex-1 space-y-2">
          {navItems.slice(0, 4).map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  navigate(item.path);
                }}
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
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-0 md:ml-60 overflow-y-auto pb-20 md:pb-0">
        {/* HEADER */}
        <header className="flex justify-between items-center h-16 px-5 bg-[#eef6ee] border-b border-[#dde4dd]">
  
  {/* TITLE */}
  <div className="flex items-center gap-2">

    {/* MOBILE */}
    <h1 className="block md:hidden text-[#006c49] font-black text-3xl tracking-tight">
      Track<span className="text-[#161d19]">r</span>
    </h1>

    {/* DESKTOP */}
    <h1 className="hidden md:block text-2xl font-bold capitalize text-[#161d19]">
      Dashboard
    </h1>

  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-4">
    
    <button>
      <span className="material-symbols-outlined text-[28px] text-[#161d19]">
        notifications
      </span>
    </button>

    <div className="w-11 h-11 rounded-full overflow-hidden border-[3px] border-black">
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
          <Outlet />
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <MobileBottomNav
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigate={navigate}
      />
    </div>
  );
};

export default DashboardLayout;
