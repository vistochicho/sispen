import React from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button"; // Import ShadCN button
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";

// Dummy data untuk paket
const packages = [
  {
    packageName: "Basic Package",
    isActive: "active",
    price: "$50",
  },
  {
    packageName: "Standard Package",
    isActive: "active",
    price: "$100",
  },
  {
    packageName: "Premium Package",
    isActive: "active",
    price: "$200",
  },
  {
    packageName: "Enterprise Package",
    isActive: "active",
    price: "$500",
  },
  {
    packageName: "Custom Package",
    isActive: "active",
    price: "Varies",
  },
];

const TablePackage = () => {
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
            Add Package
          </Button>
        </div>
        <Input className="w-64" type="text" placeholder="Search Package Name" />
      </div>

      {/* Table Section */}
      <Table className="border border-zinc-100">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead>Package Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg, index) => (
            <TableRow key={index}>
              <TableCell className="border border-zinc-200">{pkg.packageName}</TableCell>
              <TableCell className="border border-zinc-200">{pkg.price}</TableCell>
              <TableCell className="border border-zinc-200">
                {/* design pake badge */}
                {pkg.isActive}
              </TableCell>
              <TableCell className="text-center border border-zinc-200 space-x-2">
                <Button variant="outline" size="sm">
                  Detail
                </Button>
                <Button variant="outline" size="sm">
                  Update
                </Button>
                <Button variant="outline" size="sm">
                  Delete
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

export default TablePackage;
