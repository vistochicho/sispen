import Link from "next/link";
import React from "react";

interface GetPackageProps {
  packageData: GetPackageList[];
}

const DetailPackage = ({ packageData }: GetPackageProps) => {
  const pkg = packageData[0];
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Package Details</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-medium">Plan Name</h2>
            <p>{pkg.plan}</p>
          </div>
          <div>
            <h2 className="text-xl font-medium">Price</h2>
            <p>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "idr" }).format(pkg.price)}</p>
          </div>
          <div>
            <h2 className="text-xl font-medium">Status</h2>
            <p>{pkg.status}</p>
          </div>
          <div>
            <h2 className="text-xl font-medium">Description</h2>
            <p>{pkg.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-medium">Benefits</h2>
            {pkg.benefits && pkg.benefits.length > 0 ? (
              <ul className="list-disc list-inside">
                {pkg.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            ) : (
              <p>No benefits available.</p>
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <Link href="/dashboard/package">
              <button className="border border-gray-300 px-4 py-2 rounded-md">Back to List</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPackage;
