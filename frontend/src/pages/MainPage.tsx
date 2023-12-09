import { useCookies } from "react-cookie";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import SignOut from "../components/SignOut";

export default function MainPage() {
  const [cookies] = useCookies(["connect.sid"]);

  if (cookies["connect.sid"])
    return (
      <div className="flex w-full justify-center">
        <SignOut className="rounded-md border shadow" />
      </div>
    );

  return (
    <section className="flex flex-col rounded-md shadow md:flex-row">
      <SignIn />
      <div className="flex flex-row items-center md:flex-col">
        <div className="flex-1 border-l border-t" />
        <p className="m-1 text-center text-xl text-blue-400">OR</p>
        <div className="flex-1 border-l border-t" />
      </div>
      <SignUp />
    </section>
  );
}
