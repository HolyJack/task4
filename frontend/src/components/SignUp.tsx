import { Form } from "react-router-dom";
import FormSubmit from "./FormSubmit";

export default function SignUp() {
  return (
    <Form
      method="post"
      action="signup"
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
          autoComplete="username"
          placeholder="Username"
          required
        />

        <input
          className="rounded-sm px-1.5 py-0.5 text-sm shadow
            placeholder:text-gray-300 focus:placeholder:text-transparent"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="E-mail"
          required
        />

        <input
          className="rounded-sm px-1.5 py-0.5 text-sm shadow
            placeholder:text-gray-300 focus:placeholder:text-transparent"
          name="password"
          type="password"
          autoComplete="password"
          placeholder="Password"
          required
        />
      </div>
      <FormSubmit />
    </Form>
  );
}
