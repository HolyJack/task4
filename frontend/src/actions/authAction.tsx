import { ActionFunction, redirect } from "react-router-dom";
import axios from "../utils/axios";
import { login, logout } from "../utils/auth";

export const signinAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  try {
    await axios.post("/signin", { username, password });
    login();
    return redirect("/dashboard");
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.statusText)
      window.alert(err.response.statusText);
  }
  return redirect("/");
};

export const signoutAction: ActionFunction = async () => {
  try {
    await axios.delete("/signout");
    logout();
    return redirect("/");
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.statusText)
      window.alert(err.response.statusText);
  }
  return redirect("/");
};

export const signupAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");
  try {
    await axios.post("/signup", { username, password, email });
    return redirect("/");
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.statusText)
      window.alert(err.response.statusText);
    else console.log(err);
  }
  return redirect("/");
};
