import { redirect } from "react-router-dom";
import { authGetStatus } from "../utils/auth";
import DashboardControl from "../components/DashboardControl";

export default function DashboardPage() {
  const authStatus = authGetStatus();

  if (!authStatus) return redirect("/");
  return <DashboardControl />;
}
