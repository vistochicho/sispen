import React from "react";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button"; // Import ShadCN button

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import Link from "next/link";

interface ClientProps {
  dataClient: GetClientList[];
}

const TableClientList = ({ dataClient }: ClientProps) => {
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
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataClient.map(
            (company, index) =>
              company.status === "Finished" && (
                <TableRow key={index}>
                  <TableCell className="font-medium border-zinc-200">{company.company_name}</TableCell>
                  <TableCell className="border border-zinc-200">{company.full_name}</TableCell>
                  <TableCell className="border border-zinc-200">{company.company_type}</TableCell>
                  <TableCell className="border border-zinc-200">{company.email}</TableCell>
                  <TableCell className="border border-zinc-200">{company.phone_number}</TableCell>
                  <TableCell className="border border-zinc-200">{company.status}</TableCell>
                  <TableCell className="text-center border-zinc-200">
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" className="bg-blue-400 text-white">
                        Approve
                      </Button>
                      <Link href={`/dashboard/customer/detail-customer/${company.id}`}>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )
          )}
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

export default TableClientList;
