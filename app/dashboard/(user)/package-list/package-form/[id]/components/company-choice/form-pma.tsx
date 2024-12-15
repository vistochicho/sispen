import React from "react";

interface PMAProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isFormData: {
    photo: string | null;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    ktp: string | null;
    kk: string | null;
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
}

const FormPMA = ({ handleChange, isFormData, handleTextAreaChange }: PMAProps) => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      {/* Nama Perusahaan */}
      <div className="sm:col-span-6">
        <label htmlFor="namaPerusahaan" className="block text-sm font-medium leading-6 text-gray-900">
          Name of Company*
        </label>
        <div className="mt-2">
          <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              id="company_name"
              name="company_name"
              type="text"
              placeholder="Company Name"
              autoComplete="organization"
              value={isFormData.company_name}
              onChange={handleChange}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* Alamat Perusahaan (textarea) */}
      <div className="sm:col-span-6">
        <label htmlFor="alamatPerusahaan" className="block text-sm font-medium leading-6 text-gray-900">
          Company Address*
        </label>
        <div className="mt-2">
          <textarea
            id="company_address"
            name="company_address"
            autoComplete="company-address"
            rows={3}
            onChange={handleTextAreaChange}
            value={isFormData.company_address}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Kode KBLI */}
      <div className="sm:col-span-6">
        <label htmlFor="namaPerusahaan" className="block text-sm font-medium leading-6 text-gray-900">
          KBLI Code*
        </label>
        <div className="mt-2">
          <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              id="kbli"
              name="kbli"
              type="text"
              placeholder="KBLI Code"
              autoComplete="kbli"
              value={isFormData.kbli}
              onChange={handleChange}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* No. Telepon Perusahaan */}
      <div className="sm:col-span-3">
        <label htmlFor="noTeleponPerusahaan" className="block text-sm font-medium leading-6 text-gray-900">
          Company Phone Number*
        </label>
        <div className="mt-2">
          <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              id="company_phone_number"
              name="company_phone_number"
              type="number"
              placeholder="1234567890"
              autoComplete="tel"
              value={isFormData.company_phone_number}
              onChange={handleChange}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* No. Fax Perusahaan */}
      <div className="sm:col-span-3">
        <label htmlFor="noFaxPerusahaan" className="block text-sm font-medium leading-6 text-gray-900">
          Fax Number of Company
        </label>
        <div className="mt-2">
          <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              id="company_fax_number"
              name="company_fax_number"
              type="number"
              placeholder="Fax Number"
              autoComplete="fax"
              value={isFormData.company_fax_number}
              onChange={handleChange}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* Modal Dasar Perusahaan */}
      <div className="sm:col-span-3">
        <label htmlFor="modalDasarPerusahaan" className="block text-sm font-medium leading-6 text-gray-900">
          Company Authorized Capital*
        </label>
        <div className="mt-2">
          <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              id="company_authorized_capital"
              name="company_authorized_capital"
              type="number"
              placeholder="Authorized Capital"
              autoComplete="off"
              value={isFormData.company_authorized_capital}
              onChange={handleChange}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* Modal Disetor Perusahaan */}
      <div className="sm:col-span-3">
        <label htmlFor="modalDisetorPerusahaan" className="block text-sm font-medium leading-6 text-gray-900">
          Company&apos;s Paid-up Capital*
        </label>
        <div className="mt-2">
          <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              id="company_paid_up_capital"
              name="company_paid_up_capital"
              type="number"
              placeholder="Paid-up Capital"
              autoComplete="off"
              value={isFormData.company_paid_up_capital}
              onChange={handleChange}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* Nama Pengurus Perusahaan (textarea) */}
      <div className="sm:col-span-6">
        <label htmlFor="alamatPerusahaan" className="block text-sm font-medium leading-6 text-gray-900">
          Company Executives*
        </label>
        <div className="mt-2">
          <textarea
            id="company_executives"
            name="company_executives"
            autoComplete="company-executives"
            rows={3}
            onChange={handleTextAreaChange}
            value={isFormData.company_executives}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* Message/Note (textarea) */}
      <div className="sm:col-span-6">
        <label htmlFor="alamatPerusahaan" className="block text-sm font-medium leading-6 text-gray-900">
          Message/Note
        </label>
        <div className="mt-2">
          <textarea
            id="company_message"
            name="company_message"
            autoComplete="company-message"
            rows={3}
            onChange={handleTextAreaChange}
            value={isFormData.company_message}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="flex justify-between sm:col-span-6">
        <div>
          <button className="text-blue-400 px-2.5 py-1.5">Clear Form</button>
        </div>
      </div>
    </div>
  );
};

export default FormPMA;
