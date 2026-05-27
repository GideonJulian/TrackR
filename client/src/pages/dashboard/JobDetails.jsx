import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JOBS_ENDPOINT = "https://trackr-zpcz.onrender.com/api/v1/jobs";

const statusStyles = {
  Applied: "bg-[#eef6ee] text-[#3c4a42]",
  Interview: "bg-[#dff5e7] text-[#006c49]",
  Offer: "bg-[#006c49] text-white",
  Rejected: "bg-red-50 text-red-600",
};

const formatDate = (date) => {
  if (!date) return "Not set";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const getWorkMode = (job) => {
  const text = `${job.location || ""} ${job.notes || ""}`.toLowerCase();

  if (text.includes("hybrid")) return "Hybrid";
  if (text.includes("on-site") || text.includes("onsite")) return "On-site";
  if (text.includes("remote")) return "Remote";

  return job.location ? "Tracked" : "Not specified";
};

const DetailSkeleton = () => (
  <div className="mx-auto max-w-5xl space-y-6">
    <div className="rounded-xl border border-[#dde4dd] bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-lg bg-[#dde4dd]" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-32 animate-pulse rounded bg-[#dde4dd]" />
          <div className="h-8 w-72 animate-pulse rounded bg-[#dde4dd]" />
        </div>
      </div>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {[0, 1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-lg border border-[#dde4dd] bg-white p-5"
        >
          <div className="h-4 w-28 animate-pulse rounded bg-[#dde4dd]" />
          <div className="mt-3 h-6 w-40 animate-pulse rounded bg-[#dde4dd]" />
        </div>
      ))}
    </div>
  </div>
);

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login first");
        }

        const response = await fetch(`${JOBS_ENDPOINT}/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setJob(data.job);
          return;
        }

        const fallbackResponse = await fetch(JOBS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fallbackData = await fallbackResponse.json();

        if (!fallbackResponse.ok) {
          throw new Error(data.message || "Unable to fetch job details");
        }

        const foundJob = (fallbackData.jobs || fallbackData.applications || []).find(
          (item) => item._id === jobId
        );

        if (!foundJob) {
          throw new Error("Job not found");
        }

        setJob(foundJob);
      } catch (err) {
        setError(err.message || "Unable to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
        {error}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-[#dde4dd] bg-white p-8 text-center">
        <span className="material-symbols-outlined text-[48px] text-[#006c49]">
          work_off
        </span>
        <h2 className="mt-3 text-2xl font-bold text-[#161d19]">
          Job not found
        </h2>
        <p className="mt-2 text-[#3c4a42]">
          This job may have been removed or is no longer available.
        </p>
        <button
          onClick={() => navigate("/dashboard/applications")}
          className="mt-6 rounded-lg bg-[#006c49] px-5 py-3 text-sm font-bold text-white"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  const details = [
    {
      label: "Status",
      value: job.status === "Interview" ? "Interviewing" : job.status,
      icon: "flag",
    },
    {
      label: "Location",
      value: job.location || "Not specified",
      icon: "location_on",
    },
    {
      label: "Salary Range",
      value: job.salary || "Not specified",
      icon: "payments",
    },
    {
      label: "Work Type",
      value: getWorkMode(job),
      icon: "business_center",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="rounded-xl border border-[#dde4dd] bg-white p-5 md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#161d19] text-2xl font-black text-white">
              {job.company?.charAt(0)?.toUpperCase() || "J"}
            </div>

            <div className="min-w-0">
              <button
                onClick={() => navigate("/dashboard/applications")}
                className="mb-3 flex items-center gap-1 text-sm font-bold text-[#006c49]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_back
                </span>
                Applications
              </button>
              <p className="text-sm font-bold uppercase tracking-wider text-[#006c49]">
                {job.company || "Unknown company"}
              </p>
              <h1 className="mt-1 text-3xl font-bold leading-tight text-[#161d19] md:text-5xl">
                {job.role || "Untitled role"}
              </h1>
              <span
                className={`mt-4 inline-flex rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider ${
                  statusStyles[job.status] || statusStyles.Applied
                }`}
              >
                {job.status === "Interview" ? "Interviewing" : job.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() =>
                navigate("/dashboard/add-job", {
                  state: {
                    mode: "edit",
                    job,
                  },
                })
              }
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#006c49] px-5 text-sm font-bold text-white transition-colors hover:bg-[#00563a]"
            >
              <span className="material-symbols-outlined text-[20px]">
                edit
              </span>
              Edit
            </button>

            {job.jobLink && (
              <a
                href={job.jobLink}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#bbcabf] px-5 text-sm font-bold text-[#161d19] transition-colors hover:bg-[#eef6ee]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  open_in_new
                </span>
                Open Role
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {details.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-[#dde4dd] bg-white p-5"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded bg-[#eef6ee] text-[#006c49]">
              <span className="material-symbols-outlined text-[22px]">
                {item.icon}
              </span>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#3c4a42]">
              {item.label}
            </p>
            <p className="mt-2 font-semibold text-[#161d19]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-xl border border-[#dde4dd] bg-white p-5">
          <h2 className="text-xl font-bold text-[#161d19]">Notes</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#3c4a42]">
            {job.notes || "No notes added for this job yet."}
          </p>
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-[#dde4dd] bg-white p-5">
            <h2 className="text-xl font-bold text-[#161d19]">Timeline</h2>
            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dff5e7] text-[#006c49]">
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#161d19]">
                    Application added
                  </p>
                  <p className="text-sm text-[#3c4a42]">
                    {formatDate(job.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef6ee] text-[#3c4a42]">
                  <span className="material-symbols-outlined text-[18px]">
                    update
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#161d19]">
                    Last updated
                  </p>
                  <p className="text-sm text-[#3c4a42]">
                    {formatDate(job.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#dde4dd] bg-[#006c49] p-5 text-white">
            <p className="text-lg font-bold">Keep this role moving</p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Update status, add notes, and keep the next action visible.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default JobDetails;
