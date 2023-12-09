import { useNavigate } from "react-router-dom";
import FormSubmit from "./FormSubmit";
import axios from "../utils/axios";

export default function SignIn() {
  const navigate = useNavigate();

  async function signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      await axios.post("signin", {
        username,
        password,
      });
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) window.alert(err.response?.data?.message);
      else console.log(err);
    }
  }

  function signinAction(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    signIn({ username, password });
  }

  return (
    <form
      //@ts-expect-error: experimental feature
      action={signinAction}
      className="flex flex-1 flex-col gap-5 px-20 py-10"
    >
      <h2 className="text-center text-xl font-semibold">Sign in</h2>
      <div className="flex flex-1 flex-col gap-1">
        <input
          className="rounded-sm px-1.5 py-0.5 text-sm shadow
            placeholder:text-gray-300 focus:placeholder:text-transparent"
          name="username"
          type="text"
          placeholder="Username"
          required
        />
        <input
          className="rounded-sm px-1.5 py-0.5 text-sm shadow
            placeholder:text-gray-300 focus:placeholder:text-transparent"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <FormSubmit />
    </form>
  );
}
