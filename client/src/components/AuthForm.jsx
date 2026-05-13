import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

/**
 * Simple toast system (no library needed)
 */
const Toast = ({ message, type }) => {
  const colors =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-800";

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-lg text-white shadow-lg z-50 animate-fadeIn ${colors}`}
    >
      {message}
    </div>
  );
};

const AuthForm = ({ activeTab, setActiveTab }) => {
  // LOGIN STATE
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // REGISTER STATE
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // TOAST STATE
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // HANDLE CHANGE (LOGIN)
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE CHANGE (REGISTER)
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN SUBMIT
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("LOGIN PAYLOAD:", loginData);

      // simulate API
      await new Promise((res) => setTimeout(res, 1200));

      showToast("Login successful 🎉", "success");
    } catch (err) {
      showToast("Login failed ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // REGISTER SUBMIT
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    
    setLoading(true);

    try {
      console.log("REGISTER PAYLOAD:", registerData);

      await new Promise((res) => setTimeout(res, 1200));

      showToast("Account created successfully 🎉", "success");
    } catch (err) {
      showToast("Registration failed ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // LINKEDIN LOGIN
  const handleLinkedInLogin = () => {
    console.log("LinkedIn OAuth triggered");
    showToast("Redirecting to LinkedIn...", "success");

    // future:
    // window.location.href = "/api/auth/linkedin";
  };

  return (
    <div className="w-full max-w-[420px]">

      {/* TOAST */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* TABS */}
      <div className="flex border-b border-outline-variant mb-8">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 transition ${
            activeTab === "login"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500"
          }`}
        >
          LOGIN
        </button>

        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 transition ${
            activeTab === "register"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500"
          }`}
        >
          REGISTER
        </button>
      </div>

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          {activeTab === "login" ? "Welcome back" : "Create your account"}
        </h2>

        <p className="text-sm text-gray-500">
          {activeTab === "login"
            ? "Access your job dashboard"
            : "Start tracking your job applications"}
        </p>
      </div>

      {/* LOGIN */}
      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit} className="space-y-5">

          <input
            name="email"
            placeholder="Email address"
            onChange={handleLoginChange}
            className="w-full h-12 px-4 border border-gray-300"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleLoginChange}
            className="w-full h-12 px-4 border border-gray-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-green-700 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      )}

      {/* REGISTER */}
      {activeTab === "register" && (
        <form onSubmit={handleRegisterSubmit} className="space-y-5">

          <input
            name="name"
            placeholder="Full name"
            onChange={handleRegisterChange}
            className="w-full h-12 px-4 border border-gray-300"
          />

          <input
            name="email"
            placeholder="Email address"
            onChange={handleRegisterChange}
            className="w-full h-12 px-4 border border-gray-300"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleRegisterChange}
            className="w-full h-12 px-4 border border-gray-300"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            onChange={handleRegisterChange}
            className="w-full h-12 px-4 border border-gray-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-green-700 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      )}

      {/* DIVIDER */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px bg-gray-300 flex-1" />
        <span className="text-xs text-gray-400 uppercase">or</span>
        <div className="h-px bg-gray-300 flex-1" />
      </div>

      {/* SOCIAL LOGIN */}
      <div className="grid grid-cols-2 gap-3">

        <button className="h-12 border flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <FcGoogle className="text-xl" />
          Google
        </button>

        <button
          onClick={handleLinkedInLogin}
          className="h-12 border flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <FaLinkedin className="text-[#0A66C2]" />
          LinkedIn
        </button>

      </div>
    </div>
  );
};

export default AuthForm;