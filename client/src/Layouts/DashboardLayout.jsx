import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import MobileBottomNav from "../components/Dashboard/MobileBottomNav";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const loadUserProfilePicture = async () => {
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      setProfilePicture(savedUser?.profilePicture || "");

      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch("http://localhost:4000/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) return;

        localStorage.setItem("user", JSON.stringify(data.user));
        setProfilePicture(data.user?.profilePicture || "");
      } catch (error) {
        console.log("Error fetching profile picture:", error);
      }
    };

    loadUserProfilePicture();
    window.addEventListener("user-updated", loadUserProfilePicture);

    return () => {
      window.removeEventListener("user-updated", loadUserProfilePicture);
    };
  }, []);

  /**
   * ACTIVE TAB FROM URL
   */
  const getActiveTab = () => {
    if (location.pathname === "/dashboard") {
      return "dashboard";
    }

    if (location.pathname.includes("/add-job")) {
      return "add-job";
    }

    if (location.pathname.includes("/applications")) {
      return "applications";
    }

    if (location.pathname.includes("/interviews")) {
      return "interviews";
    }

    if (location.pathname.includes("/resumes")) {
      return "resumes";
    }

    if (location.pathname.includes("/profile")) {
      return "profile";
    }

    return "dashboard";
  };

  const activeTab = getActiveTab();

  /**
   * DESKTOP SIDEBAR NAV
   */
  const desktopNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "dashboard",
      path: "/dashboard",
    },
    {
      id: "applications",
      label: "Applications",
      icon: "work",
      path: "/dashboard/applications",
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: "event",
      path: "/dashboard/interviews",
    },
    {
      id: "resumes",
      label: "Resume",
      icon: "article",
      path: "/dashboard/resumes",
    },
  ];

  /**
   * MOBILE NAV
   */
  const mobileNavItems = [
    {
      id: "dashboard",
      label: "Home",
      icon: "home",
      path: "/dashboard",
    },
    {
      id: "add-job",
      label: "Add Job",
      icon: "add_box",
      path: "/dashboard/add-job",
    },
    {
      id: "applications",
      label: "Apps",
      icon: "list_alt",
      path: "/dashboard/applications",
    },
    {
      id: "resumes",
      label: "Resume",
      icon: "article",
      path: "/dashboard/resumes",
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

        {/* SIDEBAR NAV */}
        <nav className="flex-1 space-y-2">
          {desktopNavItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
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

        <div className="border-t border-[#bbcabf] pt-4">
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-4 py-3 font-bold text-white shadow-md transition-all hover:bg-[#00563a] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add Job</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 ml-0 md:ml-60 overflow-y-auto pb-20 md:pb-0">
        {/* HEADER */}
        <header className="fixed top-0 left-0 md:left-60 right-0 z-40 flex justify-between items-center h-16 px-5 bg-white md:bg-[#eef6ee] border-b border-[#dde4dd]">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            {/* MOBILE TITLE */}
            <h1 className="block md:hidden text-[#006c49] font-black text-xl tracking-tight">
              {activeTab === "profile" ? (
                "Profile"
              ) : (
                <>
                  Track<span className="text-[#161d19]">r</span>
                </>
              )}
            </h1>

            {/* DESKTOP TITLE */}
            <h1 className="hidden md:block text-2xl font-bold capitalize text-[#161d19]">
              {activeTab === "dashboard" ? "Dashboard" : activeTab}
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* NOTIFICATION */}
            <button className="rounded-full p-2 transition-colors hover:bg-[#eef6ee]">
              <span className="material-symbols-outlined text-[24px] text-[#3c4a42] md:text-[28px] md:text-[#161d19]">
                notifications
              </span>
            </button>

            {activeTab === "profile" ? (
            <></>
            ) : (
              <div
                onClick={() => navigate("/dashboard/profile")}
                className="h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-[#dde4dd] bg-white md:h-11 md:w-11 md:border-[3px] md:border-black"
              >
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div
                onClick={() => navigate("/dashboard/profile")}
                className="hidden h-11 w-11 cursor-pointer overflow-hidden rounded-full border-[3px] border-black bg-white md:block"
              >
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="px-4 pb-28 pt-20 md:p-6 md:pt-16">
          <Outlet />
        </div>
      </main>

      {/* MOBILE NAV */}
      <MobileBottomNav
        navItems={mobileNavItems}
        activeTab={activeTab}
        navigate={navigate}
      />
    </div>
  );
};

export default DashboardLayout;
