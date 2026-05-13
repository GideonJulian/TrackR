import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const quoteVariants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    rotate: -15,
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Testimonials = () => {
  return (
    <section className="py-20 border-t border-[#d7e2dc] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >

          {/* TESTIMONIAL 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
            className="bg-[#f8fbf9] border border-[#d7e2dc] rounded-3xl p-8 lg:p-10 hover:shadow-xl transition-all duration-300"
          >

            <motion.span
              variants={quoteVariants}
              className="material-symbols-outlined text-[#006c49] text-5xl mb-6 block"
            >
              format_quote
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-2xl lg:text-3xl leading-[1.4] font-semibold text-[#161d19]"
            >
              "Trackr completely changed how I approach my job search. I went
              from feeling overwhelmed to having a clear strategy. Secured 3
              offers in 2 weeks."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mt-8"
            >

              <motion.div
                whileHover={{ scale: 1.08 }}
                className="w-14 h-14 rounded-full overflow-hidden border border-[#d7e2dc] shrink-0"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvB_pYp_4_qy4_h4Vb9pgvAMAbKehOfd9tToiCBnd-80X5PQ7_CAh67_pT_sjhbJAhpbOEM7eDSeF7BaN7-N37z0cyAvD2ZrAk6areBJDaTCB-yMOtXzHRKIkj6__7D9dfhtjwNBtX5ajr8LscuxQeJhDeXnjw_P9kBDL1PZHeHXcPpmQQ1RwlBgUzN7t4BTEX9q5spUYSby97YIGPR96m5Bf-sKcDcApWNz_Zx4OYLVQL5Z_z8ur9Ips-Ifr7l3zGqet8XTmaeP4S"
                  alt="James Wilson"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div>
                <div className="font-bold text-[#161d19] text-base">
                  James Wilson
                </div>

                <div className="text-[#5c6b63] text-sm">
                  Senior Product Designer
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* TESTIMONIAL 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
            className="bg-[#161d19] border border-[#1f2a25] rounded-3xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300"
          >

            <motion.span
              variants={quoteVariants}
              className="material-symbols-outlined text-[#10b981] text-5xl mb-6 block"
            >
              format_quote
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-2xl lg:text-3xl leading-[1.4] font-semibold text-white"
            >
              "The cleanest interface I've used for productivity. It feels less
              like a chore and more like a high-performance workspace for my
              career."
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mt-8"
            >

              <motion.div
                whileHover={{ scale: 1.08 }}
                className="w-14 h-14 rounded-full overflow-hidden border border-[#2f3d37] shrink-0"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADuZfM1vD0d4Z-gD9DHXVIihPwGXG5kQL6vbuGEqD8mY45QTmPe-oF0Gv3DLuK-YaSqRr_mFPotVe2NgMSp1HK6uy2yRvLW2dCb1W6wrxCFQT51-mOQLjoPLYAtTJdi1p-_mCbQdaJLSdjA95VzZxgp5Kk4nRl1IH4yVy-Kgyj3-Cz4fOx_n1tL6x8lBO6GAqF31966NApHai6u1m6rAISCHIObTwslVxSTMGPMOvXfk-fmYGDIYeGamJre0k_YGiCMhFfbV3tUqlj"
                  alt="Elena Rodriguez"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div>
                <div className="font-bold text-white text-base">
                  Elena Rodriguez
                </div>

                <div className="text-[#a8b5af] text-sm">
                  Marketing Lead
                </div>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;