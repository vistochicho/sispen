import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import React from "react";

interface GetApplicantProps {
  dataApplicant: GetApplicantList[];
}

const DetailCustomer = ({ dataApplicant }: GetApplicantProps) => {
  const applicant = dataApplicant[0];

  // Parse logs
  let parsedLogs: any[] = [];
  try {
    parsedLogs = typeof applicant.logs === "string" ? JSON.parse(applicant.logs) : applicant.logs ?? [];
  } catch (err) {
    console.error("Error parsing logs", err);
  }

  // Daftar field yang berupa image
  const imageFields = ["photo", "ktp", "kk", "npwp"];

  return (
    <div className="bg-white">
      <div className="p-6">
        <div className="space-y-2 pb-6">
          <h2 className="font-semibold text-lg leading-7">Detail Customer</h2>
          <p className="text-sm">View and manage encryption logs and documents in one place.</p>
        </div>

        {/* ENCRYPTION LOGS */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Encryption Logs</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Original Size (KB)</TableHead>
                <TableHead>Encrypted Size (KB)</TableHead>
                <TableHead>Time (ms)</TableHead>
                <TableHead>Decrypted Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parsedLogs.map((log, idx) => {
                const key = convertLabelToKey(log.label);
                const value = (applicant as any)[key];

                return (
                  <TableRow key={idx}>
                    <TableCell>{log.label}</TableCell>
                    <TableCell>{log.originalSizeKB}</TableCell>
                    <TableCell>{log.encryptedSizeKB}</TableCell>
                    <TableCell>{log.timeMs}</TableCell>
                    <TableCell>
                      {value ? (
                        imageFields.includes(key) ? (
                          <img src={value} alt={log.label} className="w-32 h-auto border rounded shadow" />
                        ) : (
                          <span>{value}</span>
                        )
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* BACK BUTTON */}
        <div className="flex gap-4 mt-8">
          <Link href="/dashboard/customer">
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-zinc-100">Back to List</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailCustomer;

// Util function: "Full Name" => "full_name"
function convertLabelToKey(label: string) {
  return label.toLowerCase().replace(/-/g, "_").replace(/ /g, "_");
}
