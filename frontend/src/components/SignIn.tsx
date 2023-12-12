import { Form } from "react-router-dom";
import FormSubmit from "./FormSubmit";

export default function SignIn() {
  return (
    <Form
      method="post"
      action="signin"
      className="flex flex-1 flex-col gap-5 px-20 py-10"
    >
      <h2 className="text-center text-xl font-semibold">Sign in</h2>
      <div className="flex flex-1 flex-col gap-1">
        <input
          className="rounded-sm px-1.5 py-0.5 text-sm shadow
            placeholder:text-gray-300 focus:placeholder:text-transparent"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Username"
          required
        />
        <input
          className="rounded-sm px-1.5 py-0.5 text-sm shadow
            placeholder:text-gray-300 focus:placeholder:text-transparent"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          required
        />
      </div>
      <FormSubmit />
    </Form>
  );
}
