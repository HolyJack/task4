import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SignOut from "../components/SignOut";
import { useAuth } from "../context/authContext";

export default function Layout() {
  const auth = useAuth();
  const navLinkStyle =
    "flex h-12 w-32 items-center justify-center hover:bg-blue-400 hover:text-white active:bg-blue-400";

  return (
    <div className="flex h-screen w-screen flex-col">
      <header
        className="flex h-12 w-full items-center justify-between border-b bg-gray-100
        shadow"
      >
        <nav className="flex">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${navLinkStyle} bg-blue-400/80 text-white`
                : navLinkStyle
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${navLinkStyle} bg-blue-400/80 text-white`
                : navLinkStyle
            }
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </nav>
        <div className="flex items-center">
          {auth.status && (
            <p className="w-32 justify-center capitalize">{`Welcome, ${auth.username}!`}</p>
          )}
          <SignOut />
        </div>
      </header>
      <main className="h-[calc(100%-3rem)] w-full">
        <div className="container mx-auto h-full py-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
