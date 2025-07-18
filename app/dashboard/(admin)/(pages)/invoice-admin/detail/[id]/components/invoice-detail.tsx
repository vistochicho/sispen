"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintContent } from "./print-pdf";

interface InvoiceDetailProps {
  invoiceData: GetInvUserDet[];
}

const InvoiceDetail = async ({ invoiceData }: InvoiceDetailProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <>
      <div className="py-4 flex justify-between ">
        <Link href="/dashboard/invoice-admin/">
          <button className="text-white bg-zinc-400 hover:bg-gray-500 rounded-md px-6 py-1.5" type="submit">
            Back
          </button>
        </Link>
        <button className="text-white bg-blue-400 hover:bg-blue-500 rounded-md px-6 py-1.5" type="submit" onClick={() => reactToPrintFn && reactToPrintFn()}>
          Print
        </button>
      </div>
      <PrintContent ref={contentRef} invoiceData={invoiceData} />
    </>
  );
};

export default InvoiceDetail;
