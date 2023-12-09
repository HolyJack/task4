import ReactDOM from "react-dom/client";
import MainPage from "./pages/MainPage";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashBoardPage";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
