import React from "react";
import FormPackage from "./components/form";

const PackageForm = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log(id);

  return (
    <div className="bg-white h-auto">
      <div className="p-6">
        <FormPackage id = {id} />
      </div>
    </div>
  );
};

export default PackageForm;
