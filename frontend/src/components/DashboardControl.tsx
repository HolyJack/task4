import { useRef, useState } from "react";
import Dashboard from "./Dashboard";
import { User } from "../utils/users";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faTrash } from "@fortawesome/free-solid-svg-icons";

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
  const cols: ColDef[] = parseUsersToCols(users);
  const dashboardRef = useRef<AgGridReact<User>>(null);
  const [selected, setSelected] = useState<string[]>([]);

  function getSelected() {
    return dashboardRef.current?.api
      .getSelectedRows()
      .map((row) => row.username);
  }

  function changeSelection() {
    const selected = getSelected();
    setSelected(selected || []);
  }

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex gap-2">
        <Form method="post" action="block">
          <input name="selected" value={selected} hidden readOnly />
          <button
            type="submit"
            className="h-12 w-32 rounded-md border shadow hover:bg-gray-300/20"
          >
            <FontAwesomeIcon icon={faLock} /> Block
          </button>
        </Form>
        <Form method="post" action="unblock">
          <input name="selected" value={selected} hidden readOnly />
          <button
            type="submit"
            className="h-12 w-12 rounded-md border shadow hover:bg-gray-300/20"
          >
            <FontAwesomeIcon icon={faLockOpen} />
          </button>
        </Form>
        <Form method="post" action="delete">
          <input name="selected" value={selected} hidden readOnly />
          <button
            type="submit"
            className="flex h-12 w-12 items-center justify-center rounded-md
            border bg-red-500 text-white shadow hover:bg-red-500/80"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </Form>
      </div>
      <Dashboard
        data={users}
        cols={cols}
        ref={dashboardRef}
        onSelectedChange={changeSelection}
      />
    </div>
  );
}
