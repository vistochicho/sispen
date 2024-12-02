import React from "react";
import TableClientList from "./components/table-client-list";

const ClientList = () => {
  // page.tsx di biasain jadiin server component, jadi buat ambil data
  return (
    <main className="bg-white h-auto">
      <div className="p-6">
        <TableClientList />
      </div>
    </main>
  );
};

export default ClientList;
