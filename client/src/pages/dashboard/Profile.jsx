import { useEffect, useRef, useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  profilePicture: "",
  bio: "",
};

const Profile = () => {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login first");
        }

        const response = await fetch("http://localhost:4000/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

      const response = await fetch("http://localhost:4000/api/v1/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

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

  return (
    <div className="mx-auto w-full max-w-5xl">
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
            {loading && (
              <p className="rounded-lg border border-[#bbcabf] bg-white p-4 text-sm text-[#3c4a42]">
                Loading profile...
              </p>
            )}

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
            className="h-10 px-4 rounded-lg border border-red-500 bg-white text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
