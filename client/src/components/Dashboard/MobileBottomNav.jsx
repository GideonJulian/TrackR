import React from "react";

const MobileBottomNav = ({ navItems, activeTab, setActiveTab, navigate }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#f4fbf4] border-t border-[#bbcabf] flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              navigate(item.path);
            }}
            className={`flex flex-col items-center justify-center text-xs transition-all ${
              isActive ? "text-[#006c49]" : "text-[#161d19]"
            }`}
          >
            <span className="material-symbols-outlined text-[26px]">
              {item.icon}
            </span>

            <span className="mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
