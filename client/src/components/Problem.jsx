// ProblemSection.jsx
// "The job search is messy" — three pain-point cards

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
    <section className="bg-[#eef6ee] py-[128px]">
      <div className="max-w-7xl mx-auto px-[40px]">
        <div className="max-w-2xl">
          <h2 className="text-[32px] font-display leading-[1.2] font-[700] tracking-[0.01em]  text-[#161d19] mb-md">
            The job search is messy
          </h2>
          <p className="font-[400] text-[18px] leading-[1.6] text-[#3c4a42]">
            Three pain-point cards highlighting the challenges of a messy job
            search. Spreadsheets are rigid. Email threads get lost. Most job
            seekers lose track of 40% of their applications simply due to poor
            organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[64px] mt-[64px]">
          {problemCards.map((card, index) => (
            <div
              key={index}
              className="p-[32px] border border-[#bbcabf] bg-[#f4fbf4] flex flex-col gap-[8px]"
            >
              <span className="material-symbols-outlined text-[#a43a3a] text-3xl">{card.icon}</span>
              <h3 className="text-[24px] font-display leading-[1.2] font-[700] tracking-[0.01em]  text-[#161d19] mb-md">
                {card.title}
              </h3>
              <p className="font-[400] text-[16px] leading-[1.6] text-[#3c4a42]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
