import { Navigate, useRoutes } from "react-router-dom";
// layouts
import MainLayout from "src/layouts/main";
import { mainRoutes, HomePage } from "./main";
import { authRoutes } from "./auth";
import { authDemoRoutes } from "./auth-demo";
import { dashboardRoutes } from "./dashboard";
import { DashboardUser } from "./User/DashboardUser";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },

    // Auth routes
    ...authRoutes,
    ...authDemoRoutes,

    // Dashboard routes
    ...dashboardRoutes,
    ...DashboardUser,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: "*", element: <Navigate to="/404" replace /> },

    // forbidden
    { path: "*", element: <Navigate to="/403" replace /> },
  ]);
}
