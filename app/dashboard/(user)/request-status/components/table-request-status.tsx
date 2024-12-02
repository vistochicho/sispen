import React from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button"; // Import ShadCN button
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Dummy data sesuai dengan header tabel
const requests = [
  {
    applicant: "John Doe",
    address: "123 Main St, Jakarta",
    phoneNumber: "+62 812 3456 7890",
    businessEntity: "LLC",
    status: "Pending",
  },
  {
    applicant: "Jane Smith",
    address: "456 Greenway, Surabaya",
    phoneNumber: "+62 813 9876 5432",
    businessEntity: "Corporation",
    status: "Approved",
  },
  {
    applicant: "Emily Johnson",
    address: "789 Fresh St, Bandung",
    phoneNumber: "+62 821 2345 6789",
    businessEntity: "Partnership",
    status: "Rejected",
  },
  {
    applicant: "Michael Brown",
    address: "101 Tech Lane, Bali",
    phoneNumber: "+62 822 5678 1234",
    businessEntity: "Corporation",
    status: "Pending",
  },
  {
    applicant: "Sarah Williams",
    address: "202 Edu Rd, Yogyakarta",
    phoneNumber: "+62 823 4567 8910",
    businessEntity: "LLC",
    status: "Approved",
  },
];

const TableRequestStatus = () => {
  return (
    <div className="p-4">
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
            <TableHead>Applicant</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Selected Business Entities</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={index}>
              <TableCell className="border border-zinc-200">{request.applicant}</TableCell>
              <TableCell className="border border-zinc-200">{request.address}</TableCell>
              <TableCell className="border border-zinc-200">{request.phoneNumber}</TableCell>
              <TableCell className="border border-zinc-200">{request.businessEntity}</TableCell>
              <TableCell className="border border-zinc-200">{request.status}</TableCell>
              <TableCell className="text-center border border-zinc-200">
                <Button variant="outline" size="sm">
                  Detail
                </Button>
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

export default TableRequestStatus;
