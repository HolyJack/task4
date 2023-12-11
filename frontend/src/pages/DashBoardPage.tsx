import { useLoaderData } from "react-router-dom";
import DashboardControl from "../components/DashboardControl";
import { User } from "../utils/users";

export default function DashboardPage() {
  const users: User[] = useLoaderData() as User[];
  return <DashboardControl users={users} />;
}
