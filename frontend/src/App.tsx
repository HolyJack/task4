import MainPage from "./pages/MainPage";
import "./index.css";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./pages/Layout";
import axios from "./utils/axios";
import { User } from "./utils/users";
import {
  blockAction,
  deleteAction,
  unblockAction,
} from "./actions/usersActions";
import {
  signinAction,
  signoutAction,
  signupAction,
} from "./actions/authAction";
import { useAuth } from "./context/authContext";
import { useMemo } from "react";

export default function App() {
  const auth = useAuth();
  const router = useMemo(
    () =>
      createBrowserRouter([
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
                    auth.logout();
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
        {
          path: "/signin",
          action: signinAction(auth),
        },
        {
          path: "/signout",
          action: signoutAction(auth),
        },
        {
          path: "/signup",
          action: signupAction,
        },
      ]),
    [auth],
  );

  return <RouterProvider router={router} />;
}
