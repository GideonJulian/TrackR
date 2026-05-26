const MobileBottomNav = ({
  navItems,
  activeTab,
  navigate,
}) => {
  return (
   <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#dde4dd] shadow-lg flex items-center justify-around px-2 z-50">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg p-1 transition-all ${
              isActive
                ? "text-[#006c49]"
                : "text-[#3c4a42]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>

            <span className={`text-[11px] ${isActive ? "font-bold" : "font-medium"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
