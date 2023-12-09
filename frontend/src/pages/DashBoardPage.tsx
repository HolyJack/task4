import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

interface User {
  username: string;
  createdAt: string;
  signinAt: string;
  active: string;
}

function parseDataToUsers(res: AxiosResponse) {
  const users: User[] = (res.data as User[]).map(
    ({ username, createdAt, signinAt, active }) => ({
      username,
      createdAt: new Date(createdAt).toString(),
      signinAt: signinAt ? new Date(signinAt).toString() : "never",
      active,
    }),
  );
  return users;
}

function parseUserToCols(users: User[]) {
  const columns = Object.keys(users[0]).map((col, i) => ({
    field: col,
    checkboxSelection: i === 0 ? true : false,
    headerCheckboxSelection: i === 0 ? true : false,
  }));
  return columns;
}

export default function DashboardPage() {
  const gridRef = useRef<AgGridReact<User>>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [colDef, setColDef] = useState<ColDef[]>([]);
  const [cookies] = useCookies(["connect.sid"]);

  const fetchUsers = useCallback(async () => {
    if (!cookies["connect.sid"]) return;
    try {
      const res = await axios.get("users");
      const users = parseDataToUsers(res);
      const columns = parseUserToCols(users);
      setUsers(users);
      setColDef(columns);
    } catch (err) {
      if (axios.isAxiosError(err)) window.alert(err.response?.data?.message);
      else console.log(err);
    }
  }, [cookies]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  async function updateStatus(active: boolean) {
    const selected = gridRef.current?.api.getSelectedRows();
    if (!selected) return;

    try {
      const usernames = selected.map((row) => row.username);

      await axios.patch("users", {
        data: { usernames, active },
      });
      await fetchUsers();
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
      await axios.delete("users", {
        data: { usernames },
      });
      await fetchUsers();
    } catch (err) {
      if (err) console.log(err);
    }
  }

  if (cookies["connect.sid"] && users && colDef) {
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

  if (!cookies["connect.sid"])
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
