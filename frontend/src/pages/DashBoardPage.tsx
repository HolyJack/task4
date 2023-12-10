import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { authGetStatus, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  createdAt: string;
  signinAt: string;
  active: string;
}

function parseDataToUsers(res: AxiosResponse) {
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

function parseUsersToCols(users: User[]) {
  const columns = users.length
    ? Object.keys(users[0]).map((col, i) => ({
        field: col,
        checkboxSelection: i === 0 ? true : false,
        headerCheckboxSelection: i === 0 ? true : false,
      }))
    : [];
  return columns;
}

export default function DashboardPage() {
  const gridRef = useRef<AgGridReact<User>>(null);
  const [users, setUsers] = useState<User[]>([]);
  const colDef: ColDef[] = parseUsersToCols(users);
  const authStatus = authGetStatus();
  const nav = useNavigate();

  const logoutFromDashboard = useCallback(() => {
    logout();
    nav("/");
  }, [nav]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get("users");
      if (res.status === 401) {
        logoutFromDashboard();
        return;
      }
      return parseDataToUsers(res);
    } catch (err) {
      if (axios.isAxiosError(err)) window.alert(err.response?.data?.message);
      else console.log(err);
    }
  }, [logoutFromDashboard]);

  const getUsers = useCallback(async () => {
    const users = await fetchUsers();
    setUsers(users || []);
  }, [fetchUsers]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  async function updateStatus(active: boolean) {
    const selected = gridRef.current?.api.getSelectedRows();
    if (!selected) return;

    try {
      const usernames = selected.map((row) => row.username);

      const res = await axios.patch("users", {
        data: { usernames, active },
      });
      if (res.status === 401) {
        logoutFromDashboard();
        return;
      }
      await getUsers();
    } catch (err) {
      if (axios.isAxiosError(err)) window.alert(err.response?.data?.message);
      else console.log(err);
    }
  }

  function blockHandler() {
    updateStatus(false);
  }

  function unblockHandler() {
    updateStatus(true);
  }

  async function deleteHandler() {
    const selected = gridRef.current?.api.getSelectedRows();
    if (!selected) return;
    try {
      const usernames = selected.map((row) => row.username);
      const res = await axios.delete("users", {
        data: { usernames },
      });
      if (res.status === 401) {
        logoutFromDashboard();
        return;
      }

      await getUsers();
    } catch (err) {
      if (err) console.log(err);
    }
  }

  if (authStatus && users && colDef) {
    return (
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={blockHandler}
            className="h-12 w-32 rounded-md border hover:bg-gray-300/20"
          >
            Block
          </button>
          <button
            onClick={unblockHandler}
            className="h-12 w-32 rounded-md border hover:bg-gray-300/20"
          >
            Unblock
          </button>
          <button
            onClick={deleteHandler}
            className="h-12 w-32 rounded-md border bg-red-500 text-white hover:bg-red-500/80"
          >
            Delete
          </button>
        </div>
        <section className="ag-theme-quartz flex-1">
          <AgGridReact<User>
            ref={gridRef}
            rowData={users}
            columnDefs={colDef}
            rowSelection="multiple"
          />
        </section>
      </div>
    );
  }

  if (!authStatus)
    return (
      <div className="flex w-full justify-center p-2">
        <p className="font-semibold">You have to sign in!</p>
      </div>
    );

  return (
    <div className="flex w-full justify-center p-2">
      <p className="font-semibold">Loading!</p>
    </div>
  );
}
