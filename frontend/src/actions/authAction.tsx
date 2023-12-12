import { ActionFunction, redirect } from "react-router-dom";
import axios from "../utils/axios";
import { AuthContextValues } from "../context/authContext";

export function signinAction(auth: AuthContextValues) {
  const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await axios.post("/signin", { username, password });
      console.log(res.data.user);
      auth.login(res.data.user);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data)
        window.alert(err.response.data.message);
    }
    return redirect("/");
  };
  return action;
}

export function signoutAction(auth: AuthContextValues) {
  const action: ActionFunction = async () => {
    try {
      await axios.delete("/signout");
      auth.logout();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data)
        window.alert(err.response.data.message);
    }
    return redirect("/");
  };
  return action;
}

export const signupAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");
  try {
    await axios.post("/signup", { username, password, email });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data)
      window.alert(err.response.data.message);
    else console.log(err);
  }
  return redirect("/");
};
