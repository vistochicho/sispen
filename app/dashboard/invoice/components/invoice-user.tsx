import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Import ShadCN button
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// Dummy data sesuai dengan header tabel
const requests = [
  {
    invoice: "INV-101",
    companyName: "Tech Solutions Ltd.",
    price: "$1,000.00",
    date: "2024-12-01",
    status: "Paid",
  },
  {
    invoice: "INV-102",
    companyName: "Global Corp.",
    price: "$2,500.00",
    date: "2024-12-02",
    status: "Pending",
  },
  {
    invoice: "INV-103",
    companyName: "Innovatech Inc.",
    price: "$3,750.00",
    date: "2024-12-03",
    status: "Overdue",
  },
  {
    invoice: "INV-104",
    companyName: "NextGen Enterprises",
    price: "$1,800.00",
    date: "2024-12-04",
    status: "Paid",
  },
  {
    invoice: "INV-105",
    companyName: "Prime Dynamics",
    price: "$4,200.00",
    date: "2024-12-05",
    status: "Pending",
  },
];

const InvoiceUser = () => {
  return (
    <div className="p-4">
      <div className="space-y-2 pb-6">
        <h2 className="font-semibold text-lg leading-7">Billing & Invoices</h2>
        <p className="text-sm">
          View and manage your invoices with ease. Track payment statuses, review details, and stay updated on your billing history, all in one place.
        </p>
      </div>

      {/* Header with Pagination and Search */}
      <div className="flex justify-between items-center mb-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pagination" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Pagination</SelectLabel>
              <SelectItem value="5">Show 5</SelectItem>
              <SelectItem value="10">Show 10</SelectItem>
              <SelectItem value="25">Show 25</SelectItem>
              <SelectItem value="50">Show 50</SelectItem>
              <SelectItem value="100">Show 100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input className="w-64" type="text" placeholder="Search Applicant" />
      </div>

      {/* Table */}
      <Table className="border border-zinc-200">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead>Invoice</TableHead>
            <TableHead>Name of Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={index}>
              <TableCell className="border border-zinc-200">{request.invoice}</TableCell>
              <TableCell className="border border-zinc-200">{request.companyName}</TableCell>
              <TableCell className="border border-zinc-200">{request.price}</TableCell>
              <TableCell className="border border-zinc-200">{request.date}</TableCell>
              <TableCell className="border border-zinc-200">{request.status}</TableCell>
              <TableCell className="text-center border border-zinc-200">
                <Link href="/dashboard/invoice/detail-invoice/id">
                  <Button variant="outline" size="sm">
                    Detail
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Footer */}
      <div className="mt-10">
        <div className="flex justify-between items-center">
          <p className="text-sm">Page 1 of 50 Rows</p>
          <div className="flex gap-4 items-center">
            <button className="border border-zinc-200 py-2 px-4 rounded-sm">Previous</button>
            <button className="border border-zinc-200 py-2 px-4 rounded-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceUser;