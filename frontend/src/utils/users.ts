import { AxiosResponse } from "axios";
import axios from "./axios";

export interface User {
  username: string;
  email: string;
  createdAt: string;
  signinAt: string;
  active: string;
}

function parseResToUsers(res: AxiosResponse) {
  const users: User[] =
    res.data &&
    (res.data as User[]).map(({ username, createdAt, signinAt, active }) => ({
      username,
      createdAt: new Date(createdAt).toString(),
      signinAt: signinAt ? new Date(signinAt).toString() : "never",
      active,
    }));
  return users;
}

async function getUsers() {
  try {
    const res = await axios.get("users");
    return parseResToUsers(res);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data)
      window.alert(err.response.data.message);
  }
}

async function updateUsers(params: { usernames: string[]; active: boolean }) {
  try {
    await axios.patch("users", {
      data: { ...params },
    });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data)
      window.alert(err.response.data.message);
  }
}

async function deleteUsers(params: { usernames: string[] }) {
  try {
    await axios.delete("users", {
      data: { ...params },
    });
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data)
      window.alert(err.response.data.message);
  }
}

const usersApi = { get: getUsers, update: updateUsers, delete: deleteUsers };

export default usersApi;
