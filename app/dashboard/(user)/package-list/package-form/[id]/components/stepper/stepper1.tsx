"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import FormPT from "../company-choice/form-pt";
import FormCV from "../company-choice/form-cv";
import FormPMA from "../company-choice/form-pma";
import React, { useState } from "react";

interface Stepper1Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>, field: "photo" | "ktp" | "kk" | "npwp") => void;
  handleNext: () => void;
  handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelect: (name: string) => void;
  isSelected: string;
  isFormData: {
    photo: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    ktp: string;
    kk: string;
    npwp: string;
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

const Step1 = ({ handleChange, handleNext, isFormData, handleTextAreaChange, handleSelect, isSelected, handleFileChange }: Stepper1Props) => {
  const isFormValid = (): boolean => {
    // tunggu sampai data semua full baru hilangkan
    return Object.values(isFormData).every((value) => value.trim() !== "");
    // return Object.values(isFormData).every((value) => value === null || (typeof value === "string" && value.trim() !== ""));
  };

  return (
    <>
      <div className="p-6 border-b-2 border-gray-100 font-semibold">Submission Form</div>
      <form className="p-6">
        <div className="space-y-8">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

            <div className="col-span-full mt-10">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={(event) => handleFileChange(event, "photo")}
                  className="mt-2 w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-600 file:font-semibold hover:file:bg-indigo-100"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="janesmith"
                      autoComplete="fullName"
                      value={isFormData.fullName}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      autoComplete="email"
                      value={isFormData.email}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2">
                  <div className="flex rounded-lg px-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="number"
                      placeholder="1234567890"
                      autoComplete="phone"
                      value={isFormData.phoneNumber}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Address
                </label>
                <div className="mt-2">
                  <textarea
                    id="address"
                    name="address"
                    autoComplete="address"
                    rows={3}
                    onChange={handleTextAreaChange}
                    value={isFormData.address}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ktp" className="block text-sm font-medium leading-6 text-gray-900">
                  KTP
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
                      <input
                        type="file"
                        name="ktp"
                        id="ktp"
                        onChange={(event) => handleFileChange(event, "ktp")}
                        className="mt-2 w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-600 file:font-semibold hover:file:bg-indigo-100"
                      />
                      <p className="mt-2 text-xs leading-5 text-gray-600">or drag and drop</p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="npwp" className="block text-sm font-medium leading-6 text-gray-900">
                  NPWP
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
                      <input
                        type="file"
                        name="npwp"
                        id="npwp"
                        onChange={(event) => handleFileChange(event, "npwp")}
                        className="mt-2 w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-600 file:font-semibold hover:file:bg-indigo-100"
                      />
                      <p className="mt-2 text-xs leading-5 text-gray-600">or drag and drop</p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="kk" className="block text-sm font-medium leading-6 text-gray-900">
                  KK
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
                      <input
                        type="file"
                        name="kk"
                        id="kk"
                        onChange={(event) => handleFileChange(event, "kk")}
                        className="mt-2 w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-600 file:font-semibold hover:file:bg-indigo-100"
                      />
                      <p className="mt-2 text-xs leading-5 text-gray-600">or drag and drop</p>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border-b border-gray-900/10 pb-8">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Company of your choice
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                onChange={(e) => handleSelect(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>-- Your Choice --</option>
                <option value="PT">Perseroan Terbatas (PT)</option>
                <option value="CV">Commanditaire Vennootschap (CV)</option>
                <option value="PMA">Penanaman Modal Asing (PMA)</option>
              </select>
            </div>
          </div>

          {isSelected && isSelected === "PT" ? (
            <FormPT handleChange={handleChange} isFormData={isFormData} handleTextAreaChange={handleTextAreaChange} />
          ) : isSelected === "CV" ? (
            <FormCV handleChange={handleChange} isFormData={isFormData} handleTextAreaChange={handleTextAreaChange} />
          ) : isSelected === "PMA" ? (
            <FormPMA handleChange={handleChange} isFormData={isFormData} handleTextAreaChange={handleTextAreaChange} />
          ) : (
            <></>
          )}

          <div className="flex justify-end">
            <button
              className={`text-white rounded-md px-6 py-1.5 ${isFormValid() ? "bg-blue-400 hover:bg-blue-500" : "bg-gray-300 cursor-not-allowed"}`}
              type="button"
              disabled={!isFormValid()}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Step1;
