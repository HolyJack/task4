import { Fragment, useRef } from "react";
import Dashboard from "./Dashboard";
import usersApi, { User } from "../utils/users";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Form, useRevalidator } from "react-router-dom";

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

export default function DashboardControl({ users }: { users: User[] }) {
  const revalidator = useRevalidator();
  const cols: ColDef[] = parseUsersToCols(users);
  const dashboardRef = useRef<AgGridReact<User>>(null);

  async function updateStatus(active: boolean) {
    const selected = dashboardRef.current?.api.getSelectedRows();
    if (!selected) return;

    const usernames = selected.map((row) => row.username);
    const data = { usernames, active };
    await usersApi.update(data);
    revalidator.revalidate();
  }

  function blockHandler() {
    updateStatus(false);
  }

  function unblockHandler() {
    updateStatus(true);
  }

  async function deleteHandler() {
    const selected = dashboardRef.current?.api.getSelectedRows();
    if (!selected) return;
    const usernames = selected.map((row) => row.username);
    await usersApi.delete(usernames);
    revalidator.revalidate();
  }

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex gap-2">
        <Form method="patch" action="block" onSubmit={blockHandler}>
          <button
            type="submit"
            className="h-12 w-32 rounded-md border hover:bg-gray-300/20"
          >
            Block
          </button>
        </Form>
        <Form method="patch" action="unblock" onSubmit={unblockHandler}>
          <button
            type="submit"
            className="h-12 w-32 rounded-md border hover:bg-gray-300/20"
          >
            Unblock
          </button>
        </Form>
        <Form method="delete" action="delete" onSubmit={deleteHandler}>
          <button
            type="submit"
            className="h-12 w-32 rounded-md border bg-red-500 text-white hover:bg-red-500/80"
          >
            Delete
          </button>
        </Form>
      </div>
      <Dashboard data={users} cols={cols} ref={dashboardRef} />
    </div>
  );
}
