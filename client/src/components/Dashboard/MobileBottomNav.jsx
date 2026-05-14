import React from "react";

const MobileBottomNav = ({
  navItems,
  activeTab,
  navigate,
}) => {
  return (
   <nav className="md:hidden fixed bottom-0 left-2 right-2 h-20 bg-[#eef6ee] border border-[#dde4dd] rounded-t-2xl overflow-hidden flex items-center justify-around px-2 z-50">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              isActive
                ? "text-[#006c49]"
                : "text-[#3c4a42]"
            }`}
          >
            <span className="material-symbols-outlined text-[26px]">
              {item.icon}
            </span>

            <span className="text-[12px] font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;