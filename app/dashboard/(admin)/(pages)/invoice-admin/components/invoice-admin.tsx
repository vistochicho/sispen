"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

interface InvoiceProps {
  invUserData: GetInvoiceUser[];
}

const InvoiceAdmin = ({ invUserData }: InvoiceProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/invoice-admin/${id}`, {
        p_status: "Paid",
      });

      if (response.status === 200) {
        setNotification({ type: "success", message: "Invoice Paid Successfully!" });

        toast.success("Invoice Successfully Paid!");
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
      <div className="p-4 bg-white">
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
              {/* <TableHead>Invoice</TableHead> */}
              <TableHead>Name of Company</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invUserData.map((request, index) => (
              <TableRow key={index}>
                {/* <TableCell className="border border-zinc-200">{request.id}</TableCell> */}
                <TableCell className="border border-zinc-200">{request.company_name}</TableCell>
                <TableCell className="border border-zinc-200">{request.package_price}</TableCell>
                <TableCell className="border border-zinc-200">
                  {request.start_date instanceof Date ? request.start_date.toLocaleDateString() : "Invalid Date"}
                </TableCell>
                <TableCell className="border border-zinc-200">
                  {request.end_date instanceof Date ? request.end_date.toLocaleDateString() : "Invalid Date"}
                </TableCell>
                <TableCell className="border border-zinc-200">{request.status}</TableCell>
                <TableCell className="text-center border border-zinc-200 space-x-2">
                  {request.status == "Pending" && (
                    <Button variant="outline" size="sm" className="bg-blue-400 text-white" onClick={() => handleSubmit(request.id)} value="Paid">
                      Accept
                    </Button>
                  )}
                  <Link href={`/dashboard/invoice-admin/detail/${request.id}`}>
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
    </>
  );
};

export default InvoiceAdmin;
