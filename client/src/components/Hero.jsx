// Hero.jsx

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

import users1 from "../../public/users1.png";
import users2 from "../../public/users2.png";
import users3 from "../../public/users3.png";

const Hero = () => {
  const phoneRef = useRef(null);

  useEffect(() => {
    gsap.to(phoneRef.current, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-margin py-12 lg:py-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
    >
      {/* LEFT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="flex flex-col items-start gap-5 text-center lg:text-left"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs sm:text-sm font-semibold text-[#006c49] tracking-widest uppercase"
        >
          THE SMART JOB TRACKER
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl sm:text-4xl lg:text-[40px] leading-tight font-black text-[#161d19] max-w-lg"
        >
          Track every application. Land your dream job.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg leading-relaxed text-[#161d19] max-w-md"
        >
          Trackr helps organize job applications, monitor progress, and never
          miss an opportunity with professional-grade precision.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-[#006c49] text-white cursor-pointer px-6 sm:px-10 py-3 rounded-lg font-semibold text-sm sm:text-base hover:brightness-90 transition-all w-full sm:w-auto"
          >
            Get Started Free
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-white border border-gray-300 text-black cursor-pointer px-6 sm:px-10 py-3 rounded-lg font-semibold text-sm sm:text-base hover:brightness-90 transition-all w-full sm:w-auto"
          >
            See how it works
          </motion.button>
        </motion.div>

        {/* USERS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 mt-6 justify-center lg:justify-start"
        >
          <div className="flex -space-x-2">
            <motion.img
              whileHover={{ y: -4 }}
              src={users1}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border-2 border-white"
            />
            <motion.img
              whileHover={{ y: -4 }}
              src={users2}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border-2 border-white"
            />
            <motion.img
              whileHover={{ y: -4 }}
              src={users3}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-md border-2 border-white"
            />
          </div>

          <span className="text-sm sm:text-base text-black font-normal">
            Loved by 1,000+ Job Seekers
          </span>
        </motion.div>
      </motion.div>

      {/* RIGHT SECTION */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative flex justify-center lg:justify-end"
      >
        <div className="bg-[#10b981] w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[450px] aspect-[4/5] rounded-[40px] sm:rounded-[48px] flex items-center justify-center p-6 sm:p-xl [perspective:1000px]">
          {/* PHONE */}
          <motion.div
            ref={phoneRef}
            whileHover={{
              rotateY: -8,
              rotateX: 4,
              scale: 1.02,
            }}
            className="bg-[#161d19] w-[220px] sm:w-[250px] lg:w-[270px] h-[460px] sm:h-[520px] lg:h-[550px] rounded-[36px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-[#161d19] overflow-hidden shadow-2xl shadow-[20px_40px_60px_-15px_rgba(0,0,0,0.5)] [transform:rotateY(-14deg)_rotateX(6deg)] transition-transform duration-300"
          >
            <div className="bg-[#f4fbf4] h-full w-full p-4 flex flex-col gap-4">
              {/* <div className="bg-[#161d19] w-[220px] sm:w-[250px] lg:w-[270px] h-[460px] sm:h-[520px] lg:h-[550px] rounded-[36px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-[#161d19] overflow-hidden shadow-2xl animate-float-3d shadow-[20px_40px_60px_-15px_rgba(0,0,0,0.5)] [transform:rotateY(-14deg)_rotateX(6deg)] transition-transform duration-300 hover:[transform:rotateY(-8deg)_rotateX(4deg)]"> */}
                {" "}
                <div className="bg-[#f4fbf4] h-full w-full p-4 flex flex-col gap-4">
                  {" "}
                  {/* TOP BAR */}{" "}
                  <div className="flex justify-between items-center">
                    {" "}
                    <span className="material-symbols-outlined text-[#006c49]">
                      {" "}
                      analytics{" "}
                    </span>{" "}
                    <div className="w-7 h-7 rounded-full bg-[#e8f0e9]" />{" "}
                  </div>{" "}
                  {/* STATS */}{" "}
                  <div className="space-y-2">
                    {" "}
                    <div className="h-3 bg-gray-200 w-1/2 rounded-md" />{" "}
                    <div className="grid grid-cols-2 gap-2">
                      {" "}
                      <div className="bg-[#10b98133] p-2 rounded-lg border border-[#10b981]">
                        {" "}
                        <h1 className="text-[10px] text-[#006c49] font-bold">
                          {" "}
                          ACTIVE{" "}
                        </h1>{" "}
                        <div className="text-base font-bold text-[#161d19]">
                          {" "}
                          24{" "}
                        </div>{" "}
                      </div>{" "}
                      <div className="bg-[#e8f0e9] p-2 rounded-lg border border-[#10b981]">
                        {" "}
                        <h1 className="text-[10px] text-[#3c4a42] font-bold">
                          {" "}
                          OFFERS{" "}
                        </h1>{" "}
                        <div className="text-base font-bold text-[#161d19]">
                          {" "}
                          3{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* LIST */}{" "}
                  <div className="mt-3 space-y-3 text-xs">
                    {" "}
                    {/* ITEM 1 */}{" "}
                    <div className="bg-white border border-[#bbcabf] py-3 px-2 rounded-lg flex items-center gap-2">
                      {" "}
                      <div className="w-9 h-9 bg-[#161d19] rounded-md flex items-center justify-center text-white text-xs font-bold">
                        {" "}
                        A{" "}
                      </div>{" "}
                      <div className="flex-1">
                        {" "}
                        <div className="text-xs font-bold">Apple Inc.</div>{" "}
                        <div className="text-[10px] text-[#3c4a42]">
                          {" "}
                          Product Designer{" "}
                        </div>{" "}
                      </div>{" "}
                      <span className="text-[10px] px-2 py-1 bg-[#b7ebce] text-[#3c6c54] rounded-full font-bold">
                        {" "}
                        Interview{" "}
                      </span>{" "}
                    </div>{" "}
                    {/* ITEM 2 */}{" "}
                    <div className="bg-white border border-[#bbcabf] py-3 px-2 rounded-lg flex items-center gap-2">
                      {" "}
                      <div className="w-9 h-9 bg-[#10b981] rounded-md flex items-center justify-center text-white text-xs font-bold">
                        {" "}
                        S{" "}
                      </div>{" "}
                      <div className="flex-1">
                        {" "}
                        <div className="text-xs font-bold">Stripe</div>{" "}
                        <div className="text-[10px] text-[#3c4a42]">
                          {" "}
                          UX Engineer{" "}
                        </div>{" "}
                      </div>{" "}
                      <span className="text-[10px] px-2 py-1 bg-[#e8f0e9] text-[#3c4a42] rounded-full font-bold">
                        {" "}
                        Applied{" "}
                      </span>{" "}
                    </div>{" "}
                    {/* ITEM 3 */}{" "}
                    <div className="bg-white border border-[#bbcabf] py-3 px-2 rounded-lg flex items-center gap-2">
                      {" "}
                      <div className="w-9 h-9 bg-[#376850] rounded-md flex items-center justify-center text-white text-xs font-bold">
                        {" "}
                        G{" "}
                      </div>{" "}
                      <div className="flex-1">
                        {" "}
                        <div className="text-xs font-bold">Google</div>{" "}
                        <div className="text-[10px] text-[#3c4a42]">
                          {" "}
                          Frontend Lead{" "}
                        </div>{" "}
                      </div>{" "}
                      <span className="text-[10px] px-2 py-1 bg-[#fc7c7833] text-[#a43a3a] rounded-full font-bold">
                        {" "}
                        Applied{" "}
                      </span>{" "}
                    </div>{" "}
                  </div>{" "}
                {/* </div>{" "} */}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
