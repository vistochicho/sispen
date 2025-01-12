import Image from "next/image";
import React, { forwardRef } from "react";

interface InvoiceDetailProps {
  invoiceData: GetInvUserDet[];
}

export const PrintContent = forwardRef<HTMLDivElement, InvoiceDetailProps>(({ invoiceData }, ref) => {
  const invoice = invoiceData[0]; // Mengambil data pertama dari array

  return (
    <div className="py-4 bg-white" ref={ref}>
      {/* Header Section */}
      <div className="px-14 py-6">
        <table className="w-full border-collapse border-spacing-0">
          <tbody>
            <tr>
              <td className="w-full align-middle">
                <div>
                  <Image width={180} height={120} src="/office-now.png" alt="Brand Logo" className="h-auto" />
                </div>
              </td>
              <td className="align-top">
                <div className="text-sm">
                  <table className="border-collapse border-spacing-0">
                    <tbody>
                      <tr>
                        <td className="border-r pr-4">
                          <div>
                            <p className="whitespace-nowrap text-slate-400 text-right">Start Date</p>
                            <p className="whitespace-nowrap font-bold text-main text-right">
                              {invoice.start_date ? new Date(invoice.start_date).toLocaleDateString() : "Invalid Date"}
                            </p>
                          </div>
                        </td>
                        <td className="pl-4">
                          <div>
                            <p className="whitespace-nowrap text-slate-400 text-right">End Date</p>
                            <p className="whitespace-nowrap font-bold text-main text-right">
                              {invoice.end_date ? new Date(invoice.end_date).toLocaleDateString() : "Invalid Date"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Supplier and Customer Information */}
      <div className="bg-slate-100 px-14 py-6 text-sm">
        <table className="w-full border-collapse border-spacing-0">
          <tbody>
            <tr>
              <td className="w-1/2 align-top">
                <div className="text-sm text-neutral-600">
                  <p className="font-bold">{invoice.company_name}</p>
                  <p>Phone: {invoice.company_phone_number}</p>
                  <p>Address: {invoice.company_address}</p>
                </div>
              </td>
              <td className="w-1/2 align-top text-right">
                <div className="text-sm text-neutral-600">
                  <p className="font-bold">{invoice.full_name}</p>
                  <p>Phone: {invoice.phone_number}</p>
                  <p>Address: {invoice.address}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Plan Details Section */}
      <div className="px-14 py-10 text-sm text-neutral-700">
        <table className="w-full border-collapse border-spacing-0">
          <thead>
            <tr>
              <td className="border-b-2 border-main pb-3 pl-3 font-bold text-main">#</td>
              <td className="border-b-2 border-main pb-3 pl-2 font-bold text-main">Plan</td>
              <td className="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Price</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b py-3 pl-3">1.</td>
              <td className="border-b py-3 pl-2">{invoice.plan}</td>
              <td className="border-b py-3 pl-2 text-right">${invoice.price.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="text-right font-bold">Total:</td>
                <td className="text-right font-bold text-main">${invoice.price.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="px-14 text-sm text-neutral-700">
        <p className="text-main font-bold">PAYMENT DETAILS</p>
        <p>Bank Name: Banks of Banks</p>
        <p>Account Number: 123456678</p>
        <p>Payment Reference: INV-0001</p>
      </div>

      {/* Notes Section */}
      <div className="px-14 py-10 text-sm text-neutral-700">
        <p className="text-main font-bold">Notes</p>
        <p className="italic">Please make the payment by the due date mentioned above. For any queries, contact support.</p>
      </div>
    </div>

    
  );
});
