import ReactDOM from "react-dom/client";
import MainPage from "./pages/MainPage";
import "./index.css";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "./pages/DashBoardPage";
import Layout from "./pages/Layout";
import axios from "./utils/axios";
import { User } from "./utils/users";
import { logout } from "./utils/auth";
import { blockAction, deleteAction, unblockAction } from "./actions/actions";

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
        loader: async () => {
          try {
            const res = await axios.get("users");
            if (res.data) return res.data as User[];
          } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
              logout();
              return redirect("/");
            } else {
              console.log(err);
            }
          }
          return null;
        },
        children: [
          {
            path: "delete",
            action: deleteAction,
          },

          {
            path: "block",
            action: blockAction,
          },

          {
            path: "unblock",
            action: unblockAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
