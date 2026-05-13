import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const CTASection = () => {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Floating glow animation
    gsap.to(glowRef.current, {
      y: 30,
      x: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Entrance animation
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 lg:px-10 py-20"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-[#161d19] rounded-[32px] px-6 py-14 sm:px-10 lg:px-16 lg:py-20 flex flex-col items-center text-center"
      >
        {/* Background Glow */}
        <div
          ref={glowRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#10b981]/20 blur-3xl rounded-full pointer-events-none"
        />

        {/* Animated Gradient Blur */}
        <motion.div
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-120px] right-[-100px] w-[320px] h-[320px] bg-[#10b981]/10 blur-3xl rounded-full"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#10b9811f] text-[#10b981] px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase"
          >
            Start your journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="font-display text-[48px] leading-[1.1] tracking-[0.02rem] text-white"
          >
            Ready to land your dream role?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-[#a8b5af] text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            Join thousands of professionals who have optimized their career
            search with Trackr. Start your 14-day free trial today.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#006c49] hover:bg-[#00875a] text-white px-8 py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg"
            >
              Get Started Now
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              whileTap={{ scale: 0.97 }}
              className="border border-[#3b4b44] text-white hover:bg-white/5 px-8 py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300"
            >
              Contact Sales
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CTASection;