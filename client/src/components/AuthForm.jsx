import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
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

  // LOGIN SUBMIT (API READY)
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    console.log("LOGIN PAYLOAD:", loginData);

    // 👉 API LATER
    // await fetch("/api/login", { method: "POST", body: JSON.stringify(loginData) })
  };

  // REGISTER SUBMIT (API READY)
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    console.log("REGISTER PAYLOAD:", registerData);

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 👉 API LATER
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(registerData) })
  };

  // LINKEDIN LOGIN (FUTURE HOOK)
  const handleLinkedInLogin = () => {
    console.log("LinkedIn OAuth triggered");

    // 👉 Later:
    // window.location.href = "YOUR_BACKEND/linkedin/auth";
  };

  return (
    <div className="w-full max-w-[420px]">

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

      {/* LOGIN FORM */}
      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={loginData.email}
            onChange={handleLoginChange}
            className="w-full h-12 px-4 border border-gray-300 bg-white focus:border-green-600 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            className="w-full h-12 px-4 border border-gray-300 bg-white focus:border-green-600 outline-none"
          />

          <button
            type="submit"
            className="w-full h-12 bg-green-700 text-white font-bold hover:bg-green-800 transition"
          >
            Sign In
          </button>

        </form>
      )}

      {/* REGISTER FORM */}
      {activeTab === "register" && (
        <form onSubmit={handleRegisterSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={registerData.name}
            onChange={handleRegisterChange}
            className="w-full h-12 px-4 border border-gray-300 bg-white focus:border-green-600 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={registerData.email}
            onChange={handleRegisterChange}
            className="w-full h-12 px-4 border border-gray-300 bg-white focus:border-green-600 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleRegisterChange}
            className="w-full h-12 px-4 border border-gray-300 bg-white focus:border-green-600 outline-none"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            className="w-full h-12 px-4 border border-gray-300 bg-white focus:border-green-600 outline-none"
          />

          <button
            type="submit"
            className="w-full h-12 bg-green-700 text-white font-bold hover:bg-green-800 transition"
          >
            Create Account
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

  {/* GOOGLE */}
  <button className="h-12 border flex items-center justify-center gap-2 hover:bg-gray-50 transition">
    <FcGoogle className="text-xl" />
    <span className="text-sm font-medium">Google</span>
  </button>

  {/* LINKEDIN */}
  <button
    onClick={handleLinkedInLogin}
    className="h-12 border flex items-center justify-center gap-2 hover:bg-gray-50 transition"
  >
    <FaLinkedin className="text-[#0A66C2] text-lg" />
    <span className="text-sm font-medium">LinkedIn</span>
  </button>

</div>
    </div>
  );
};

export default AuthForm;