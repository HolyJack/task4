import { ActionFunction, redirect } from "react-router-dom";
import usersApi from "../utils/users";

export const unblockAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const selected = formData.getAll("selected") as string[];
  selected && (await usersApi.update({ selected, active: true }));
  return redirect("/dashboard");
};

export const blockAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const selected = formData.getAll("selected") as string[];
  selected && (await usersApi.update({ selected, active: false }));
  return redirect("/dashboard");
};

export const deleteAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const selected = formData.getAll("selected") as string[];
  selected && (await usersApi.delete(selected));
  return redirect("/dashboard");
};
