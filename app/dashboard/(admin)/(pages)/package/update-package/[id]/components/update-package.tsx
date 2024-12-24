"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface GetPackageListProps {
  dataPackage: GetPackageList[];
  dataBenefits: GetBenefitsList[];
}

const UpdatePackage = ({ dataPackage, dataBenefits }: GetPackageListProps) => {
  const router = useRouter();
  const [isFormData, setIsFormData] = useState({
    plan: dataPackage[0].plan || "",
    price: dataPackage[0].price || "",
    description: dataPackage[0].description || "",
    status: dataPackage[0].status || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [oldBenefits, setOldBenefits] = useState<{ id: string; name: string }[]>(dataPackage[0].benefits || []);
  const [newBenefits, setNewBenefits] = useState<{ id: string; name: string }[]>([]);
  const [removeBenefits, setRemoveBenefits] = useState<{ id: string; name: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIsFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsFormData((prevData) => ({
      ...prevData,
      status: e.target.value,
    }));
  };

  const handleCheckboxChange = (id: string, name: string, isChecked: boolean) => {
    if (oldBenefits.some((benefit) => benefit.id === id)) {
      if (!isChecked) {
        setOldBenefits((prev) => prev.filter((benefit) => benefit.id !== id));
        setRemoveBenefits((prev) => [...prev, { id, name }]);
      }
    } else {
      if (isChecked) {
        setNewBenefits((prev) => [...prev, { id, name }]);
      } else {
        setNewBenefits((prev) => prev.filter((benefit) => benefit.id !== id));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/package/update/${dataPackage[0].id}`, {
        p_plan: isFormData.plan,
        p_price: isFormData.price,
        p_description: isFormData.description,
        p_status: isFormData.status,
        p_new_benefits: newBenefits,
        p_remove_benefits: removeBenefits,
      });

      if (response.status === 200) {
        setNotification({ type: "success", message: "User registered successfully!" });

        toast.success("Data Successfully Updated!");
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

  // console.log({
  //   "Data New": newBenefits,
  //   "Data Old": oldBenefits,
  //   "Remove Old": removeBenefits,
  // });

  return (
    <>
      <ToastContainer />
      <div className="p-6 border-b-2 border-gray-100 font-semibold">Update Package</div>
      <form className="p-6" onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Package Name */}
            <div className="sm:col-span-3">
              <label htmlFor="plan" className="block text-sm font-medium leading-6 text-gray-900">
                Name of Package
              </label>
              <div className="mt-2">
                <input
                  id="plan"
                  name="plan"
                  type="text"
                  placeholder="Pembuatan PT"
                  autoComplete="plan"
                  value={isFormData.plan}
                  onChange={handleChange}
                  className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
                />
              </div>
            </div>

            {/* Package Price */}
            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Package Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Rp. "
                  autoComplete="price"
                  value={isFormData.price}
                  onChange={handleChange}
                  className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
                />
              </div>
            </div>
          </div>

          {/* Package Description */}
          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              List of Provided Documents
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="AKTA, SK, SKT, NPWP DOMISILI, NIB RBA, IJIN USAHA, API"
                value={isFormData.description}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Package Status */}
          <div className="w-full">
            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
              Status
            </label>
            <div className="mt-2">
              <select
                id="status"
                name="status"
                value={isFormData.status}
                onChange={handleSelect}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled={!isFormData.status}>
                  -- Your Choice --
                </option>
                <option value="Active">Active</option>
                <option value="Not Active">Not Active</option>
              </select>
            </div>
          </div>

          {/* Package Benefits */}
          <div className="col-span-full">
            <label htmlFor="benefits" className="block text-sm font-medium leading-6 text-gray-900">
              Select Benefits
            </label>
            <div className="space-y-4 mt-2">
              {dataBenefits &&
                dataBenefits.length > 0 &&
                dataBenefits.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={item.id}
                      onChange={(e) => handleCheckboxChange(item.id, item.name, e.target.checked)}
                      checked={oldBenefits.some((b) => b.id === item.id) || newBenefits.some((b) => b.id === item.id)}
                      className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`benefits-${item.id}`} className="text-sm font-medium text-gray-700">
                      {item.name}
                    </label>
                  </div>
                ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-400 text-white rounded-md px-6 py-1.5 hover:bg-blue-500" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Package"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdatePackage;
