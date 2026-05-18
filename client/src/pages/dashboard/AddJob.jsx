import React, { useState } from "react";

/**
 * AddJob component is API-agnostic.
 * Pass onSubmit to connect any backend/API layer.
 * You can later replace or extend submitJob() with real API calls.
 */

export default function AddJob({ onSubmit }) {
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    notes: "",
    status: "Applied",
    dateApplied: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      createdAt: new Date().toISOString(),
    };

    if (onSubmit) {
      await onSubmit(payload);
    } else {
      // fallback API hook (replace anytime)
      await submitJob(payload);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-gutter pt-xxl">
      <div className="flex flex-col space-y-xl">
        {/* Title Section */}
        <div className="border-b border-[#bbcabf] pb-[64px]">
          <h3 className="heading-serif text-[48px] leading-[1.2] tracking-[0.02rem] font-bold text-[#006c49]">
            New Career Opportunity
          </h3>
          <p className="font-body-md text-[15px] leading-[1.5] font-[400] text-[#3c4a42] mt-[8px]">
            Enter the details of the position you're tracking to keep your
            career pipeline organized.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-[32px]"
        >
          {/* Left Column */}
          <div className="md:col-span-8 flex flex-col space-y-[32px]">
            <div className="bg-[white] border border-[#bbcabf] p-[32px] rounded-xl">
              <label className="block font-label-sm text-[13px] leading-[1.4] tracking-[0.01rem] font-[500]  text-[#3c4a42] mb-[4px]">
                Company Name
              </label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full bg-white border border-[#bbcabf] focus:border-primary px-[16px] py-[8px] text-[18px] font-body-lg outline-none transition-colors rounded"
                placeholder="e.g. Acme Corp"
                type="text"
              />
            </div>

            <div className="bg-white border border-[#bbcabf] p-[32px] rounded-xl flex-1">
              <label className="block font-label-sm text-[13px] leading-[1.4] tracking-[0.01rem] font-[500]  text-[#3c4a42] mb-[4px]">
                Role / Position
              </label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-white border border-[#bbcabf] focus:border-primary px-[16px] py-[8px] text-[18px] font-body-lg outline-none transition-colors rounded"
                placeholder="e.g. Senior Frontend Engineer"
                type="text"
              />
            </div>

            <div className=" bg-white border border-[#bbcabf]  p-[32px] rounded-xl flex-1">
              <label className="block font-label-sm text-[13px] leading-[1.4] tracking-[0.01rem] font-[500]  text-[#3c4a42] mb-[4px]">
                Notes & Details
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full h-64 bg-[#f4fbf4] border border-[#bbcabf] focus:border-primary px-[16px] py-[8px] text-[15px] font-body-md outline-none transition-colors resize-none rounded"
                placeholder="Add any specific requirements, recruiter names, or interview prep thoughts..."
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-4 flex flex-col space-y-[32px]">
            <div className="bg-[#e8f0e9] border border-[#bbcabf] p-[32px] rounded-xl">
              <label className="block font-label-sm text-[13px] leading-[1.4] tracking-[0.01rem] font-[500]  text-[#3c4a42] mb-[4px]">
                Application Status
              </label>

              {["Applied", "Interviewing", "Offer", "Rejected"].map((s) => (
                <label
                  key={s}
                  className="flex items-center space-x-[16px] p-[8px] hover:bg-[#dde4dd] rounded-lg cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={form.status === s}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary focus:ring-primary border-outline"
                  />
                  <span className="font-body-md text-body-md">{s}</span>
                </label>
              ))}
            </div>

            <div className="bg-[#e8f0e9] border border-[#bbcabf] p-[32px] rounded-xl">
              <label className="block font-label-sm text-[13px] leading-[1.4] tracking-[0.01rem] font-[500]  text-[#3c4a42] mb-[16px]">
                Date Applied
              </label>
              <input
                name="dateApplied"
                value={form.dateApplied}
                onChange={handleChange}
                className="w-full bg-[#f4fbf4] border border-[#bbcabf] focus:border-primary px-[16px] py-[8px] text-[15px] font-body-md outline-none transition-colors rounded"
                type="date"
              />
            </div>
            <div className="bg-[#b7ebce] p-[32px] rounded-xl text-[#3c6c54]">
              <div className="flex items-start space-x-[8px]">
                <span className="material-symbols-outlined text-[#376850] text-[20px]">
                  info
                </span>
                <p className="font-label-sm text-[13px] leading-[1.4] tracking-[0.01rem]">
                  Trackr will automatically calculate follow-up dates based on
                  your application timeline.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-[64px]">
              <button
                className="w-full bg-[#006c49] text-white py-[16px] rounded-xl font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center space-x-[8px] shadow-lg shadow-[#006c4933]"
                type="submit"
              >
                <span className="font-label-sm text-label-sm">
                  Save Application
                </span>
                <span class="material-symbols-outlined text-[16px]">
                  check_circle
                </span>
              </button>

              <button
                className="w-full bg-transparent text-on-surface-variant py-[16px] rounded-xl font-semibold mt-[16px] hover:bg-surface-container-high transition-all border border-outline-variant"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * API-ready placeholder function.
 * Replace with fetch/axios/service layer anytime.
 */
async function submitJob(data) {
  console.log("Submitting job:", data);
  // Example:
  // return fetch('/api/jobs', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });
}
