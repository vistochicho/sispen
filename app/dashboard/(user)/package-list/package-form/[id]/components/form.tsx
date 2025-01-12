"use client";
import React, { useEffect, useState } from "react";
import Step1 from "./stepper/stepper1";
import Step2 from "./stepper/stepper2";
import Step3 from "./stepper/stepper3";
import axios from "axios";

interface PackageDataProps {
  id: string;
  dataPackage: GetPackageList[];
}

const FormPackage = ({ id, dataPackage }: PackageDataProps) => {
  const [isPackageData, setIsPackageData] = useState<GetPackageList | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isInvoiceId, setInvoiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPhoto, setIsPhoto] = useState<File | null>(null);
  const [isKtp, setIsKtp] = useState<File | null>(null);
  const [isNpwp, setIsNpwp] = useState<File | null>(null);
  const [isKk, setIsKk] = useState<File | null>(null);
  const [isSelected, setIsSelected] = useState<string>("");
  const [isFormData, setIsFormData] = useState({
    photo: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    ktp: "",
    kk: "",
    npwp: "",
    company_name: "",
    company_address: "",
    kbli: "",
    company_phone_number: "",
    company_fax_number: "",
    company_authorized_capital: "",
    company_paid_up_capital: "",
    company_executives: "",
    company_message: "",
  });
  const [isStepper, setIsStepper] = useState<number>(1);
  const step = ["step 1", "step 2", "step 3"];
  const [isCount, setIsCount] = useState<number>(5);

  useEffect(() => {
    const item = dataPackage.find((d) => d.id === id);
    // console.log("item", dataPackage);
    setIsPackageData(item || null);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIsFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (name: string) => {
    setIsSelected(name);
  };

  const handleNext = () => {
    if (isStepper < step.length) {
      setIsStepper((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (isStepper > 1) {
      setIsStepper((prev) => prev - 1);
    }

    setIsSelected("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: "photo" | "ktp" | "kk" | "npwp") => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Batas ukuran file 5MB
        alert("File terlalu besar. Maksimal ukuran adalah 5MB.");
        return;
      }
      const fileUrl = URL.createObjectURL(file); // Buat URL sementara untuk file
      setIsFormData((prev) => ({
        ...prev,
        [field]: fileUrl, // Simpan URL sementara ke state
      }));
      if (field === "photo") {
        setIsPhoto(file);
      } else if (field === "ktp") {
        setIsKtp(file);
      } else if (field === "kk") {
        setIsKk(file);
      } else if (field === "npwp") {
        setIsNpwp(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const packageId = id as string; // Ensure 'id' is correctly passed

      const formData = new FormData();

      formData.append("p_full_name", isFormData.fullName);
      formData.append("p_email", isFormData.email);
      formData.append("p_phone_number", isFormData.phoneNumber);
      formData.append("p_address", isFormData.address);
      formData.append("p_company_type", isSelected);
      formData.append("p_company_name", isFormData.company_name);
      formData.append("p_company_address", isFormData.company_address);
      formData.append("p_company_kbli", isFormData.kbli);
      formData.append("p_company_phone_number", isFormData.company_phone_number);
      formData.append("p_company_authorized_capital", isFormData.company_authorized_capital);
      formData.append("p_company_paid_up_capital", isFormData.company_paid_up_capital);
      formData.append("p_company_executives", isFormData.company_executives);
      formData.append("p_package_id", packageId);
      formData.append("p_company_fax_number", isFormData.company_fax_number);
      formData.append("p_note", isFormData.company_message);
      if (isPhoto instanceof File && isKtp instanceof File && isKk instanceof File && isNpwp instanceof File) {
        formData.append("p_photo", isPhoto);
        formData.append("p_ktp", isKtp);
        formData.append("p_kk", isKk);
        formData.append("p_npwp", isNpwp);
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/applicant/insert`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setNotification({ type: "success", message: "Form Inputted successfully!" });

        const applicantId = response.data.data; // Tangkap ID di sini
        setInvoiceId(applicantId); // Simpan ID ke state

        // console.log("hit", applicantId);

        // Clear the form data
        setIsFormData({
          photo: "",
          fullName: "",
          email: "",
          phoneNumber: "",
          address: "",
          ktp: "",
          kk: "",
          npwp: "",
          company_name: "",
          company_address: "",
          kbli: "",
          company_phone_number: "",
          company_fax_number: "",
          company_authorized_capital: "",
          company_paid_up_capital: "",
          company_executives: "",
          company_message: "",
        });

        setIsSelected("");
        handleNext();
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

  useEffect(() => {
    if (isStepper === 3) {
      if (isCount <= 0) return;
      const timer = setTimeout(() => {
        setIsCount((prev) => prev - 1);
        return () => clearTimeout(timer);
      }, 1000);
    }
  }, [isStepper, isCount]);

  return (
    <div className="bg-white rounded-lg">
      {/* INI STEPPER */}
      <div className="flex gap-4 items-center w-full p-6">
        {/* Step 1 */}
        <div
          className={`rounded-full py-4 px-6 border ${
            isStepper === 1 || isStepper === 2 || isStepper === 3 ? "border-green-400 bg-gray-50 text-black" : "border-zinc-400"
          } flex justify-center text-md`}
        >
          1
        </div>

        {/* Line between Step 1 and Step 2 */}
        <hr className={`border-t ${isStepper >= 2 ? "border-green-400 bg-gray-50 text-black" : "border-zinc-400"} flex-grow`} />

        {/* Step 2 */}
        <div
          className={`rounded-full py-4 px-6 border ${
            isStepper === 2 || isStepper === 3 ? "border-green-400 bg-gray-50 text-black" : "border-zinc-400"
          } flex justify-center text-md`}
        >
          2
        </div>

        {/* Line between Step 2 and Step 3 */}
        <hr className={`border-t ${isStepper === 3 ? "border-green-400" : "border-zinc-400"} flex-grow`} />

        {/* Step 3 */}
        <div className={`rounded-full py-4 px-6 border ${isStepper === 3 ? "border-green-400" : "border-zinc-400"} flex justify-center text-md`}>3</div>
      </div>
      {/* PAGE */}
      {isStepper === 1 && (
        <Step1
          handleNext={handleNext}
          handleChange={handleChange}
          isFormData={isFormData}
          handleSelect={handleSelect}
          isSelected={isSelected}
          handleTextAreaChange={handleTextAreaChange}
          handleFileChange={handleFileChange}
        />
      )}
      {isStepper === 2 && <Step2 handleSubmit={handleSubmit} handlePrevious={handlePrevious} isFormData={isFormData} isPackageData={isPackageData!} />}
      {isStepper === 3 && <Step3 isCount={isCount} isInvoiceId={isInvoiceId} />}
    </div>
  );
};

export default FormPackage;
