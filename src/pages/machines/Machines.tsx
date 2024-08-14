import React from "react";
import MachinesTable from "../../components/machines/MachinesTable";
import "./index.css";

const Machines: React.FC = () => {
  return (
    <div className="table-wrapper bg-gray-700">
      <MachinesTable />
    </div>
  );
};

export default Machines;
