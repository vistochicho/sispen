import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface GetEncryptProps {
  dataEncrypt: GetEncrypt[];
}

const TableEncrypt = ({ dataEncrypt }: GetEncryptProps) => {
  return (
    <div className="p-4 bg-white">
      <div className="space-y-2 pb-6">
        <h2 className="font-semibold text-lg leading-7">Encryption Data (Admin Page)</h2>
        <p className="text-sm">Test Encryption</p>
      </div>

      {/* Table */}
      <Table className="border border-zinc-200">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead>Applicant</TableHead>
            <TableHead>Start Encrypt</TableHead>
            <TableHead>Final Encrypt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataEncrypt.map((request, index) => (
            <TableRow key={index}>
              {/* <TableCell className="border border-zinc-200">{request.id}</TableCell> */}
              <TableCell className="border border-zinc-200">{request.full_name}</TableCell>
              <TableCell className="border border-zinc-200">
                {request.start_encrypt instanceof Date ? request.start_encrypt.toLocaleDateString() : "Invalid Date"}
              </TableCell>
              <TableCell className="border border-zinc-200">
                {request.final_encrypt instanceof Date ? request.final_encrypt.toLocaleDateString() : "Invalid Date"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableEncrypt;
