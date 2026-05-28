import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const emptyForm = {
  name: "",
  email: "",
  profilePicture: "",
  bio: "",
};

const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-[#dde4dd] ${className}`} />
);

const ProfileLoading = () => (
  <div className="mx-auto w-full max-w-5xl">
    <header className="mb-10">
      <SkeletonBlock className="h-10 w-72 md:h-12 md:w-96" />
      <SkeletonBlock className="mt-3 h-5 w-full max-w-xl" />
    </header>

    <section className="space-y-10">
      <div className="grid grid-cols-1 gap-8 border-t border-[#bbcabf] pt-8 md:grid-cols-3">
        <div>
          <SkeletonBlock className="h-6 w-44" />
          <SkeletonBlock className="mt-3 h-4 w-full" />
          <SkeletonBlock className="mt-2 h-4 w-4/5" />
          <SkeletonBlock className="mt-2 h-4 w-3/5" />
        </div>

        <div className="space-y-6 md:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <SkeletonBlock className="h-24 w-24 shrink-0" />
            <div className="space-y-3">
              <SkeletonBlock className="h-10 w-36" />
              <SkeletonBlock className="h-4 w-48" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-24" />
              <SkeletonBlock className="h-12 w-full" />
            </div>
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-12 w-full" />
            </div>
          </div>

          <div className="space-y-2">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-32 w-full" />
          </div>

          <div className="flex justify-end">
            <SkeletonBlock className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 border-t border-[#bbcabf] pt-8 md:grid-cols-3">
        <div>
          <SkeletonBlock className="h-6 w-40" />
          <SkeletonBlock className="mt-3 h-4 w-full" />
          <SkeletonBlock className="mt-2 h-4 w-3/4" />
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-col gap-4 rounded-lg border border-[#bbcabf] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <SkeletonBlock className="h-7 w-7 shrink-0 rounded-full" />
              <div className="space-y-2">
                <SkeletonBlock className="h-5 w-36" />
                <SkeletonBlock className="h-4 w-56" />
              </div>
            </div>
            <SkeletonBlock className="h-10 w-24" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#bbcabf] pb-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-5 w-32" />
          <SkeletonBlock className="h-4 w-full max-w-lg" />
        </div>
        <SkeletonBlock className="h-10 w-32" />
      </div>
    </section>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login first");
        }

        const response = await fetch(
          "https://trackr-zpcz.onrender.com/api/v1/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch profile");
        }

        setForm({
          name: data.user?.name || "",
          email: data.user?.email || "",
          profilePicture: data.user?.profilePicture || "",
          bio: data.user?.bio || "",
        });

        try {
          const jobsResponse = await fetch(
            "https://trackr-zpcz.onrender.com/api/v1/jobs",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const jobsData = await jobsResponse.json();

          if (jobsResponse.ok) {
            setJobs(jobsData.jobs || []);
          }
        } catch {
          setJobs([]);
        }
      } catch (err) {
        setError(err.message || "Unable to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePicture = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 800 * 1024) {
      setError("Profile picture must be 800K or smaller");
      return;
    }

    setError("");
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        profilePicture: reader.result || "",
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first");
      }

      const response = await fetch(
        "https://trackr-zpcz.onrender.com/api/v1/user/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 413) {
        throw new Error("image to large please choose another");
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to update profile");
      }

      setForm({
        name: data.user?.name || "",
        email: data.user?.email || "",
        profilePicture: data.user?.profilePicture || "",
        bio: data.user?.bio || "",
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("user-updated"));
      setMessage(data.message || "Profile updated successfully");
    } catch (err) {
      setError(err.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first");
      }

      const response = await fetch(
        "https://trackr-zpcz.onrender.com/api/v1/user/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete account");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("user-updated"));
      navigate("/auth");
    } catch (err) {
      setError(err.message || "Unable to delete account");
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("activeResume");
    localStorage.removeItem("resume");
    window.dispatchEvent(new Event("user-updated"));
    navigate("/auth", { replace: true });
  };

  if (loading) {
    return <ProfileLoading />;
  }

  const interviewCount = jobs.filter(
    (job) => job.status === "Interview",
  ).length;
  const profileSubtitle = form.bio || "Trackr member";

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mx-auto flex max-w-lg flex-col space-y-7 md:hidden">
        <section className="mt-4 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#006c49] bg-[#eef6ee]">
              {form.profilePicture ? (
                <img
                  alt="Profile"
                  className="h-full w-full object-cover"
                  src={form.profilePicture}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="material-symbols-outlined text-[48px] text-[#006c49]">
                    person
                  </span>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleProfilePicture}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-[#006c49] p-2 text-white shadow-sm"
              aria-label="Change avatar"
            >
              <span className="material-symbols-outlined !text-[18px]">
                edit
              </span>
            </button>
          </div>

          <h2 className="text-3xl font-bold text-[#161d19]">
            {form.name || "Your Profile"}
          </h2>
          <p className="mt-1 line-clamp-2 max-w-sm text-sm leading-6 text-[#3c4a42]">
            {profileSubtitle}
          </p>

          <div className="mt-4 flex gap-2">
            <span className="rounded bg-[#dff5e7] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#006c49]">
              Pro Account
            </span>
          </div>

          {error && (
            <p className="mt-4 w-full rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="flex flex-col rounded border border-[#dde4dd] bg-[#f8fbf8] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3c4a42]">
              Applied
            </span>
            <span className="text-3xl font-black text-[#161d19]">
              {jobs.length}
            </span>
          </div>
          <div className="flex flex-col rounded border border-[#dde4dd] bg-[#f8fbf8] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3c4a42]">
              Interviews
            </span>
            <span className="text-3xl font-black text-[#006c49]">
              {interviewCount}
            </span>
          </div>
        </section>

        <section className="flex flex-col space-y-3">
          <h3 className="px-1 text-xs font-bold uppercase tracking-wider text-[#3c4a42]">
            Job Search
          </h3>
          <div className="overflow-hidden rounded-xl border border-[#dde4dd] bg-[#eef6ee] divide-y divide-[#dde4dd]">
            <button
              type="button"
              onClick={() => navigate("/dashboard/resumes")}
              className="group flex w-full items-center justify-between p-4 text-left transition-colors active:bg-[#dde4dd]"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#006c49]">
                  description
                </span>
                <span className="font-medium text-[#161d19]">
                  Resume Manager
                </span>
              </div>
              <span className="material-symbols-outlined text-[#bbcabf] group-active:text-[#161d19]">
                chevron_right
              </span>
            </button>

            <button
              type="button"
              className="group flex w-full items-center justify-between p-4 text-left transition-colors active:bg-[#dde4dd]"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#006c49]">
                  notifications_active
                </span>
                <span className="font-medium text-[#161d19]">Job Alerts</span>
              </div>
              <span className="material-symbols-outlined text-[#bbcabf] group-active:text-[#161d19]">
                chevron_right
              </span>
            </button>
          </div>
        </section>

        <section className="pt-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500 bg-white px-4 py-4 font-bold text-red-600 transition-colors active:bg-red-50"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
          <p className="mt-7 text-center text-xs text-[#3c4a42]">
            Trackr Version 2.4.0 (Build 892)
          </p>
        </section>
      </div>

      <div className="hidden md:block">
        <header className="mb-10">
          <h1 className="text-3xl md:text-[45px] leading-tight font-bold text-[#161d19]">
            Profile & Settings
          </h1>
          <p className="mt-2 text-base md:text-lg leading-7 text-[#3c4a42]">
            Set up your public profile details after creating your account.
          </p>
        </header>

        <section className="space-y-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#bbcabf] pt-8"
          >
            <div>
              <h2 className="text-lg font-bold text-[#006c49]">
                Personal Information
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#3c4a42]">
                Your account starts with only your name and email. Add a profile
                picture and bio when you are ready.
              </p>
            </div>

            <div className="md:col-span-2 space-y-6">
              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </p>
              )}

              {message && (
                <p className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  {message}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[#bbcabf] bg-[#eef6ee] shadow-sm">
                  {form.profilePicture ? (
                    <img
                      alt="Profile avatar"
                      className="h-full w-full object-cover"
                      src={form.profilePicture}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-[#006c49]">
                        person
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <input
                    ref={fileInputRef}
                    className="hidden"
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleProfilePicture}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-10 px-4 rounded-lg bg-[#006c49] text-white text-sm font-semibold hover:bg-[#00563a] transition-colors"
                  >
                    Change Avatar
                  </button>
                  <p className="mt-2 text-sm text-[#3c4a42]">
                    JPG or PNG. Max size of 800K.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="block text-sm font-semibold text-[#161d19]">
                    Full Name
                  </span>
                  <input
                    className="w-full rounded-lg border border-[#bbcabf] bg-white px-4 py-3 text-[#161d19] outline-none transition-colors focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="block text-sm font-semibold text-[#161d19]">
                    Email Address
                  </span>
                  <input
                    className="w-full rounded-lg border border-[#bbcabf] bg-white px-4 py-3 text-[#161d19] outline-none transition-colors focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="block text-sm font-semibold text-[#161d19]">
                  Professional Bio
                </span>
                <textarea
                  className="min-h-32 w-full rounded-lg border border-[#bbcabf] bg-white px-4 py-3 text-[#161d19] outline-none transition-colors focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Tell companies a little about your role, strengths, and career goals."
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || saving}
                  className="h-10 px-6 rounded-lg bg-[#006c49] text-white text-sm font-semibold hover:bg-[#00563a] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-700 transition-colors"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#bbcabf] pt-8">
            <div>
              <h2 className="text-lg font-bold text-[#006c49]">
                Account Security
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#3c4a42]">
                Keep your account protected with regular password updates.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-[#bbcabf] bg-white p-5">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#006c49]">
                    lock
                  </span>
                  <div>
                    <p className="font-bold text-[#161d19]">Change Password</p>
                    <p className="mt-1 text-sm text-[#3c4a42]">
                      Update your account password regularly.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="h-10 px-4 rounded-lg border border-[#bbcabf] bg-white text-sm font-semibold text-[#006c49] hover:bg-[#eef6ee] transition-colors"
                >
                  Update
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#bbcabf] pt-8">
            <div>
              <h2 className="font-bold text-[#161d19]">Sign Out</h2>
              <p className="mt-1 text-sm text-[#3c4a42]">
                End this session and return to the authentication page.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="h-10 px-4 rounded-lg border border-[#bbcabf] bg-white text-sm font-semibold text-[#006c49] hover:bg-[#eef6ee] transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#bbcabf] pt-8 pb-6">
            <div>
              <h2 className="font-bold text-red-600">Delete Account</h2>
              <p className="mt-1 text-sm text-[#3c4a42]">
                Permanently remove all your data and career history. This cannot
                be undone.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="h-10 px-4 rounded-lg border border-red-500 bg-white text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </section>

        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <span className="material-symbols-outlined">warning</span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#161d19]">
                    Delete account?
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#3c4a42]">
                    This will permanently delete your account, profile, and
                    saved data. This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => setShowDeleteModal(false)}
                  className="h-10 rounded-lg border border-[#bbcabf] px-4 text-sm font-semibold text-[#161d19] hover:bg-[#eef6ee] disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDeleteAccount}
                  className="h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300 transition-colors"
                >
                  {deleting ? "Deleting..." : "Yes, delete account"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
