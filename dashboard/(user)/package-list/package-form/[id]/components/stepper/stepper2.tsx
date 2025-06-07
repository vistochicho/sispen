import React from "react";
import { FaDotCircle } from "react-icons/fa";

interface Step2Props {
  handlePrevious: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  isFormData: {
    photo: string | null;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    ktp: string | null;
    kk: string | null | null;
    npwp: string | null;
    company_name: string;
    company_address: string;
    kbli: string;
    company_phone_number: string;
    company_fax_number: string;
    company_authorized_capital: string;
    company_paid_up_capital: string;
    company_executives: string;
    company_message: string;
  };
  isPackageData: GetPackageList; // Ensure this type is defined and passed correctly
}

const Step2 = ({ handlePrevious, handleSubmit, isFormData, isPackageData }: Step2Props) => {
  console.log(isFormData);

  if (!isPackageData) {
    return <div>Loading...</div>; // Fallback if package data isn't available
  }

  const {
    fullName,
    email,
    phoneNumber,
    company_name,
    company_address,
    company_phone_number,
    company_fax_number,
    company_authorized_capital,
    company_paid_up_capital,
    company_executives,
    company_message,
  } = isFormData;

  const { plan, price, description, benefits } = isPackageData;

  return (
    <>
      {/* Transaction Details Header */}
      <div className="p-6 border-b-2 border-gray-100 font-semibold">Transaction Detail</div>

      {/* Transaction Detail Content */}
      <div className="flex flex-row justify-between gap-4 p-6">
        {/* Applicant Information */}
        <div className="flex flex-col space-y-4 w-1/2">
          <span>Name of Applicant: {fullName}</span>
          <span>Email: {email}</span>
          <span>Phone Number: {phoneNumber}</span>
          <span>Company Name: {company_name}</span>
          <span>Company Address: {company_address}</span>
          <span>Company Phone: {company_phone_number}</span>
          <span>Company Fax: {company_fax_number}</span>
          <span>Authorized Capital: {company_authorized_capital}</span>
          <span>Paid-up Capital: {company_paid_up_capital}</span>
          <span>Company Executives: {company_executives}</span>
        </div>

        {/* Package Information */}
        <div className="flex flex-col space-y-4 w-1/2">
          <span>Package: {plan}</span>
          <span>Price: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "idr" }).format(price)}</span>
          <span>Description: {description}</span>

          {/* Benefits List */}
          <div className="flex flex-col space-y-2">
            {benefits && benefits.length > 0 && (
              <>
                {benefits.map((dataBonus: any, i: any) => (
                  <span key={i} className="text-base text-zinc-400 flex items-center">
                    <FaDotCircle className="size-4 mr-2 text-zinc-400" />
                    {dataBonus.name}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 flex justify-between">
        {/* Previous Button */}
        <button className="text-white bg-zinc-400 hover:bg-zinc-500 rounded-md px-6 py-1.5" type="button" onClick={handlePrevious}>
          Previous
        </button>

        {/* Submit Button */}
        <button className="text-white bg-blue-400 hover:bg-blue-500 rounded-md px-6 py-1.5" type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Step2;
