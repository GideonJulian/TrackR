import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import clarityImg from "../../public/clarity.png";

// "Engineered for clarity" — feature checklist on a tinted background

const features = [
  "Automatic tracking of status changes and follow-up alerts.",
  "Centralized document management for every single application.",
  "Real-time interview scheduling and prep note sync.",
];

export default function ClaritySection() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      {
        y: 30,
        opacity: 0,
        rotate: -2,
      },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-[128px] bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-[40px] flex flex-col md:flex-row items-center gap-[64px]">
        
        {/* IMAGE */}
        <motion.div
          className="flex-1 order-2 md:order-1"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            ref={imageRef}
            src={clarityImg}
            alt="Clarity Illustration"
            className="w-full rounded-xl border border-[#bbcabf]"
            whileHover={{
              scale: 1.02,
              rotate: -1,
              transition: { duration: 0.3 },
            }}
          />
        </motion.div>

        {/* TEXT CONTENT */}
        <motion.div
          className="flex-1 order-1 md:order-2 space-y-md"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-display text-[32px] leading-[1.2] text-[#161d19]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Engineered for clarity.
          </motion.h2>

          <p className="font-body-lg text-[18px] leading-[1.6] text-[#3c4a42]"></p>

          <ul className="space-y-sm pt-[16px]">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center mt-4 gap-[8px] font-label-sm text-[13px] leading-[1.3] tracking-[0.01rem] text-[#161d19]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                whileHover={{
                  x: 6,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.span
                  className="material-symbols-outlined text-[#10b981]"
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  check_circle
                </motion.span>

                <span className="text-[16px] text-[#3c4a42]">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}