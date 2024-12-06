import React from "react";
import { FaDotCircle } from "react-icons/fa";

interface Step2Props {
  handlePrevious: () => void;
  handleNext: () => void;
  isFormData: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  isPackageData: GetPackageList;
}

const Step2 = ({ handlePrevious, handleNext, isFormData, isPackageData }: Step2Props) => {
  return (
    <>
      <div className="p-6 border-b-2 border-gray-100 font-semibold">Transaction Detail</div>
      <div className="flex flex-row justify-between gap-4 p-6">
        <div className="flex flex-col space-y-4 w-1/2">
          <span>Nama: {isFormData.fullName}</span>
          <span>Email: {isFormData.email}</span>
          <span>Phone Number: {isFormData.phoneNumber}</span>
        </div>
        <div className="flex flex-col space-y-4 w-1/2">
          <span>Package: {isPackageData?.title}</span>
          <span>Price: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "idr" }).format(isPackageData.price)}</span>
          <span>Description: {isPackageData.description}</span>
          <div className="flex flex-col space-y-2">
            {isPackageData.package_list && isPackageData.package_list.length > 0 && (
              <>
                {isPackageData.package_list.map((dataBonus, i) => (
                  <span key={i} className="text-base text-zinc-400 flex items-center">
                    <FaDotCircle className="size-4 mr-2 text-zinc-400" />
                    {dataBonus.bonus_name}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 flex justify-between">
        <button className="text-white bg-zinc-400 hover:bg-zinc-500 rounded-md px-6 py-1.5" type="submit" onClick={handlePrevious}>
          Previous
        </button>
        <button className="text-white bg-blue-400 hover:bg-blue-500 rounded-md px-6 py-1.5" type="submit" onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default Step2;
