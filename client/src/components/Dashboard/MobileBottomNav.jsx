const MobileBottomNav = ({
  navItems,
  activeTab,
  navigate,
}) => {
  return (
   <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#dde4dd] bg-white transition-transform duration-150">
      <div className="flex h-16 items-center justify-around px-10">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-150 active:scale-95 ${
              isActive
                ? "bg-[#10b981] text-[#00422b]"
                : "text-[#3c4a42] hover:bg-[#eef6ee]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[25px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {item.icon}
            </span>
          </button>
        );
      })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
