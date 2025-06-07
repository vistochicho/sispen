import React from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button"; // Import ShadCN button
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";

// Dummy data untuk user management
const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+62 812 3456 7890",
    gender: "Male",
    status: "Active",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+62 813 9876 5432",
    gender: "Female",
    status: "Inactive",
  },
  {
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phoneNumber: "+62 821 2345 6789",
    gender: "Female",
    status: "Active",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phoneNumber: "+62 822 5678 1234",
    gender: "Male",
    status: "Pending",
  },
  {
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phoneNumber: "+62 823 4567 8910",
    gender: "Female",
    status: "Active",
  },
];

const TableUserManagement = () => {
  return (
    <div className="p-4">
      {/* Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between items-center gap-4">
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
          <Button variant="outline" size="sm">
            Add Admin
          </Button>
        </div>
        <Input className="w-64" type="text" placeholder="Search Name or Email" />
      </div>

      {/* Table Section */}
      <Table className="border border-zinc-100">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="border border-zinc-200">{user.name}</TableCell>
              <TableCell className="border border-zinc-200">{user.email}</TableCell>
              <TableCell className="border border-zinc-200">{user.phoneNumber}</TableCell>
              <TableCell className="border border-zinc-200">{user.gender}</TableCell>
              <TableCell className="border border-zinc-200">{user.status}</TableCell>
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

export default TableUserManagement;
