import React from "react";
import { Outlet, useParams } from "react-router-dom";

function Dashboard() {
  const { userId } = useParams();

  return (
    <div>
      {/* Sostituisci la scritta Dashboard con "Momentum" */}
      <h1>Momentum</h1>
      <Outlet />
    </div>
  );
}

export default Dashboard;
