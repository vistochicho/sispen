import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import React from "react";

interface DecryptionLog {
  label: string;
  originalSizeKB: string;
  decryptedSizeKB: string;
  timeMs: string;
}

interface GetApplicantList {
  [key: string]: any; // General catch for dynamic access
  logs?: any;
  photo?: string;
  ktp?: string;
  kk?: string;
  npwp?: string;
}

interface GetApplicantProps {
  dataApplicant: GetApplicantList[];
  decryptionLogs?: {
    label: string;
    originalSizeKB: string;
    decryptedSizeKB: string;
    timeMs: string;
  }[];
}

const DetailCustomer = ({ dataApplicant, decryptionLogs = [] }: GetApplicantProps) => {
  const applicant = dataApplicant[0];

  // Parse encryption logs
  let parsedLogs: any[] = [];
  try {
    parsedLogs = typeof applicant.logs === "string" ? JSON.parse(applicant.logs) : applicant.logs ?? [];
  } catch (err) {
    console.error("Error parsing logs", err);
  }

  const imageFields = ["photo", "ktp", "kk", "npwp"];

  return (
    <div className="bg-white">
      <div className="p-6">
        <div className="space-y-2 pb-6">
          <h2 className="font-semibold text-lg leading-7">Detail Customer</h2>
          <p className="text-sm">View and manage encryption and decryption logs, as well as uploaded documents.</p>
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

        {/* Decryption */}
        {decryptionLogs && decryptionLogs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Decryption Logs</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>Original Size (KB)</TableHead>
                  <TableHead>Decrypted Size (KB)</TableHead>
                  <TableHead>Time (ms)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {decryptionLogs.map((log, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{log.label}</TableCell>
                    <TableCell>{log.originalSizeKB}</TableCell>
                    <TableCell>{log.decryptedSizeKB}</TableCell>
                    <TableCell>{log.timeMs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* BACK BUTTON */}
        <div className="flex gap-4 mt-10">
          <Link href="/dashboard/customer">
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-zinc-100">Back to List</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailCustomer;

// Convert "Full Name" → "full_name"
function convertLabelToKey(label: string) {
  return label.toLowerCase().replace(/-/g, "_").replace(/ /g, "_");
}
