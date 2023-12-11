import { AxiosResponse } from "axios";
import axios from "./axios";

export interface User {
  username: string;
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
    console.log(err);
  }
}

async function updateUsers(data: any) {
  try {
    const res = await axios.patch("users", {
      data: data,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function deleteUsers(usernames: string[]) {
  try {
    const res = await axios.delete("users", {
      data: { usernames },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

const usersApi = { get: getUsers, update: updateUsers, delete: deleteUsers };

export default usersApi;
