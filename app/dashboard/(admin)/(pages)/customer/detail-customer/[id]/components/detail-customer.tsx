import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import React from "react";

interface GetApplicantProps {
  dataApplicant: GetApplicantList[];
}

const DetailCustomer = ({ dataApplicant }: GetApplicantProps) => {
  const applicant = dataApplicant[0];
  return (
    <>
      <div className="bg-white">
        <div className="p-6">
          <div className="space-y-2 pb-6">
            <h2 className="font-semibold text-lg leading-7">Detail Customer</h2>
            <p className="text-sm">
              View and manage your invoices with ease. Track payment statuses, review details, and stay updated on your billing history, all in one place.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-medium">Full Name</h2>
              <p>{applicant.full_name}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Email</h2>
              <p>{applicant.email}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Phone Number</h2>
              <p>{applicant.phone_number}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Address</h2>
              <p>{applicant.address}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Company Name</h2>
              <p>{applicant.company_name}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Company Type</h2>
              <p>{applicant.company_type}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Company Address</h2>
              <p>{applicant.company_address}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Company KBLI</h2>
              <p>{applicant.company_kbli}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Company Phone Number</h2>
              <p>{applicant.company_phone_number}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Company Fax Number</h2>
              <p>{applicant.company_fax_number}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Authorized Capital</h2>
              <p>{applicant.company_authorized_capital}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Paid-Up Capital</h2>
              <p>{applicant.company_paid_up_capital}</p>
            </div>
            <div>
              <h2 className="text-xl font-medium">Company Executives</h2>
              <p>{applicant.company_executives}</p>
            </div>

            <div className="space-y-4 pb-8">
              <h3 className="font-semibold text-md">Documents:</h3>
              <div className="grid grid-cols-4  gap-4">
                {applicant.photo && (
                  <div>
                    <p className="text-sm font-medium text-zinc-500">PHOTO</p>
                    <img src={applicant.photo} alt="KTP" className="w-full border rounded shadow" />
                  </div>
                )}
                {applicant.ktp && (
                  <div>
                    <p className="text-sm font-medium text-zinc-500">KTP</p>
                    <img src={applicant.ktp} alt="KTP" className="w-full border rounded shadow" />
                  </div>
                )}
                {applicant.kk && (
                  <div>
                    <p className="text-sm font-medium text-zinc-500">KK</p>
                    <img src={applicant.kk} alt="KK" className="w-full border rounded shadow" />
                  </div>
                )}
                {applicant.npwp && (
                  <div>
                    <p className="text-sm font-medium text-zinc-500">NPWP</p>
                    <img src={applicant.npwp} alt="NPWP" className="w-full border rounded shadow" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Link href="/dashboard/customer">
                <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-zinc-100">Back to List</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCustomer;
