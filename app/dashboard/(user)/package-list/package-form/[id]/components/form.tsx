"use client";
import React, { useEffect, useState } from "react";
import Step1 from "./stepper/stepper1";
import Step2 from "./stepper/stepper2";
import Step3 from "./stepper/stepper3";

interface PackageDataProps {
  id: string;
}

const data: GetPackageList[] = [
  {
    id: "1",
    title: "Package 1",
    price: 10000000,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae tenetur numquam aliquid explicabo enim ea modi exercitationem perspiciatis praesentium fugiat veniam, est amet eum accusantium accusamus obcaecati, harum magni pariatur!",
    package_list: [
      {
        bonus_name: "Business License",
      },
      {
        bonus_name: "Tax System",
      },
      {
        bonus_name: "Company Profile",
      },
      {
        bonus_name: "Free Company Website",
      },
      {
        bonus_name: "Free Absent System",
      },
      {
        bonus_name: "Free ERP System",
      },
    ],
  },
  {
    id: "2",
    title: "Package 2",
    price: 7000000,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae tenetur numquam aliquid explicabo enim ea modi exercitationem perspiciatis praesentium fugiat veniam, est amet eum accusantium accusamus obcaecati, harum magni pariatur!",
    package_list: [
      {
        bonus_name: "Business License",
      },
      {
        bonus_name: "Tax System",
      },
      {
        bonus_name: "Company Profile",
      },
      {
        bonus_name: "Free Company Website",
      },
      {
        bonus_name: "Free Absent System",
      },
      {
        bonus_name: "Free ERP System",
      },
    ],
  },
  {
    id: "3",
    title: "Package 3",
    price: 12000000,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae tenetur numquam aliquid explicabo enim ea modi exercitationem perspiciatis praesentium fugiat veniam, est amet eum accusantium accusamus obcaecati, harum magni pariatur!",
    package_list: [
      {
        bonus_name: "Business License",
      },
      {
        bonus_name: "Tax System",
      },
      {
        bonus_name: "Company Profile",
      },
      {
        bonus_name: "Free Company Website",
      },
      {
        bonus_name: "Free Absent System",
      },
      {
        bonus_name: "Free ERP System",
      },
    ],
  },
];

const FormPackage = ({ id }: PackageDataProps) => {
  const [isPackageData, setIsPackageData] = useState<GetPackageList | null>(null);
  const [isFormData, setIsFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [isStepper, setIsStepper] = useState<number>(1);
  const step = ["step 1", "step 2", "step 3"];
  const [isCount, setIsCount] = useState<number>(10);

  console.log(isFormData);

  useEffect(() => {
    const item = data.find((d) => d.id === id);
    setIsPackageData(item || null);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
    console.log(isFormData);
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
      <div className="flex gap-4 items-center w-full">
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

      {isStepper === 1 && <Step1 handleSubmit={handleSubmit} handleChange={handleChange} isFormData={isFormData} />}

      {isStepper === 2 && <Step2 handlePrevious={handlePrevious} handleNext={handleNext} isFormData={isFormData} isPackageData={isPackageData!} />}

      {isStepper === 3 && <Step3 isCount={isCount} />}
    </div>
  );
};

export default FormPackage;
