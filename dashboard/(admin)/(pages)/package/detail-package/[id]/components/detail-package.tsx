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
        <div className="space-y-2 pb-6">
          <h2 className="font-semibold text-lg leading-7">Detail Customer</h2>
          <p className="text-sm">
            View and manage your invoices with ease. Track payment statuses, review details, and stay updated on your billing history, all in one place.
          </p>
        </div>
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
            <ul className="list-disc list-inside">
              {pkg.benefits.map((item: any, index: any) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 mt-4">
            <Link href="/dashboard/package">
              <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-zinc-100">Back to List</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPackage;
