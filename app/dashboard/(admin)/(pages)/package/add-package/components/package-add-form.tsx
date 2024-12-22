import React from "react";

interface GetBenefitsProps {
  dataBenefits: GetBenefitsList[];
}

const PackageAddForm = ({ dataBenefits }: GetBenefitsProps) => {
  return (
    <>
      {" "}
      <div className="p-6 border-b-2 border-gray-100 font-semibold">Add Package</div>
      <form className="p-6">
        <div className="space-y-8">
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Name of Package
              </label>
              <div className="mt-2">
                <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Pembuatan PT"
                    autoComplete="fullName"
                    // value={isFormData.fullName}
                    // onChange={handleChange}
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
                    id="fullName"
                    name="fullName"
                    type="number"
                    placeholder="Rp. "
                    autoComplete="fullName"
                    // value={isFormData.fullName}
                    // onChange={handleChange}
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
                // onChange={handleTextAreaChange}
                // value={isFormData.address}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Select Benefits
            </label>
            <div className="space-y-4 mt-2">
              {" "}
              {/* Adds spacing between checkboxes */}
              {dataBenefits.map((benefit) => (
                <div key={benefit.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={benefit.id}
                    id={`benefit-${benefit.id}`}
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`benefit-${benefit.id}`} className="text-sm font-medium text-gray-700">
                    {benefit.name} {/* Display the benefit name */}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button className={`bg-blue text-white rounded-md px-6 py-1.5 bg-blue-400 hover:bg-blue-500`} type="button">
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PackageAddForm;
