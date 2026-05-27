import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const JOBS_ENDPOINT = "https://trackr-zpcz.onrender.com/api/v1/jobs";

/**
 * SUCCESS / ERROR POPUP
 */
const StatusPopup = ({ show, type, message }) => {
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] animate-[fadeIn_.3s_ease]">
      <div
        className={`min-w-[320px] rounded-2xl shadow-2xl border px-5 py-4 backdrop-blur-xl flex items-start gap-4 ${
          type === "success"
            ? "bg-[#e8fff1] border-[#70d69d]"
            : "bg-[#fff0f0] border-[#ffb3b3]"
        }`}
      >
        {/* ICON */}
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center ${
            type === "success"
              ? "bg-[#006c49] text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span className="material-symbols-outlined">
            {type === "success" ? "check_circle" : "close"}
          </span>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <h3 className="font-bold text-[16px] text-[#161d19]">
            {type === "success" ? "Success" : "Error"}
          </h3>

          <p className="text-[14px] text-[#3c4a42] mt-1">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default function AddJob({ onSubmit }) {
  const location = useLocation();
  const navigate = useNavigate();
  const editingJob = location.state?.job || null;
  const isEditing = location.state?.mode === "edit" && editingJob?._id;

  /**
   * LOADING
   */
  const [loading, setLoading] = useState(false);

  /**
   * POPUP
   */
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  /**
   * FORM STATE
   */
  const [form, setForm] = useState({
    company: editingJob?.company || "",
    role: editingJob?.role || "",
    status: editingJob?.status || "Applied",
    location: editingJob?.location || "",
    salary: editingJob?.salary || "",
    jobLink: editingJob?.jobLink || "",
    notes: editingJob?.notes || "",
  });

  /**
   * SHOW POPUP
   */
  const showPopup = (message, type = "success") => {
    setPopup({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setPopup({
        show: false,
        type: "success",
        message: "",
      });
    }, 3000);
  };

  /**
   * HANDLE INPUTS
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * SUBMIT JOB
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      /**
       * GET TOKEN
       */
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first");
      }

      /**
       * API REQUEST
       */
      const response = await fetch(
        isEditing ? `${JOBS_ENDPOINT}/${editingJob._id}` : JOBS_ENDPOINT,
        {
          method: isEditing ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMGQ5NTY0ZTIzYzdlYzk1NDYzNDA3ZCIsImlhdCI6MTc3OTI3NTEwOCwiZXhwIjoxNzc5ODc5OTA4fQ.EKytyB3uMZWhr1UlQz8im858ihQQbaiCg94vSOx4g5A`,
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      console.log(data);

      /**
       * ERROR
       */
      if (!response.ok) {
        throw new Error(data.message);
      }

      /**
       * SUCCESS POPUP
       */
      showPopup(
        isEditing ? "Job updated successfully" : "Job added successfully",
        "success"
      );

      /**
       * RESET FORM
       */
      if (isEditing) {
        navigate(`/dashboard/applications/${data.job?._id || editingJob._id}`);
      } else {
        setForm({
          company: "",
          role: "",
          status: "Applied",
          location: "",
          salary: "",
          jobLink: "",
          notes: "",
        });
      }

      /**
       * OPTIONAL CALLBACK
       */
      if (onSubmit) {
        onSubmit(data);
      }
    } catch (error) {
      console.log(error);

      showPopup(error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-8 pb-24">
      {/* STATUS POPUP */}
      <StatusPopup
        show={popup.show}
        type={popup.type}
        message={popup.message}
      />

      <div className="flex flex-col space-y-8">
        {/* HEADER */}
        <div className="border-b border-[#bbcabf] pb-8">
          <h2 className="text-[38px] md:text-[48px] leading-[1.1] font-black text-[#006c49] tracking-tight">
            {isEditing ? "Edit Career Opportunity" : "New Career Opportunity"}
          </h2>

          <p className="text-[15px] md:text-[16px] text-[#3c4a42] mt-3 max-w-2xl">
            {isEditing
              ? "Update the details for this role and keep your pipeline current."
              : "Track a new application and manage your career journey smarter with Trackr."}
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start"
        >
          {/* LEFT SIDE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* COMPANY */}
            <div className="bg-white border border-[#d8e2da] p-6 rounded-lg shadow-sm">
              <label className="block text-[13px] font-semibold text-[#3c4a42] mb-3">
                Company Name
              </label>

              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                type="text"
                required
                placeholder="e.g Google"
                className="w-full bg-[#f8fbf8] border border-[#c7d4ca] px-4 py-3 rounded-lg outline-none focus:border-[#006c49] focus:ring-4 focus:ring-[#006c4920] transition-all"
              />
            </div>

            {/* ROLE */}
            <div className="bg-white border border-[#d8e2da] p-6 rounded-lg shadow-sm">
              <label className="block text-[13px] font-semibold text-[#3c4a42] mb-3">
                Role / Position
              </label>

              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                type="text"
                required
                placeholder="Frontend Developer"
                className="w-full bg-[#f8fbf8] border border-[#c7d4ca] px-4 py-3 rounded-lg outline-none focus:border-[#006c49] focus:ring-4 focus:ring-[#006c4920] transition-all"
              />
            </div>

            {/* LOCATION */}
            <div className="bg-white border border-[#d8e2da] p-6 rounded-lg shadow-sm">
              <label className="block text-[13px] font-semibold text-[#3c4a42] mb-3">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                type="text"
                placeholder="Remote, Lagos, London..."
                className="w-full bg-[#f8fbf8] border border-[#c7d4ca] px-4 py-3 rounded-lg outline-none focus:border-[#006c49] focus:ring-4 focus:ring-[#006c4920] transition-all"
              />
            </div>

            {/* SALARY */}
            <div className="bg-white border border-[#d8e2da] p-6 rounded-lg shadow-sm">
              <label className="block text-[13px] font-semibold text-[#3c4a42] mb-3">
                Salary
              </label>

              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                type="text"
                placeholder="$80k - $120k"
                className="w-full bg-[#f8fbf8] border border-[#c7d4ca] px-4 py-3 rounded-lg outline-none focus:border-[#006c49] focus:ring-4 focus:ring-[#006c4920] transition-all"
              />
            </div>

            {/* JOB LINK */}
            <div className="bg-white border border-[#d8e2da] p-6 rounded-lg shadow-sm lg:col-span-2">
              <label className="block text-[13px] font-semibold text-[#3c4a42] mb-3">
                Job Link
              </label>

              <input
                name="jobLink"
                value={form.jobLink}
                onChange={handleChange}
                type="url"
                placeholder="https://..."
                className="w-full bg-[#f8fbf8] border border-[#c7d4ca] px-4 py-3 rounded-lg outline-none focus:border-[#006c49] focus:ring-4 focus:ring-[#006c4920] transition-all"
              />
            </div>

            {/* NOTES */}
            <div className="bg-white border border-[#d8e2da] p-6 rounded-lg shadow-sm lg:col-span-2">
              <label className="block text-[13px] font-semibold text-[#3c4a42] mb-3">
                Notes & Details
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Interview notes, recruiter info..."
                className="w-full h-44 bg-[#f8fbf8] border border-[#c7d4ca] px-4 py-3 rounded-lg outline-none resize-none focus:border-[#006c49] focus:ring-4 focus:ring-[#006c4920] transition-all"
              />
            </div>

            {/* INFO CARD */}
            <div className="bg-[#dff5e7] border border-[#b6dfc2] p-6 rounded-lg lg:col-span-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006c49]">
                  tips_and_updates
                </span>

                <p className="text-[14px] leading-[1.6] text-[#376850]">
                  Keep your applications updated regularly so Trackr can help
                  you monitor progress.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="bg-[#eef6ee] border border-[#d8e2da] p-6 rounded-lg">
              <label className="block text-[13px] font-semibold text-[#3c4a42] mb-4">
                Application Status
              </label>

              <div className="grid grid-cols-1 gap-3">
                {["Applied", "Interview", "Offer", "Rejected"].map((s) => (
                  <label
                    key={s}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#dde4dd] transition-all cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={form.status === s}
                      onChange={handleChange}
                    />

                    <span className="font-medium text-[#161d19]">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-4">
              {/* SAVE */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-3 shadow-lg ${
                  loading
                    ? "bg-gray-300 text-black cursor-not-allowed"
                    : "bg-[#006c49] text-white hover:bg-[#00563b]"
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    {isEditing ? "Update Application" : "Save Application"}
                    <span className="material-symbols-outlined text-[20px]">
                      check_circle
                    </span>
                  </>
                )}
              </button>

              {/* CANCEL */}
              <button
                type="button"
                className="w-full border border-[#c7d4ca] py-4 rounded-lg font-semibold hover:bg-[#eef6ee] transition-all"
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
