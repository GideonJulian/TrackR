import React from "react";

const AuthSidebar = () => {
  return (
    <section className="md:w-[45%] lg:w-[40%] bg-[#006c49] text-white p-6 sm:p-10 lg:p-xxl flex flex-col justify-between relative overflow-hidden min-h-[320px] md:min-h-screen">

      {/* Background Image Decor */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfJ2NfQTiCOgMUblCHYAgyotOHR72xjPKWBBHVrlYQMwwHje2LBKR6UqlIclvOMlxzxnRtG4J6OOEPx85obF1bF-QwhLWWJFzrWknjpWznqTD-c0Ydisc2zB5iAJI_Nu-TiZILSFeYEpQMUrpQ2Fxv4yi91FHIpAlE7epzAt8xEp-eeZSba8WpUkjOI24GHK91xrs3rTpUiHSbns1-H9Zp0W2UB-3nsKT2iDgV-r9BzAyBArkT7Pr_5VlVFIC-UWsOfKzb44fjvKeu"
        />
      </div>

      {/* TOP CONTENT */}
      <div className="relative z-10">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-10">
          <span className="material-symbols-outlined text-white text-3xl">
            track_changes
          </span>
          <span className="text-[24px] font-bold tracking-tight">
            Trackr
          </span>
        </div>

        {/* HEADLINE + FEATURES */}
        <div className="space-y-6 max-w-md">

          <h1 className="text-3xl md:text-4xl leading-tight font-bold">
            Manage your career journey with clarity
          </h1>

          <ul className="space-y-4">

            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-white mt-1">
                check_circle
              </span>
              <span className="text-white/90 text-base">
                Track job applications easily
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-white mt-1">
                check_circle
              </span>
              <span className="text-white/90 text-base">
                Never miss interview updates
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-white mt-1">
                check_circle
              </span>
              <span className="text-white/90 text-base">
                Manage resumes in one place
              </span>
            </li>

          </ul>
        </div>
      </div>

      {/* TRUSTED FOOTER */}
      <div className="relative z-10 mt-10 border-t border-white/20 pt-6 opacity-80">

        <p className="text-xs uppercase tracking-widest mb-4 text-white/70">
          Trusted by high-performance teams
        </p>

        <div className="flex gap-6 grayscale brightness-200">
          <span className="text-sm font-bold">STELLAR</span>
          <span className="text-sm font-bold">NEXUS</span>
          <span className="text-sm font-bold">QUANTUM</span>
        </div>

      </div>
    </section>
  );
};

export default AuthSidebar;