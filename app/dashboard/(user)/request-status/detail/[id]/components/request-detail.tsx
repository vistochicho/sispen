import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaDotCircle, FaFilePdf } from "react-icons/fa";
import ChatMessage from "./chat-message";

interface GetClientProps {
  packageData: GetClientDet[];
}

const DetailRequest = ({ packageData }: GetClientProps) => {
  const pkg = packageData[0];
  return (
    <>
      <div className="bg-white">
        <div className="p-6">
          <div className="space-y-2 pb-6">
            <h2 className="font-semibold text-lg leading-7">Detail Status of Request</h2>
            <p className="text-sm">
              View and manage your invoices with ease. Track payment statuses, review details, and stay updated on your billing history, all in one place.
            </p>
          </div>

          <div className="flex flex-row gap-6 pb-8">
            <div className="w-1/2 space-y-2">
              <h3 className="font-semibold text-md">Profile Information</h3>
              <p>Name of Applicant: {pkg.full_name}</p>
              <p>Email: {pkg.email}</p>
              <p>Phone Number: {pkg.phone_number}</p>
              <p>Address: {pkg.address}</p>
            </div>

            <div className="w-1/2 space-y-2">
              <h3 className="font-semibold text-md">Package Information</h3>
              <p>Package: {pkg.package_name}</p>
              <p>Description: {pkg.package_price}</p>
              <p>Description: {pkg.package_description}</p>
              <h3 className="font-semibold text-md">Bonus Package:</h3>
              <div className="space-y-4">
                <ul className="list-disc list-inside">
                  {pkg.package_benefits?.map((item: any, index: any) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 pb-8">
            <h3 className="font-semibold text-md">Documents:</h3>
            <div className="grid grid-cols-4  gap-4">
              {pkg.photo && (
                <div>
                  <p className="text-sm font-medium text-zinc-500">photo</p>
                  <img src={pkg.photo} alt="KTP" className="w-full border rounded shadow" />
                </div>
              )}
              {pkg.ktp && (
                <div>
                  <p className="text-sm font-medium text-zinc-500">KTP</p>
                  <img src={pkg.ktp} alt="KTP" className="w-full border rounded shadow" />
                </div>
              )}
              {pkg.kk && (
                <div>
                  <p className="text-sm font-medium text-zinc-500">KK</p>
                  <img src={pkg.kk} alt="KK" className="w-full border rounded shadow" />
                </div>
              )}
              {pkg.npwp && (
                <div>
                  <p className="text-sm font-medium text-zinc-500">NPWP</p>
                  <img src={pkg.npwp} alt="NPWP" className="w-full border rounded shadow" />
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <Table className="border border-zinc-200">
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead>Name of Company</TableHead>
                <TableHead>Company Address</TableHead>
                <TableHead>KBLI Code</TableHead>
                <TableHead>Company Phone Number</TableHead>
                <TableHead>Fax Number of Company</TableHead>
                <TableHead>Company Authorized Capital</TableHead>
                <TableHead>Company's Paid-up Capital</TableHead>
                <TableHead>Company Executives</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border border-zinc-200">{pkg.company_name}</TableCell>
                <TableCell className="border border-zinc-200">{pkg.company_address}</TableCell>
                <TableCell className="border border-zinc-200">{pkg.company_kbli}</TableCell>
                <TableCell className="border border-zinc-200">{pkg.company_phone_number}</TableCell>
                <TableCell className="border border-zinc-200">{pkg.company_fax_number}</TableCell>
                <TableCell className="border border-zinc-200">{pkg.company_authorized_capital}</TableCell>
                <TableCell className="border border-zinc-200">{pkg.company_paid_up_capital}</TableCell>
                <TableCell className="border border-zinc-200">{pkg.company_executives}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      {/* <div>
        <div className="mt-8 rounded-lg bg-white shadow-md relative">
          {/* Chat Messages */}
      {/* <div className="p-5 space-y-4 overflow-y-auto max-h-80">
            {messages.map((msg, index) => (
              <ChatMessage key={index} avatar={msg.avatar} message={msg.message} timestamp={msg.timestamp} isUser={msg.isUser} />
            ))}
          </div> */}

      {/* Input Field */}
      {/* <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
            <input
              type="text"
              className="rounded-lg w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type a message..."
            />
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default DetailRequest;
