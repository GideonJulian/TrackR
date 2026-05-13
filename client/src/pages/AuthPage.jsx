import React, { useState } from "react";

import AuthSidebar from "../components/AuthSidebar";
import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login"); // login | register

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#f4fbf4">
      {/* LEFT SIDE */}
      <AuthSidebar />

      {/* RIGHT SIDE */}
      <section className="flex-1 bg-surface flex flex-col items-center justify-center p-6 sm:p-10 lg:p-gutter">
        <AuthForm activeTab={activeTab} setActiveTab={setActiveTab} />
      </section>
    </main>
  );
};

export default AuthPage;
