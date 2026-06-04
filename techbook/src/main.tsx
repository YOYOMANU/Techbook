import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner";
import TechnologyForm from "./pages/technology-form.tsx";
import TechnologiesLayout from "./layout/TechnologiesLayout.tsx";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Register from "./pages/Register.tsx";
import ProfilePage from "./pages/Profile.tsx";
import NotFoundPage from "./pages/NotFound.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

const router = createBrowserRouter([
  // ✅ Routes publiques
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },

  // ✅ Routes protégées — un seul niveau de layout
  {
    element: <ProtectedRoute />,         // ProtectedRoute rend <Outlet /> si auth OK
    errorElement: <ErrorBoundary />,     // ← errorElement sur le parent, pas les enfants
    children: [
      {
        element: <TechnologiesLayout />, // ← un seul TechnologiesLayout
        children: [
          { path: "/", element: <App /> },
          { path: "/add", element: <TechnologyForm /> },
          { path: "/edit/:id", element: <TechnologyForm /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster closeButton position="top-center" richColors />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);