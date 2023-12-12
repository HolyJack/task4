import { Form } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function SignOut({ className }: { className?: string }) {
  const auth = useAuth();

  const signButtonStyle =
    "flex h-12 w-32 items-center justify-center bg-gray-400 text-white hover:bg-blue-400" +
    className;

  if (auth.status)
    return (
      <Form method="post" action="signout">
        <button type="submit" className={signButtonStyle}>
          Sign Out
        </button>
      </Form>
    );

  return (
    <a className={signButtonStyle} href="/">
      Sign in
    </a>
  );
}
