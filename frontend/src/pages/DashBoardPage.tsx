import { authGetStatus } from "../utils/auth";
import DashboardControl from "../components/DashboardControl";
import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const authStatus = authGetStatus();

  if (!authStatus) return <Navigate to="/" />;
  return <DashboardControl />;
}
