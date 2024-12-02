import Link from "next/link";
import React from "react";
import { FaDotCircle } from "react-icons/fa";

const PackageListPage = () => {
  return (
    <div className="flex flex-row justify-between items-center gap-8 ">
      <div className="align-items text-center p-8 border border-zinc-600 bg-gray-50">
        <p className="text-md font-semibold">Package 1</p>
        <h1 className="text-4xl text-black font-md py-4">Rp. 9.999.999,00</h1>
        <p className="text-md font-sm border-b-1 text-zinc-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
          the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <div className="space-y-4 py-4">
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Business License</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Tax System</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Company Profile</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Free Company Website</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Free Absent System</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Free ERP System</span>
          </div>
        </div>
        <Link href="/dashboard/package-list/package-form">
          <button className="border border-zinc-200 mt-4 py-2 px-4 rounded-sm w-full bg-zinc-200">Pilih Paket</button>
        </Link>
      </div>

      <div className="align-items text-center p-8 border border-zinc-600 bg-gray-50">
        <p className="text-md font-semibold">Package 2</p>
        <h1 className="text-4xl text-black font-md py-4">Rp. 9.999.999,00</h1>
        <p className="text-md font-sm border-b-1 text-zinc-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
          the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <div className="space-y-4 py-4">
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Business License</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Tax System</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Company Profile</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Free Company Website</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Free Absent System</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Free ERP System</span>
          </div>
        </div>
        <Link href="/dashboard/package-list/package-form">
          <button className="border border-zinc-200 mt-4 py-2 px-4 rounded-sm w-full bg-zinc-200">Pilih Paket</button>
        </Link>
      </div>

      <div className="align-items text-center p-8 border border-zinc-600 bg-gray-50">
        <p className="text-md font-semibold">Package 3</p>
        <h1 className="text-4xl text-black font-md py-4">Rp. 9.999.999,00</h1>
        <p className="text-md font-sm border-b-1 text-zinc-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
          the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <div className="space-y-4 py-4">
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Business License</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Tax System</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Company Profile</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Free Company Website</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Free Absent System</span>
          </div>
          <div className="flex items-center">
            <FaDotCircle className="size-4 mr-2 text-zinc-400" />
            <span className="text-base text-zinc-400">Free ERP System</span>
          </div>
        </div>
        <Link href="/dashboard/package-list/package-form">
          <button className="border border-zinc-200 mt-4 py-2 px-4 rounded-sm w-full bg-zinc-200">Pilih Paket</button>
        </Link>
      </div>
    </div>
  );
};

export default PackageListPage;
