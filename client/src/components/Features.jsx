import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Features = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="py-20 bg-[#f4fbf4]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#161d19] leading-tight">
            Tools for every stage.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-5 md:h-[600px]">

          {/* CARD 1 */}
          <motion.div
            ref={(el) => (cardsRef.current[0] = el)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="md:col-span-3 border border-[#d7e2dc] bg-white p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div>
              <motion.span
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="material-symbols-outlined text-[#006c49] text-4xl mb-5 inline-block"
              >
                dashboard
              </motion.span>

              <h3 className="text-2xl font-bold text-[#161d19]">
                Dashboard Analytics
              </h3>

              <p className="text-[#5c6b63] text-base leading-relaxed mt-3 max-w-md">
                Visualize your funnel from application to offer with precision
                charts.
              </p>
            </div>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            ref={(el) => (cardsRef.current[1] = el)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="md:col-span-3 border border-[#1f2a25] bg-[#161d19] p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div>
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="material-symbols-outlined text-[#10b981] text-4xl mb-5 inline-block"
              >
                description
              </motion.span>

              <h3 className="text-2xl font-bold text-white">
                Upload Resumes
              </h3>

              <p className="text-[#a8b5af] text-base leading-relaxed mt-3 max-w-md">
                Keep track of which version of your resume you sent to each
                employer.
              </p>
            </div>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            ref={(el) => (cardsRef.current[2] = el)}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="md:col-span-2 border border-[#d7e2dc] bg-white p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="material-symbols-outlined text-[#006c49] text-4xl mb-5 inline-block"
              >
                calendar_month
              </motion.span>

              <h3 className="text-2xl font-bold text-[#161d19]">
                Manage Interviews
              </h3>

              <p className="text-[#5c6b63] text-base leading-relaxed mt-3">
                Synced schedules and automated reminders.
              </p>
            </div>
          </motion.div>

          {/* CARD 4 */}
          <motion.div
            ref={(el) => (cardsRef.current[3] = el)}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
              scale: 1.01,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className="md:col-span-4 border border-[#b7ebce] bg-[#b7ebce] p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div>
              <motion.span
                animate={{
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="material-symbols-outlined text-[#006c49] text-4xl mb-5 inline-block"
              >
                task_alt
              </motion.span>

              <h3 className="text-2xl font-bold text-[#161d19]">
                Track Applications
              </h3>

              <p className="text-[#376850] text-base leading-relaxed mt-3 max-w-2xl">
                A powerful Kanban board designed specifically for the unique
                stages of a modern hiring process.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default Features;  