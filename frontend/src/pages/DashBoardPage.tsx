import { useLoaderData } from "react-router-dom";
import DashboardControl from "../components/DashboardControl";

export default function DashboardPage() {
  const users = useLoaderData();
  return <DashboardControl users={users} />;
}
