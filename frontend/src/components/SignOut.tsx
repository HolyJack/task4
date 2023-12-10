import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authStatus, logout } from "../utils/auth";

export default function SignOut({ className }: { className?: string }) {
  const navigate = useNavigate();

  async function signOut() {
    try {
      await axios.delete("signout");
      logout();
      navigate(0);
    } catch (err) {
      if (axios.isAxiosError(err)) window.alert(err.response?.data?.message);
      else console.log(err);
    }
  }

  const signButtonStyle =
    "flex h-12 w-32 items-center justify-center hover:bg-blue-400 hover:text-white " +
    className;

  if (authStatus())
    return (
      <button className={signButtonStyle} onClick={signOut}>
        Sign Out
      </button>
    );

  return (
    <a className={signButtonStyle} href="/">
      Sign in
    </a>
  );
}
