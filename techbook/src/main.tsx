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

const router = createBrowserRouter([
  // ✅ Route publique
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },

  // ✅ Routes protégées
  {
    element: <ProtectedRoute children={<TechnologiesLayout />} />,
    children: [
      {
        element: <TechnologiesLayout />,
        children: [
          { path: "/", element: <App /> },
          { path: "/add", element: <TechnologyForm /> },
          { path: "/edit/:id", element: <TechnologyForm /> },
        ],
      },
    ],
  },
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
