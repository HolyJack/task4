import { useLoaderData } from "react-router-dom";
import DashboardControl from "../components/DashboardControl";
import { User } from "../utils/users";

function formatDateString(date: string) {
  return new Date(date).toDateString();
}

export default function DashboardPage() {
  const users: User[] = (useLoaderData() as User[]).map((user) => ({
    username: user.username,
    email: user.email,
    createdAt: formatDateString(user.createdAt),
    signinAt: formatDateString(user.signinAt),
    active: user.active,
  }));
  return <DashboardControl users={users} />;
}
