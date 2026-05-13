import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../public/favicon.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
const navigate = useNavigate();
  return (
    <>
      {/* NAVBAR */}
      <div className="bg-[#f4fbf4] border-b fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-margin py-3 max-w-7xl mx-auto">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            {/* <img
              salt=""
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfJ2NfQTiCOgMUblCHYAgyotOHR72xjPKWBBHVrlYQMwwHje2LBKR6UqlIclvOMlxzxnRtG4J6OOEPx85obF1bF-QwhLWWJFzrWknjpWznqTD-c0Ydisc2zB5iAJI_Nu-TiZILSFeYEpQMUrpQ2Fxv4yi91FHIpAlE7epzAt8xEp-eeZSba8WpUkjOI24GHK91xrs3rTpUiHSbns1-H9Zp0W2UB-3nsKT2iDgV-r9BzAyBArkT7Pr_5VlVFIC-UWsOfKzb44fjvKeu"
              alt="TrackR Logo"
              className="w-8 h-8 sm:w-10 sm:h-10"
            /> */}
            <span className="material-symbols-outlined text-[#006c49] text-3xl">
              track_changes
            </span>

            <span className="text-[#161d19] font-black text-xl sm:text-2xl tracking-tight">
              Track<span className="text-[#006c49]">R</span>
            </span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-10">
            <Link className="text-sm text-gray-600 hover:text-[#006c49]">
              Features
            </Link>
            <Link className="text-sm text-gray-600 hover:text-[#006c49]">
              How it works
            </Link>
            <Link className="text-sm text-gray-600 hover:text-[#006c49]">
              Contact
            </Link>
          </div>

          {/* DESKTOP BUTTON */}
          <button 
          onClick={()=> navigate('/auth')}
          className="hidden md:block bg-[#006c49] text-white px-6 py-2 rounded-md font-semibold text-sm">
            Get Started
          </button>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col gap-1"
          >
            <span className="w-6 h-0.5 bg-[#161d19]" />
            <span className="w-6 h-0.5 bg-[#161d19]" />
            <span className="w-6 h-0.5 bg-[#161d19]" />
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* BOTTOM SHEET */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#f4fbf4] rounded-t-[28px] p-6 shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              {/* HANDLE */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

              {/* LINKS */}
              <div className="flex flex-col gap-5 text-center">
                <Link
                  onClick={() => setOpen(false)}
                  className="text-lg font-semibold text-[#161d19]"
                >
                  Features
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  className="text-lg font-semibold text-[#161d19]"
                >
                  How it works
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  className="text-lg font-semibold text-[#161d19]"
                >
                  Contact
                </Link>

                <button 
                  onClick={() => navigate('/auth')}
                  className="mt-4 bg-[#006c49] text-white py-3 rounded-xl font-semibold"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
