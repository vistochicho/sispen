import React from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button"; // Import ShadCN button

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";

// Dummy data sesuai dengan header tabel
const companies = [
  {
    name: "Tech Solutions Ltd.",
    applicant: "John Doe",
    businessEntity: "LLC",
    email: "john.doe@example.com",
    phoneNumber: "+62 812 3456 7890",
    businessField: "Software Development",
  },
  {
    name: "Green Energy Corp.",
    applicant: "Jane Smith",
    businessEntity: "Corporation",
    email: "jane.smith@example.com",
    phoneNumber: "+62 813 9876 5432",
    businessField: "Renewable Energy",
  },
  {
    name: "Fresh Foods Co.",
    applicant: "Emily Johnson",
    businessEntity: "Partnership",
    email: "emily.johnson@example.com",
    phoneNumber: "+62 821 2345 6789",
    businessField: "Food and Beverage",
  },
  {
    name: "AutoTech Inc.",
    applicant: "Michael Brown",
    businessEntity: "Corporation",
    email: "michael.brown@example.com",
    phoneNumber: "+62 822 5678 1234",
    businessField: "Automotive Technology",
  },
  {
    name: "EduPro Ltd.",
    applicant: "Sarah Williams",
    businessEntity: "LLC",
    email: "sarah.williams@example.com",
    phoneNumber: "+62 823 4567 8910",
    businessField: "Education Services",
  },
];

const TableNeedReview = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between  items-center mb-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pagination" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Pagination</SelectLabel>
              <SelectItem value="5 ">Show 5</SelectItem>
              <SelectItem value="10">Show 10</SelectItem>
              <SelectItem value="25">Show 25</SelectItem>
              <SelectItem value="50">Show 50</SelectItem>
              <SelectItem value="100">Show 100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input className="w-64" type="text" placeholder="Search Applicant" />
      </div>
      <Table className="border border-zinc-100">
        <TableHeader>
          <TableRow className="bg-gray-200 ">
            <TableHead>Name of Company</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Selected Business Entities</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Business Field</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium border-zinc-200">{company.name}</TableCell>
              <TableCell className="border border-zinc-200">{company.applicant}</TableCell>
              <TableCell className="border border-zinc-200">{company.businessEntity}</TableCell>
              <TableCell className="border border-zinc-200">{company.email}</TableCell>
              <TableCell className="border border-zinc-200">{company.phoneNumber}</TableCell>
              <TableCell className="border border-zinc-200">{company.businessField}</TableCell>
              <TableCell className="text-center border-zinc-200 space-x-2">
                <Button variant="outline" size="sm">
                  Detail
                </Button>
                <Button variant="outline" size="sm">
                  Finish
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

export default TableNeedReview;
