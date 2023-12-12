import { Form } from "react-router-dom";
import { authGetStatus } from "../utils/auth";

export default function SignOut({ className }: { className?: string }) {
  const authStatus = authGetStatus();

  const signButtonStyle =
    "flex h-12 w-32 items-center justify-center hover:bg-blue-400 hover:text-white " +
    className;

  if (authStatus)
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
