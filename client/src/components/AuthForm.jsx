import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * TOAST COMPONENT
 */
const Toast = ({ message, type }) => {
  const styles =
    type === "success"
      ? "bg-green-600 border-green-400"
      : "bg-red-600 border-red-400";

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-5 py-4 rounded-xl border text-white shadow-2xl backdrop-blur-md animate-slideIn ${styles}`}
    >
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

const AuthForm = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  /**
   * =========================
   * LOGIN STATE
   * =========================
   */
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  /**
   * =========================
   * REGISTER STATE
   * =========================
   */
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /**
   * =========================
   * UI STATES
   * =========================
   */
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  /**
   * =========================
   * SHOW TOAST
   * =========================
   */
  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  /**
   * =========================
   * HANDLE INPUTS
   * =========================
   */
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * =========================
   * VALIDATION
   * =========================
   */
  const isLoginValid =
    loginData.email.trim() !== "" &&
    loginData.password.trim() !== "";

  const isRegisterValid =
    registerData.name.trim() !== "" &&
    registerData.email.trim() !== "" &&
    registerData.password.trim() !== "" &&
    registerData.confirmPassword.trim() !== "";

  /**
   * =========================
   * LOGIN API
   * =========================
   */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!isLoginValid) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://trackr-zpcz.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      console.log(data);

      /**
       * USE API MESSAGE
       */
      if (!response.ok) {
        throw new Error(data.message);
      }

      /**
       * SAVE TOKEN
       */
      localStorage.setItem("token", data.token);

      /**
       * SAVE USER
       */
      localStorage.setItem("user", JSON.stringify(data.user));

      /**
       * API SUCCESS MESSAGE
       */
      showToast(data.message, "success");

      /**
       * REDIRECT
       */
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.log(error);

      /**
       * API ERROR MESSAGE
       */
      showToast(error.message, "error");

    } finally {
      setLoading(false);
    }
  };

  /**
   * =========================
   * REGISTER API
   * =========================
   */
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    /**
     * REQUIRED FIELDS
     */
    if (!isRegisterValid) {
      showToast("Please fill all fields", "error");
      return;
    }

    /**
     * PASSWORD CHECK
     */
    if (registerData.password !== registerData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://trackr-zpcz.onrender.com/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      /**
       * USE API MESSAGE
       */
      if (!response.ok) {
        throw new Error(data.message);
      }

      /**
       * SAVE TOKEN
       */
      localStorage.setItem("token", data.token);

      /**
       * SAVE USER
       */
      localStorage.setItem("user", JSON.stringify(data.user));

      /**
       * API SUCCESS MESSAGE
       */
      showToast(data.message, "success");

      /**
       * REDIRECT
       */
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.log(error);

      /**
       * API ERROR MESSAGE
       */
      showToast(error.message, "error");

    } finally {
      setLoading(false);
    }
  };

  /**
   * =========================
   * LINKEDIN LOGIN
   * =========================
   */
  const handleLinkedInLogin = () => {
    window.location.href =
      "https://trackr-zpcz.onrender.com/api/v1/auth/linkedin";
  };

  return (
    <div className="w-full max-w-[420px]">

      {/* TOAST */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}

      {/* TABS */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all duration-300 ${
            activeTab === "login"
              ? "border-green-700 text-green-700"
              : "border-transparent text-gray-500"
          }`}
        >
          LOGIN
        </button>

        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all duration-300 ${
            activeTab === "register"
              ? "border-green-700 text-green-700"
              : "border-transparent text-gray-500"
          }`}
        >
          REGISTER
        </button>
      </div>

      {/* HEADER */}
      <div className="mb-7">
        <h2 className="text-3xl font-black text-[#161d19]">
          {activeTab === "login"
            ? "Welcome back"
            : "Create your account"}
        </h2>

        <p className="text-gray-500 mt-2">
          {activeTab === "login"
            ? "Access your job dashboard"
            : "Start tracking your applications smarter"}
        </p>
      </div>

      {/* LOGIN FORM */}
      {activeTab === "login" && (
        <form
          onSubmit={handleLoginSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-green-700 transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-green-700 transition"
            />
          </div>

          {/* WARNING */}
          {!isLoginValid && (
            <p className="text-sm text-red-500">
              Please fill all fields
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading || !isLoginValid}
            className={`w-full h-12 rounded-lg text-white font-bold flex items-center justify-center gap-3 transition-all ${
              loading || !isLoginValid
                ? "bg-gray-300 cursor-not-allowed text-black"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      )}

      {/* REGISTER FORM */}
      {activeTab === "register" && (
        <form
          onSubmit={handleRegisterSubmit}
          className="space-y-5"
        >

          {/* FULL NAME */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={registerData.name}
              onChange={handleRegisterChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-green-700 transition"
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-green-700 transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-green-700 transition"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-green-700 transition"
            />
          </div>

          {/* REQUIRED MESSAGE */}
          {!isRegisterValid && (
            <p className="text-sm text-red-500">
              Please fill all fields
            </p>
          )}

          {/* PASSWORD MESSAGE */}
          {registerData.confirmPassword &&
            registerData.password !==
              registerData.confirmPassword && (
              <p className="text-sm text-red-500">
                Passwords do not match
              </p>
            )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={
              loading ||
              !isRegisterValid ||
              registerData.password !==
                registerData.confirmPassword
            }
            className={`w-full h-12 rounded-lg text-white font-bold flex items-center justify-center gap-3 transition-all ${
              loading ||
              !isRegisterValid ||
              registerData.password !==
                registerData.confirmPassword
                ? "bg-gray-300 cursor-not-allowed text-black"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>
      )}

      {/* DIVIDER */}
      <div className="my-7 flex items-center gap-3">
        <div className="h-px bg-gray-300 flex-1"></div>

        <span className="text-xs uppercase text-gray-400">
          or continue with
        </span>

        <div className="h-px bg-gray-300 flex-1"></div>
      </div>

      {/* SOCIAL LOGIN */}
      <div className="grid grid-cols-2 gap-3">

        {/* GOOGLE */}
        <button className="h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
          <FcGoogle className="text-xl" />

          <span className="text-sm font-medium">
            Google
          </span>
        </button>

        {/* LINKEDIN */}
        <button
          onClick={handleLinkedInLogin}
          className="h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
        >
          <FaLinkedin className="text-[#0A66C2] text-lg" />

          <span className="text-sm font-medium">
            LinkedIn
          </span>
        </button>

      </div>
    </div>
  );
};

export default AuthForm;