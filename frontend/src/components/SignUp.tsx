import FormSubmit from "./FormSubmit";
import axios from "../utils/axios";

export default function SignUp() {
  async function register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    try {
      const res = await axios.post("/signup", {
        username,
        password,
        email,
      });
      window.alert(`User ${res.data.username} created successfully.`);
    } catch (err) {
      if (axios.isAxiosError(err)) window.alert(err.response?.data?.message);
      else console.log(err);
    }
  }

  function signupAction(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    register({ username, email, password });
  }

  return (
    <form
      //@ts-expect-error: experimental feature
      action={signupAction}
      className="flex flex-1 flex-col justify-evenly gap-5
        px-20 py-10"
    >
      <h2 className="text-center text-xl font-semibold">Register</h2>
      <div className="flex flex-1 flex-col gap-1.5">
        <input
          className="rounded-sm px-1.5 py-0.5 text-sm shadow
            placeholder:text-gray-300 focus:placeholder:text-transparent"
          type="text"
          name="username"
          placeholder="Username"
          required
        />

        <input
          className="rounded-sm px-1.5 py-0.5 text-sm shadow
            placeholder:text-gray-300 focus:placeholder:text-transparent"
          type="email"
          name="email"
          placeholder="E-mail"
          required
        />

        <input
          className="rounded-sm px-1.5 py-0.5 text-sm shadow
            placeholder:text-gray-300 focus:placeholder:text-transparent"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <FormSubmit />
    </form>
  );
}
