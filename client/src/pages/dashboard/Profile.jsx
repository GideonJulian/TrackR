const Profile = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="mb-10">
        <h1 className="text-3xl md:text-[45px] leading-tight font-bold text-[#161d19]">
          Profile & Settings
        </h1>
        <p className="mt-2 text-base md:text-lg leading-7 text-[#3c4a42]">
          Manage your account details and security preferences.
        </p>
      </header>

      <section className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#bbcabf] pt-8">
          <div>
            <h2 className="text-lg font-bold text-[#006c49]">
              Personal Information
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#3c4a42]">
              Update your personal details and how others see you on the
              platform.
            </p>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="relative group h-24 w-24 shrink-0">
                <img
                  alt="Profile avatar"
                  className="h-24 w-24 rounded-lg object-cover border border-[#bbcabf] shadow-sm"
                  src="https://i.pravatar.cc/160?img=12"
                />
                <button
                  type="button"
                  aria-label="Change avatar"
                  className="absolute inset-0 rounded-lg bg-[#006c49]/25 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-white">
                    photo_camera
                  </span>
                </button>
              </div>

              <div>
                <button
                  type="button"
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
                  type="text"
                  defaultValue="Alexander Sterling"
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-semibold text-[#161d19]">
                  Email Address
                </span>
                <input
                  className="w-full rounded-lg border border-[#bbcabf] bg-white px-4 py-3 text-[#161d19] outline-none transition-colors focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
                  type="email"
                  defaultValue="alexander.s@trackr.io"
                />
              </label>
            </div>

            <label className="block space-y-2">
              <span className="block text-sm font-semibold text-[#161d19]">
                Professional Bio
              </span>
              <textarea
                className="min-h-32 w-full rounded-lg border border-[#bbcabf] bg-white px-4 py-3 text-[#161d19] outline-none transition-colors focus:border-[#006c49] focus:ring-1 focus:ring-[#006c49]"
                defaultValue="Senior Software Engineer with 8 years of experience in distributed systems and cloud architecture. Currently managing my career growth through Trackr."
              />
            </label>

            <div className="flex justify-end">
              <button
                type="button"
                className="h-10 px-6 rounded-lg bg-[#006c49] text-white text-sm font-semibold hover:bg-[#00563a] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

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
