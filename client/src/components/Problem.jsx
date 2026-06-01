// ProblemSection.jsx

import { motion } from "framer-motion";

const problemCards = [
  {
    icon: "event_busy",
    title: "Missed Deadlines",
    body: "Losing track of interview times and follow-up windows because of fragmented data.",
  },
  {
    icon: "folder_off",
    title: "Information Silos",
    body: "Job descriptions, resume versions, and contact info scattered across multiple tabs.",
  },
  {
    icon: "psychology",
    title: "Mental Fatigue",
    body: "The cognitive load of managing dozens of simultaneous conversations manually.",
  },
];

export default function ProblemSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="bg-[#eef6ee] py-[128px]"
    >
      <div className="max-w-7xl mx-auto px-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="text-[32px] font-display leading-[1.2] font-[700] tracking-[0.01em] text-[#161d19] mb-md">
            The job search is messy
          </h2>

          <p className="font-[400] text-[18px] leading-[1.6] text-[#3c4a42]">
            Spreadsheets are rigid. Email threads get lost. Most job seekers
            lose track of 40% of their applications simply due to poor
            organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[64px] mt-[64px]">
          {problemCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="p-[32px] border border-[#bbcabf] bg-[#f4fbf4] flex flex-col gap-[8px]"
            >
              <span className="material-symbols-outlined text-[#a43a3a] text-3xl">
                {card.icon}
              </span>

              <h3 className="text-[24px] font-display leading-[1.2] font-[700] tracking-[0.01em] text-[#161d19] mb-md">
                {card.title}
              </h3>

              <p className="font-[400] text-[16px] leading-[1.6] text-[#3c4a42]">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
