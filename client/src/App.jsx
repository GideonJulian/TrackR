import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Layouts from "./Layouts/Layouts";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./Layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layouts />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },

    // Dashboard routes
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <DashboardHome />,
        },
      ],
    }
  ]);

  return <RouterProvider router={route} />;
};

export default App;
