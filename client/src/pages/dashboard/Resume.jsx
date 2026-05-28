import { useMemo, useRef, useState } from "react";

const defaultResumes = [];

const formatFileSize = (bytes) => {
  if (!bytes) return "Unknown size";

  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const Resume = () => {
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [resumes, setResumes] = useState(() => {
    const savedResume = JSON.parse(
      localStorage.getItem("activeResume") || "null",
    );

    if (!savedResume) return defaultResumes;

    return [savedResume];
  });

  const [selectedId, setSelectedId] = useState(resumes[0]?.id || "");

  const [openMenuId, setOpenMenuId] = useState(null);

  const selectedResume = useMemo(
    () => resumes.find((resume) => resume.id === selectedId) || resumes[0],
    [resumes, selectedId],
  );

  /**
   * UPLOAD RESUME
   */
  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first");
      }

      const formData = new FormData();

      formData.append("title", file.name);

      formData.append("resume", file);

      const response = await fetch(
        "https://trackr-zpcz.onrender.com/api/v1/resumes/upload",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const uploadedResume = {
        id: data.resume._id,

        name: data.resume.originalName,

        version: "New",

        date: new Intl.DateTimeFormat("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(data.resume.createdAt)),

        size: formatFileSize(file.size),

        url: `https://trackr-zpcz.onrender.com/${data.resume.fileUrl.replace(
          /\\/g,
          "/",
        )}`,
      };

      setResumes((current) => [uploadedResume, ...current]);

      setSelectedId(uploadedResume.id);

      localStorage.setItem("activeResume", JSON.stringify(uploadedResume));

      window.dispatchEvent(new Event("resume-updated"));

      alert("Resume uploaded successfully");
    } catch (error) {
      console.log(error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE
   */
  const handleDelete = (id) => {
    setResumes((current) => current.filter((resume) => resume.id !== id));

    if (selectedId === id) {
      const nextResume = resumes.find((resume) => resume.id !== id);

      setSelectedId(nextResume?.id || "");

      if (nextResume) {
        localStorage.setItem("activeResume", JSON.stringify(nextResume));
      } else {
        localStorage.removeItem("activeResume");
      }
    }

    setOpenMenuId(null);
  };

  /**
   * DOWNLOAD
   */
  const handleDownload = () => {
    if (!selectedResume?.url) return;

    const link = document.createElement("a");

    link.href = selectedResume.url;

    link.download = selectedResume.name;

    link.click();
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col text-[#161d19]">
      {/* HEADER */}
      <header className="mb-6 flex flex-col gap-4 border-b border-[#dde4dd] pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#006c49] md:text-4xl">
            Resume Manager
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#3c4a42]">
            Keep your active resume versions organized.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* INPUT */}
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-sm transition-all ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#006c49] hover:opacity-90"
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Uploading...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">add</span>
                Upload New Resume
              </>
            )}
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT */}
        <section className="flex flex-col space-y-4 lg:col-span-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Active Versions</h2>
          </div>

          <div className="space-y-4">
            {resumes.map((resume) => {
              const isSelected = selectedResume?.id === resume.id;

              return (
                <button
                  key={resume.id}
                  onClick={() => {
                    setSelectedId(resume.id);

                    localStorage.setItem(
                      "activeResume",
                      JSON.stringify(resume),
                    );

                    window.dispatchEvent(new Event("resume-updated"));
                  }}
                  className={`w-full rounded-xl border p-5 text-left transition-all ${
                    isSelected
                      ? "border-[#006c49] bg-white shadow-sm"
                      : "border-[#dde4dd] bg-white"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="material-symbols-outlined text-[#006c49]">
                        article
                      </span>

                      <span className="truncate font-semibold">
                        {resume.name}
                      </span>
                    </div>

                    <span className="rounded-full bg-[#eef6ee] px-3 py-1 text-[11px] font-bold">
                      {resume.version}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#3c4a42]">
                    <div className="flex gap-4">
                      <span>{resume.date}</span>

                      <span>{resume.size}</span>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenMenuId(
                            openMenuId === resume.id ? null : resume.id,
                          );
                        }}
                        className="rounded-full p-2 hover:bg-[#eef6ee]"
                      >
                        <span className="material-symbols-outlined">
                          more_vert
                        </span>
                      </button>

                      {openMenuId === resume.id && (
                        <div className="absolute right-0 top-full z-10 mt-2 w-40 overflow-hidden rounded-xl border border-[#dde4dd] bg-white shadow-lg">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();

                              handleDelete(resume.id);
                            }}
                            className="w-full px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* RIGHT */}
        <section className="flex flex-col lg:col-span-7">
          <div className="flex min-h-[620px] flex-1 flex-col overflow-hidden rounded-xl border border-[#dde4dd] bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-[#dde4dd] bg-[#f8fbf8] px-5 py-4">
              <p className="font-bold text-[#006c49] truncate">
                Preview: {selectedResume?.name || "No resume selected"}
              </p>

              <button
                onClick={handleDownload}
                disabled={!selectedResume?.url}
                className="flex items-center gap-2 rounded-full bg-[#006c49] px-4 py-2 text-sm font-bold text-white"
              >
                <span className="material-symbols-outlined text-[18px]">
                  download
                </span>
                Download
              </button>
            </div>

            {/* PREVIEW */}
            <div className="flex flex-1 items-center justify-center bg-[#eef6ee] p-6">
              <div className="flex h-[500px] w-full max-w-[550px] flex-col items-center justify-center rounded-xl border border-[#dde4dd] bg-white shadow-lg">
                <span className="material-symbols-outlined text-[80px] text-[#006c49]">
                  description
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {selectedResume?.name}
                </h3>

                <p className="mt-2 text-sm text-[#3c4a42]">
                  {selectedResume?.size}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
