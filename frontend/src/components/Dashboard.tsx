import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { User } from "../utils/users";
import { forwardRef } from "react";
import { ColDef } from "ag-grid-community";

interface DashboardProps {
  data: User[];
  cols: ColDef[];
}

const Dashboard = forwardRef<AgGridReact<User>, DashboardProps>(
  ({ data, cols }, ref) => {
    return (
      <section className="ag-theme-quartz flex-1">
        <AgGridReact<User>
          ref={ref}
          rowData={data}
          columnDefs={cols}
          rowSelection="multiple"
        />
      </section>
    );
  },
);

export default Dashboard;
