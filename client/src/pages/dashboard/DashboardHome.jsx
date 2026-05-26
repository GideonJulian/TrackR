import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  Applied: "bg-[#eef6ee] text-[#3c4a42]",
  Interview: "bg-[#dff5e7] text-[#006c49]",
  Offer: "bg-[#006c49] text-white",
  Rejected: "bg-red-50 text-red-600",
};

const mobileStatusStyles = {
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

const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-[#dde4dd] ${className}`} />
);

const DashboardLoading = () => (
  <div className="mx-auto max-w-7xl md:space-y-8 md:pt-2">
    <div className="space-y-7 md:hidden">
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <SkeletonBlock className="h-8 w-40" />
          <SkeletonBlock className="h-4 w-20" />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#006c49] bg-[#006c49] p-5 shadow-sm">
          <div className="space-y-3">
            <SkeletonBlock className="h-3 w-32 bg-white/25" />
            <SkeletonBlock className="h-12 w-20 bg-white/25" />
          </div>
          <SkeletonBlock className="h-16 w-16 rounded-lg bg-white/15" />
        </div>

        <div className="-mx-4 overflow-hidden px-4">
          <div className="flex gap-3">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="min-w-[78%] rounded-xl border border-[#dde4dd] bg-[#f8fbf8] p-4"
              >
                <div className="mb-6 flex items-center justify-between">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="h-8 w-8 rounded-full" />
                </div>
                <SkeletonBlock className="h-10 w-14" />
                <SkeletonBlock className="mt-3 h-4 w-36" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#dde4dd] pb-2">
          <SkeletonBlock className="h-8 w-36" />
          <SkeletonBlock className="h-4 w-14" />
        </div>
        <SkeletonBlock className="h-14 w-full rounded-full" />
        <div className="space-y-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-[#dde4dd] bg-white p-4"
            >
              <SkeletonBlock className="h-12 w-12 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-4/5" />
                <SkeletonBlock className="h-3 w-2/5" />
              </div>
              <SkeletonBlock className="h-6 w-16" />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#dde4dd] pb-2">
          <SkeletonBlock className="h-8 w-40" />
          <SkeletonBlock className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-4 rounded-lg border border-[#dde4dd] bg-white p-4">
          <SkeletonBlock className="h-12 w-12 shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-4 w-3/5" />
            <SkeletonBlock className="h-3 w-2/5" />
          </div>
        </div>
      </section>
    </div>

    <div className="hidden md:block">
      <section>
        <SkeletonBlock className="h-12 w-80" />
        <SkeletonBlock className="mt-3 h-5 w-96" />
      </section>

      <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-[#dde4dd] bg-white p-5"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <SkeletonBlock className="h-12 w-12" />
              <SkeletonBlock className="h-4 w-24" />
            </div>
            <SkeletonBlock className="h-3 w-28" />
            <SkeletonBlock className="mt-3 h-10 w-16" />
          </div>
        ))}
      </section>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="overflow-hidden rounded-xl border border-[#dde4dd] bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#dde4dd] p-5">
            <SkeletonBlock className="h-6 w-48" />
            <SkeletonBlock className="h-4 w-16" />
          </div>
          <div className="space-y-0 divide-y divide-[#dde4dd]">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="grid grid-cols-4 gap-5 p-5">
                <SkeletonBlock className="h-5 w-full" />
                <SkeletonBlock className="h-5 w-full" />
                <SkeletonBlock className="h-5 w-20" />
                <SkeletonBlock className="h-5 w-24" />
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[#dde4dd] bg-white p-5"
            >
              <SkeletonBlock className="h-6 w-36" />
              <div className="mt-5 flex items-center gap-4">
                <SkeletonBlock className="h-12 w-12 shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonBlock className="h-4 w-4/5" />
                  <SkeletonBlock className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [activeResume, setActiveResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login first");
        }

        const savedResume =
          JSON.parse(localStorage.getItem("activeResume") || "null") ||
          JSON.parse(localStorage.getItem("resume") || "null");

        setActiveResume(savedResume);

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [userResponse, jobsResponse] = await Promise.all([
          fetch("http://localhost:4000/api/v1/user/me", { headers }),
          fetch("http://localhost:4000/api/v1/jobs", { headers }),
        ]);

        const userData = await userResponse.json();
        const jobsData = await jobsResponse.json();

        if (!userResponse.ok) {
          throw new Error(userData.message || "Unable to fetch user data");
        }

        if (!jobsResponse.ok) {
          throw new Error(jobsData.message || "Unable to fetch jobs");
        }

        setUser(userData.user);
        setJobs(jobsData.jobs || []);
        localStorage.setItem("user", JSON.stringify(userData.user));
      } catch (err) {
        setError(err.message || "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const firstName = user?.name?.split(" ")[0] || "there";
  const hasApplications = jobs.length > 0;

  const summary = useMemo(() => {
    const countByStatus = (status) =>
      jobs.filter((job) => job.status === status).length;

    return [
      {
        label: "Total Applications",
        value: jobs.length,
        note: jobs.length ? "All tracked roles" : "No jobs yet",
        icon: "assignment",
      },
      {
        label: "Interviews",
        value: countByStatus("Interview"),
        note: "Active interview stage",
        icon: "event",
      },
      {
        label: "Offers",
        value: countByStatus("Offer"),
        note: "Offers received",
        icon: "card_membership",
      },
      {
        label: "Rejected",
        value: countByStatus("Rejected"),
        note: "Closed applications",
        icon: "cancel",
      },
    ];
  }, [jobs]);

  const recentJobs = jobs.slice(0, 5);
  const filteredRecentJobs = recentJobs.filter((job) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return true;

    return [job.company, job.role, job.status]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });
  const interviewJobs = jobs.filter((job) => job.status === "Interview").slice(0, 2);
  const greeting = new Date().getHours() < 12 ? "Good morning" : "Welcome back";
  const totalApplications = summary[0];
  const mobileCarouselStats = summary.filter((item) =>
    ["Interviews", "Offers", "Rejected"].includes(item.label)
  );

  const getJobIcon = (job) => {
    const icons = ["token", "layers", "database", "terminal", "work"];
    const source = `${job.company || ""}${job.role || ""}`;
    const index = source
      .split("")
      .reduce((total, char) => total + char.charCodeAt(0), 0);

    return icons[index % icons.length];
  };

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="mx-auto max-w-7xl md:space-y-8 md:pt-2">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="md:hidden">
        {!hasApplications ? (
          <section className="rounded-3xl border border-[#dde4dd] bg-white p-6 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#eef6ee]">
              <span className="material-symbols-outlined text-[48px] text-[#006c49]">
                work
              </span>
            </div>

            <h2 className="text-3xl font-bold text-[#161d19]">
              No applications yet
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-[16px] leading-7 text-[#3c4a42]">
              Start tracking your job applications, interviews, and offers in
              one clean workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => navigate("/dashboard/add-job")}
                className="h-12 rounded-xl bg-[#006c49] px-6 font-semibold text-white transition-all hover:bg-[#00563a]"
              >
                Add Your First Job
              </button>

              <button
                onClick={() => navigate("/dashboard/profile")}
                className="h-12 rounded-xl border border-[#bbcabf] px-6 font-semibold text-[#161d19] transition-all hover:bg-[#f4fbf4]"
              >
                Setup Profile
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 text-left">
              <div className="rounded-2xl border border-[#dde4dd] bg-[#f8fbf8] p-4">
                <span className="material-symbols-outlined text-[28px] text-[#006c49]">
                  task_alt
                </span>
                <h3 className="mt-2 font-bold text-[#161d19]">
                  Track Applications
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#3c4a42]">
                  Organize every role you apply for.
                </p>
              </div>

              <div className="rounded-2xl border border-[#dde4dd] bg-[#f8fbf8] p-4">
                <span className="material-symbols-outlined text-[28px] text-[#006c49]">
                  event_available
                </span>
                <h3 className="mt-2 font-bold text-[#161d19]">
                  Manage Interviews
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#3c4a42]">
                  Keep upcoming interview stages in view.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold leading-tight text-[#161d19]">
              Your Activity
            </h2>
            <span className="text-sm font-semibold text-[#3c4a42]">
              Last 30 days
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[#006c49] bg-[#006c49] p-5 text-white shadow-sm">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                {totalApplications.label}
              </p>
              <p className="text-5xl font-black leading-none">
                {totalApplications.value}
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <span className="material-symbols-outlined text-[32px]">
                trending_up
              </span>
            </div>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex snap-x snap-mandatory gap-3 pb-1">
              {mobileCarouselStats.map((item) => (
                <div
                  key={item.label}
                  className="min-w-[78%] snap-start rounded-xl border border-[#dde4dd] bg-[#f8fbf8] p-4"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#3c4a42]">
                      {item.label}
                    </p>
                    <span className="material-symbols-outlined text-[#006c49]">
                      {item.icon}
                    </span>
                  </div>
                  <p className="text-4xl font-black text-[#161d19]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-[#3c4a42]">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1.5">
            {mobileCarouselStats.map((item, index) => (
              <span
                key={item.label}
                className={`h-1.5 rounded-full ${
                  index === 0 ? "w-5 bg-[#006c49]" : "w-1.5 bg-[#bbcabf]"
                }`}
              />
            ))}
          </div>
        </section>

        <section className="mt-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[#dde4dd] pb-2">
            <h2 className="text-2xl font-bold leading-tight text-[#161d19]">
              Recent Apps
            </h2>
            <button
              onClick={() => navigate("/dashboard/applications")}
              className="text-sm font-bold text-[#006c49] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="material-symbols-outlined text-[#3c4a42]">
                search
              </span>
            </div>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-full border border-[#dde4dd] bg-[#eef6ee] py-4 pl-12 pr-20 text-sm text-[#161d19] outline-none transition-all placeholder:text-[#3c4a42]/60 focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
              placeholder="Search applications..."
              type="text"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="rounded border border-[#dde4dd] bg-[#f8fbf8] px-2 py-1 font-mono text-[10px] text-[#3c4a42]">
                Ctrl K
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {filteredRecentJobs.length ? (
              filteredRecentJobs.map((job) => (
                <div
                  key={job._id}
                  className="flex items-center gap-3 rounded-lg border border-[#dde4dd] bg-white p-4 transition-colors hover:bg-[#f8fbf8]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dde4dd] bg-[#eef6ee] text-[#006c49]">
                    <span className="material-symbols-outlined">
                      {getJobIcon(job)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-serif text-base font-semibold text-[#161d19]">
                      {job.role || "Untitled role"}
                    </h3>
                    <p className="truncate text-sm text-[#3c4a42]">
                      {job.company || "Unknown company"}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded px-2 py-1 text-xs font-bold ${
                      mobileStatusStyles[job.status] ||
                      mobileStatusStyles.Applied
                    }`}
                  >
                    {job.status || "Applied"}
                  </span>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-[#bbcabf] bg-white p-5 text-center text-sm leading-6 text-[#3c4a42]">
                {hasApplications
                  ? "No recent applications match your search."
                  : "No applications yet. Add your first job to start tracking."}
              </div>
            )}
          </div>
        </section>

        <section className="mt-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[#dde4dd] pb-2">
            <h2 className="text-2xl font-bold leading-tight text-[#161d19]">
              Active Resume
            </h2>
            <button
              onClick={() => navigate("/dashboard/resumes")}
              className="text-sm font-bold text-[#006c49] hover:underline"
            >
              Manage
            </button>
          </div>

          {activeResume ? (
            <div className="flex items-center gap-4 rounded-lg border border-[#dde4dd] bg-white p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#dde4dd] bg-[#eef6ee] text-[#006c49]">
                <span className="material-symbols-outlined text-[28px]">
                  picture_as_pdf
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#161d19]">
                  {activeResume.name || "Uploaded resume"}
                </p>
                <p className="text-sm text-[#3c4a42]">
                  Ready for applications
                </p>
              </div>
              <span className="material-symbols-outlined text-[#3c4a42]">
                chevron_right
              </span>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-[#bbcabf] bg-white p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef6ee] text-[#006c49]">
                  <span className="material-symbols-outlined text-[28px]">
                    article
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#161d19]">
                    No resume uploaded
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#3c4a42]">
                    Upload a resume to keep your materials close to your job
                    tracker.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/dashboard/resumes")}
                className="mt-4 w-full rounded-lg border border-[#006c49] py-3 text-sm font-bold text-[#006c49] transition-colors hover:bg-[#eef6ee]"
              >
                Upload Resume
              </button>
            </div>
          )}
        </section>

        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#006c49] text-white shadow-lg transition-all hover:scale-105 active:scale-95"
          aria-label="Add job"
        >
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>
          </>
        )}
      </div>

      <div className="hidden md:block">
      <section>
        <h1 className="text-3xl md:text-[45px] leading-tight font-bold text-[#161d19]">
          {greeting}, {firstName}
        </h1>
        <p className="mt-2 text-base md:text-lg leading-7 text-[#3c4a42]">
          Here's what's happening with your job search today.
        </p>
      </section>

      {!hasApplications ? (
        <div className="mt-10 bg-white border border-[#dde4dd] rounded-3xl p-8 md:p-12 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-3xl bg-[#eef6ee] flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[#006c49] text-[48px]">
              work
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#161d19]">
            No applications yet
          </h2>

          <p className="max-w-md mt-3 text-[#3c4a42] text-[16px] leading-7">
            Start tracking your job applications, interviews, and offers in one
            clean workspace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <button
              onClick={() => navigate("/dashboard/add-job")}
              className="h-12 px-6 rounded-xl bg-[#006c49] hover:bg-[#00563a] text-white font-semibold transition-all"
            >
              Add Your First Job
            </button>

            <button
              onClick={() => navigate("/dashboard/profile")}
              className="h-12 px-6 rounded-xl border border-[#bbcabf] hover:bg-[#f4fbf4] text-[#161d19] font-semibold transition-all"
            >
              Setup Profile
            </button>
          </div>
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {summary.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#dde4dd] bg-white p-5 transition-colors hover:bg-[#f8fbf8]"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="rounded-lg bg-[#eef6ee] p-3 text-[#006c49]">
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#006c49]">
                    {item.note}
                  </span>
                </div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#3c4a42]">
                  {item.label}
                </h2>
                <p className="mt-2 text-4xl font-black text-[#161d19]">
                  {item.value}
                </p>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <section className="overflow-hidden rounded-xl border border-[#dde4dd] bg-white lg:col-span-2">
              <div className="flex items-center justify-between border-b border-[#dde4dd] p-5">
                <h2 className="text-xl font-bold text-[#006c49]">
                  Recent Applications
                </h2>
                <button
                  onClick={() => navigate("/dashboard/applications")}
                  className="text-sm font-semibold text-[#006c49] hover:underline"
                >
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left">
                  <thead className="border-b border-[#dde4dd] bg-[#f8fbf8]">
                    <tr>
                      <th className="px-5 py-4 text-sm font-semibold text-[#3c4a42]">
                        Company
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold text-[#3c4a42]">
                        Role
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold text-[#3c4a42]">
                        Status
                      </th>
                      <th className="px-5 py-4 text-sm font-semibold text-[#3c4a42]">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dde4dd]">
                    {recentJobs.map((job) => (
                      <tr
                        key={job._id}
                        className="transition-colors hover:bg-[#f8fbf8]"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded border border-[#dde4dd] bg-[#eef6ee] text-sm font-bold text-[#006c49]">
                              {job.company?.charAt(0)?.toUpperCase() || "J"}
                            </div>
                            <span className="font-semibold text-[#161d19]">
                              {job.company}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[#161d19]">
                          {job.role}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              statusStyles[job.status] || statusStyles.Applied
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[#3c4a42]">
                          {formatDate(job.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-xl border border-[#dde4dd] bg-white p-5">
                <h2 className="mb-4 text-xl font-bold text-[#006c49]">
                  Active Resume
                </h2>

                {activeResume ? (
                  <div className="flex items-center gap-4 rounded-lg border border-[#dde4dd] bg-[#f8fbf8] p-4">
                    <span className="material-symbols-outlined text-3xl text-[#006c49]">
                      picture_as_pdf
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#161d19]">
                        {activeResume.name || "Uploaded resume"}
                      </p>
                      <p className="text-sm text-[#3c4a42]">
                        Ready for applications
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-[#bbcabf] bg-[#f8fbf8] p-4">
                    <p className="font-semibold text-[#161d19]">
                      No resume uploaded
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#3c4a42]">
                      Upload a resume to keep your application materials close
                      to your job tracker.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => navigate("/dashboard/resumes")}
                  className="mt-4 w-full rounded-lg border border-[#006c49] py-2 text-sm font-semibold text-[#006c49] transition-colors hover:bg-[#eef6ee]"
                >
                  Manage Resumes
                </button>
              </div>

              <div className="rounded-xl border border-[#dde4dd] bg-white p-5">
                <h2 className="mb-4 text-xl font-bold text-[#006c49]">
                  Interviews
                </h2>

                {interviewJobs.length ? (
                  <div className="space-y-4">
                    {interviewJobs.map((job) => (
                      <div key={job._id} className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded border border-[#dde4dd] bg-[#eef6ee] text-[#006c49]">
                          <span className="material-symbols-outlined">
                            event
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#161d19]">
                            {job.company}
                          </p>
                          <p className="text-sm text-[#3c4a42]">{job.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-[#3c4a42]">
                    No interviews tracked yet.
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-[#dde4dd] bg-[#006c49] p-5 text-white">
                <p className="text-xl font-bold">Stay Focused</p>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Track your progress and keep each opportunity moving forward.
                </p>
              </div>
            </aside>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default DashboardHome;
