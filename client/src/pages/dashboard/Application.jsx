import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const APPLICATIONS_ENDPOINT = "https://trackr-zpcz.onrender.com/api/v1/jobs";

const columns = [
  {
    id: "all-jobs",
    label: "All Jobs",
    statuses: "all",
    icon: "work",
  },
  {
    id: "applied",
    label: "Applied",
    statuses: ["Applied"],
    icon: "send",
  },
  {
    id: "interviewing",
    label: "Interviewing",
    statuses: ["Interview"],
    icon: "calendar_today",
  },
  {
    id: "offers",
    label: "Offers",
    statuses: ["Offer"],
    icon: "workspace_premium",
  },
  {
    id: "rejected",
    label: "Rejected",
    statuses: ["Rejected"],
    icon: "block",
  },
];

const formatDate = (date) => {
  if (!date) return "No date";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

const getWorkMode = (job) => {
  const text = `${job.location || ""} ${job.notes || ""}`.toLowerCase();

  if (text.includes("hybrid")) return "Hybrid";
  if (text.includes("on-site") || text.includes("onsite")) return "On-site";
  if (text.includes("remote")) return "Remote";

  return job.location ? "Tracked" : "Open";
};

const getTag = (job) => {
  if (job.status === "Interview") return "Next Stage";
  if (job.status === "Offer") return "Pending";
  if (job.status === "Rejected") return "Closed";

  return getWorkMode(job);
};

const companyInitial = (company) => company?.charAt(0)?.toUpperCase() || "T";

const ApplicationLoading = () => (
  <div className="space-y-6">
    <section className="hidden md:block">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="h-10 w-72 animate-pulse rounded-lg bg-[#dde4dd]" />
          <div className="mt-3 h-5 w-96 animate-pulse rounded-lg bg-[#dde4dd]" />
        </div>
        <div className="h-11 w-64 animate-pulse rounded-lg bg-[#dde4dd]" />
      </div>
      <div className="flex gap-5 overflow-hidden">
        {[0, 1, 2, 3].map((column) => (
          <div key={column} className="w-[280px] shrink-0 space-y-4">
            <div className="h-8 animate-pulse rounded-lg bg-[#dde4dd]" />
            {[0, 1, 2].map((card) => (
              <div
                key={card}
                className="space-y-4 rounded-lg border border-[#dde4dd] bg-white p-4"
              >
                <div className="h-5 w-20 animate-pulse rounded bg-[#dde4dd]" />
                <div className="h-6 w-4/5 animate-pulse rounded bg-[#dde4dd]" />
                <div className="h-4 w-2/5 animate-pulse rounded bg-[#dde4dd]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-5 md:hidden">
      <div>
        <div className="h-9 w-44 animate-pulse rounded-lg bg-[#dde4dd]" />
        <div className="mt-2 h-4 w-60 animate-pulse rounded-lg bg-[#dde4dd]" />
      </div>
      <div className="-mx-4 flex gap-6 overflow-hidden px-4">
        {[0, 1, 2].map((tab) => (
          <div key={tab} className="h-8 w-28 shrink-0 animate-pulse rounded bg-[#dde4dd]" />
        ))}
      </div>
      {[0, 1, 2].map((card) => (
        <div
          key={card}
          className="space-y-4 border border-[#dde4dd] bg-white p-4"
        >
          <div className="flex gap-3">
            <div className="h-10 w-10 animate-pulse bg-[#dde4dd]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-[#dde4dd]" />
              <div className="h-6 w-48 animate-pulse rounded bg-[#dde4dd]" />
            </div>
          </div>
          <div className="h-8 w-full animate-pulse rounded bg-[#dde4dd]" />
        </div>
      ))}
    </section>
  </div>
);

const Application = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-jobs");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login first");
        }

        const response = await fetch(APPLICATIONS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch applications");
        }

        setJobs(data.jobs || data.applications || []);
      } catch (err) {
        setError(err.message || "Unable to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return jobs;

    return jobs.filter((job) =>
      [job.company, job.role, job.status, job.location, job.salary]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [jobs, searchTerm]);

  const jobsByColumn = useMemo(() => {
    return columns.reduce((groups, column) => {
      groups[column.id] =
        column.statuses === "all"
          ? filteredJobs
          : filteredJobs.filter((job) => column.statuses.includes(job.status));
      return groups;
    }, {});
  }, [filteredJobs]);

  const activeCount = jobs.filter((job) => job.status !== "Rejected").length;
  const activeColumn = columns.find((column) => column.id === activeTab) || columns[1];
  const mobileJobs = jobsByColumn[activeColumn.id] || [];

  if (loading) {
    return <ApplicationLoading />;
  }

  return (
    <div className="min-h-screen text-[#161d19]">
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <section className="hidden md:block">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold leading-tight text-[#161d19]">
              Application Pipeline
            </h2>
            <p className="mt-2 text-[#3c4a42]">
              Tracking {activeCount} active opportunities across your network.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#3c4a42]">
                search
              </span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-full border border-[#dde4dd] bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
                placeholder="Search applications..."
                type="text"
              />
            </div>

            <div className="flex rounded border border-[#dde4dd] bg-white p-1">
              <button className="rounded-sm bg-[#dff5e7] px-4 py-2 text-xs font-bold text-[#006c49]">
                Kanban
              </button>
              <button className="rounded-sm px-4 py-2 text-xs font-medium text-[#3c4a42] transition-colors hover:bg-[#eef6ee]">
                List View
              </button>
            </div>

            <button className="flex items-center gap-2 rounded-lg border border-[#bbcabf] px-4 py-2 text-sm font-bold transition-colors hover:bg-[#eef6ee]">
              <span className="material-symbols-outlined text-[20px]">
                filter_list
              </span>
              Filter
            </button>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4">
          {columns.map((column) => {
            const columnJobs = jobsByColumn[column.id] || [];

            return (
              <div
                key={column.id}
                className="flex w-[286px] shrink-0 flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-[#dde4dd] px-1 pb-3">
                  <h3 className="flex items-center gap-2 font-bold">
                    {column.label}
                    <span
                      className={`rounded-full px-3 py-[2px] text-xs ${
                        column.id === "interviewing"
                          ? "bg-[#dff5e7] font-bold text-[#006c49]"
                          : "bg-[#eef6ee] text-[#3c4a42]"
                      }`}
                    >
                      {columnJobs.length}
                    </span>
                  </h3>
                  <button
                    onClick={() => navigate("/dashboard/add-job")}
                    className="text-[#3c4a42] transition-colors hover:text-[#006c49]"
                    aria-label={`Add ${column.label} application`}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {columnJobs.length ? (
                    columnJobs.map((job) => (
                      <div
                        key={job._id}
                        className={`group cursor-pointer rounded-lg bg-white p-4 transition-all hover:border-[#006c49] hover:shadow-sm ${
                          column.id === "interviewing"
                            ? "border-2 border-[#006c49]"
                            : "border border-[#dde4dd]"
                        } ${column.id === "rejected" ? "opacity-65 hover:opacity-100" : ""}`}
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            <span
                              className={`rounded px-2 py-[2px] text-[11px] font-bold uppercase tracking-wider ${
                                column.id === "interviewing"
                                  ? "bg-[#006c49] text-white"
                                  : column.id === "rejected"
                                    ? "bg-[#eef6ee] text-[#3c4a42]"
                                    : "bg-[#dff5e7] text-[#006c49]"
                              }`}
                            >
                              {getTag(job)}
                            </span>
                            {column.id === "interviewing" && (
                              <span className="rounded bg-[#dff5e7] px-2 py-[2px] text-[11px] font-bold uppercase tracking-wider text-[#006c49]">
                                {getWorkMode(job)}
                              </span>
                            )}
                          </div>
                          <button className="text-[#3c4a42] opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="material-symbols-outlined text-[20px]">
                              more_horiz
                            </span>
                          </button>
                        </div>

                        <h4 className="mb-1 text-lg font-bold leading-snug text-[#161d19]">
                          {job.role || "Untitled role"}
                        </h4>
                        <p className="font-medium text-[#3c4a42]">
                          {job.company || "Unknown company"}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#dde4dd] pt-3">
                          <span
                            className={`flex items-center gap-1 text-xs ${
                              column.id === "interviewing"
                                ? "font-bold text-[#006c49]"
                                : "text-[#3c4a42]"
                            }`}
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {column.id === "interviewing"
                                ? "schedule"
                                : "calendar_today"}
                            </span>
                            {formatDate(job.createdAt)}
                          </span>
                          <span className="truncate text-xs font-medium text-[#3c4a42]">
                            {job.salary || job.location || "No details"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed border-[#bbcabf] bg-white p-5 text-center text-sm leading-6 text-[#3c4a42]">
                      No applications in this stage.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="md:hidden">
        <div className="pb-4">
          <h2 className="text-3xl font-bold text-[#161d19]">Applications</h2>
          <p className="mt-1 text-[#3c4a42]">
            Managing {activeCount} active pipelines
          </p>
        </div>

        <nav className="sticky top-16 z-30 -mx-4 border-b border-[#dde4dd] bg-[#f4fbf4]">
          <div className="flex gap-7 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {columns.map((column) => {
              const isActive = activeTab === column.id;
              const count = jobsByColumn[column.id]?.length || 0;

              return (
                <button
                  key={column.id}
                  onClick={() => setActiveTab(column.id)}
                  className={`whitespace-nowrap border-b-2 py-4 text-sm font-bold transition-all ${
                    isActive
                      ? "border-[#006c49] text-[#006c49]"
                      : "border-transparent text-[#3c4a42]"
                  }`}
                >
                  {column.label} ({count})
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-5 space-y-4">
          {mobileJobs.length ? (
            mobileJobs.map((job) => (
              <div
                key={job._id}
                className="flex cursor-pointer flex-col gap-3 border border-[#dde4dd] bg-white p-4 transition-colors active:border-[#006c49]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden bg-[#eef6ee] text-sm font-black text-[#006c49]">
                      {companyInitial(job.company)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm text-[#3c4a42]">
                        {job.company || "Unknown company"}
                      </p>
                      <h3 className="truncate text-xl font-bold leading-tight text-[#161d19]">
                        {job.role || "Untitled role"}
                      </h3>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[20px] text-[#3c4a42]">
                    more_vert
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="bg-[#dff5e7] px-2 py-[2px] text-[11px] font-bold uppercase tracking-wider text-[#006c49]">
                    {getWorkMode(job)}
                  </span>
                  <span className="bg-[#eef6ee] px-2 py-[2px] text-[11px] font-bold uppercase tracking-wider text-[#3c4a42]">
                    {job.status === "Interview" ? "Interviewing" : job.status}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-[#dde4dd] pt-3">
                  <span className="text-xs italic text-[#3c4a42]">
                    Added {formatDate(job.createdAt)}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-[#006c49]">
                    <span>View Role</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-[#bbcabf] bg-white p-6 text-center">
              <span className="material-symbols-outlined text-[40px] text-[#006c49]">
                {activeColumn.icon}
              </span>
              <p className="mt-3 font-bold text-[#161d19]">
                No {activeColumn.label.toLowerCase()} applications
              </p>
              <p className="mt-1 text-sm leading-6 text-[#3c4a42]">
                Add a job or move an application into this stage to see it here.
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#006c49] text-white shadow-lg transition-transform duration-150 active:scale-95"
          aria-label="Add application"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </section>
    </div>
  );
};

export default Application;
