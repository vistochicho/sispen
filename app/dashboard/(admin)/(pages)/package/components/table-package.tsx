"use client";
import React, { useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PackageProps {
  dataPackage: GetPackageList[];
}

const TablePackage = ({ dataPackage }: PackageProps) => {
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/package/delete/?id=${id}`);

      if (response.status === 200) {
        setNotification({ type: "success", message: "Package deleted successfully!" });
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
          <Link href="/dashboard/package/add-package/">
            <Button variant="outline" size="sm">
              Add Package
            </Button>
          </Link>
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
          {dataPackage.map((pkg, index) => (
            <TableRow key={index}>
              <TableCell className="border border-zinc-200">{pkg.plan}</TableCell>
              <TableCell className="border border-zinc-200">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "idr" }).format(pkg.price)}
              </TableCell>
              <TableCell className="border border-zinc-200">
                {/* design pake badge */}
                {pkg.status}
              </TableCell>
              <TableCell className="text-center border border-zinc-200 space-x-2">
                <Link href={`/dashboard/package/detail-package/${pkg.id}`}>
                  <Button variant="outline" size="sm">
                    Detail
                  </Button>
                </Link>
                <Link href={`/dashboard/package/update-package/${pkg.id}`}>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => handleDelete(pkg.id)}>
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
