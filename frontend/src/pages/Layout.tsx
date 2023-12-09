import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SignOut from "../components/SignOut";

export default function Layout() {
  const navLinkStyle =
    "flex h-12 w-32 items-center justify-center hover:bg-blue-400 hover:text-white active:bg-blue-400";

  return (
    <div className="flex h-screen w-screen flex-col">
      <header
        className="flex h-12 w-full items-center justify-between border-b bg-gray-100
        shadow"
      >
        <nav className="flex">
          <NavLink className={navLinkStyle} to="/">
            Home
          </NavLink>
          <NavLink className={navLinkStyle} to="/dashboard">
            Dashboard
          </NavLink>
        </nav>
        <SignOut />
      </header>
      <main className="h-[calc(100%-3rem)] w-full">
        <div className="container mx-auto h-full py-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
