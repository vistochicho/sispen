"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface GetBenefitsProps {
  dataBenefits: GetBenefitsList[];
}

const AddPackageForm = ({ dataBenefits }: GetBenefitsProps) => {
  const router = useRouter();
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormData, setIsFormData] = useState({
    plan: "",
    price: "",
    description: "",
    status: "",
    benefits: [] as string[],
  });

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setIsFormData((prevData) => ({
      ...prevData,
      benefits: checked
        ? [...prevData.benefits, value] // Add benefit ID if checked
        : prevData.benefits.filter((id) => id !== value), // Remove if unchecked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("p_plan", isFormData.plan);
      formData.append("p_price", isFormData.price);
      formData.append("p_description", isFormData.description);
      formData.append("p_status", isFormData.status);
      isFormData.benefits.forEach((benefits) => {
        formData.append("p_benefits[]", benefits);
      });

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/package/add/`, formData);

      if (response.status === 200) {
        setNotification({ type: "success", message: "Form Inputted successfully!" });

        // console.log("hit", applicantId);

        // Clear the form data
        setIsFormData({
          plan: "",
          price: "",
          description: "",
          status: "",
          benefits: [""],
        });

        setTimeout(() => router.push("/dashboard/package/"), 2000);
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

  return (
    <>
      {" "}
      <div className="p-6 border-b-2 border-gray-100 font-semibold">Add Package</div>
      <form className="p-6" onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Name of Package
              </label>
              <div className="mt-2">
                <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                  <input
                    id="plan"
                    name="plan"
                    type="text"
                    placeholder="Pembuatan PT"
                    autoComplete="plan"
                    value={isFormData.plan}
                    onChange={handleChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Package Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Rp. "
                    autoComplete="price"
                    value={isFormData.price}
                    onChange={handleChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              List of Provided Documents
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                autoComplete="description"
                rows={3}
                placeholder="AKTA, SK, SKT, NPWP DOMISILI, NIB RBA, IJIN USAHA, API"
                onChange={handleChange}
                value={isFormData.description}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
              Status
            </label>
            <div className="mt-2">
              <select
                id="status"
                name="status"
                autoComplete="status-name"
                onChange={handleSelect}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled={!!isFormData.status}>
                  -- Your Choice --
                </option>
                <option value="Active">Active</option>
                <option value="Not Active">Not Active</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Select Benefits
            </label>
            <div className="space-y-4 mt-2">
              {" "}
              {/* Adds spacing between checkboxes */}
              {dataBenefits.map((benefits) => (
                <div key={benefits.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={benefits.id}
                    id={`benefits-${benefits.id}`}
                    onChange={handleCheckboxChange}
                    checked={isFormData.benefits.includes(benefits.id)}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`benefits-${benefits.id}`} className="text-sm font-medium text-gray-700">
                    {benefits.name} {/* Display the benefits name */}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button className={`bg-blue text-white rounded-md px-6 py-1.5 bg-blue-400 hover:bg-blue-500`} type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPackageForm;
