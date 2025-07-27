"use client";
import React, { useState } from "react";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button"; // Import ShadCN button

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

interface ClientProps {
  dataClient: GetClientList[];
}

const TableCustomer = ({ dataClient }: ClientProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/client/delete/?id=${id}`);

      if (response.status === 200) {
        setNotification({ type: "success", message: "Client deleted successfully!" });
        router.refresh();
      }
    } catch (error: any) {
      setIsLoading(false);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleSubmit = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/client/patch/${id}`, {
        applicant_id: id,
        p_status: "On Review",
      });

      if (response.status === 200) {
        setNotification({ type: "success", message: "Customer Approved Successfully!" });

        toast.success("Customer Successfully Approved!");
        router.refresh();
      }
    } catch (error: any) {
      setIsLoading(false);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <>
      <ToastContainer />
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
                company.status === "Awaiting Approval" && (
                  <TableRow key={index}>
                    <TableCell className="font-medium border-zinc-200">{company.company_name}</TableCell>
                    <TableCell className="border border-zinc-200">{company.full_name}</TableCell>
                    <TableCell className="border border-zinc-200">{company.company_type}</TableCell>
                    <TableCell className="border border-zinc-200">{company.email}</TableCell>
                    <TableCell className="border border-zinc-200">{company.phone_number}</TableCell>
                    <TableCell className="border border-zinc-200">{company.status}</TableCell>
                    <TableCell className="text-center border-zinc-200">
                      <div className="space-x-2">
                        <Button variant="outline" size="sm" className="bg-blue-400 text-white" onClick={() => handleSubmit(company.id)}>
                          Approve
                        </Button>
                        <Link href={`/dashboard/customer/detail-customer/${company.id}`}>
                          <Button variant="outline" size="sm">
                            Detail
                          </Button>
                        </Link>
                        <Button variant="destructive" size="sm" className="text-white" onClick={() => handleDelete(company.id)}>
                          Delete
                        </Button>
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
    </>
  );
};

export default TableCustomer;
