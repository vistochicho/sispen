import { auth } from "@/auth";
import React from "react";
import InvoiceUser from "./components/invoice-user";
import InvoiceAdmin from "./components/invoice-admin";

const Invoice = async () => {
  const session = await auth();
  return (
    <div>
      <div className="p-6">{session?.user.role === "users" ? <InvoiceUser /> : <InvoiceAdmin />}</div>
    </div>
  );
};

export default Invoice;
