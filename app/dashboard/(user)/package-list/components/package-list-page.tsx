import Link from "next/link";
import { FaDotCircle } from "react-icons/fa";

interface PackageListProps {
  dataPackage: GetPackageList[];
}

const PackageListPage = ({ dataPackage }: PackageListProps) => {
  return (
    <div className="flex flex-row justify-between items-center gap-8 ">
      {dataPackage && dataPackage.length > 0 ? (
        <>
          {dataPackage.map((data, i) => (
            <div key={i} className="align-items text-center p-8 border border-zinc-600 bg-gray-50">
              <p className="text-md font-semibold">{data.title}</p>
              <h1 className="text-4xl text-black font-md py-4">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "idr" }).format(data.price)}</h1>
              <p className="text-md font-sm border-b-1 text-zinc-400">{data.description}</p>
              <div className="space-y-4 py-4">
                {data.package_list?.map((dataBonus, j) => (
                  <div key={j} className="flex items-center">
                    <FaDotCircle className="size-4 mr-2 text-zinc-400" />
                    <span className="text-base text-zinc-400">{dataBonus.bonus_name}</span>
                  </div>
                ))}
              </div>
              <Link href={`/dashboard/package-list/package-form/${data.id}`}>
                <button className="border border-zinc-200 mt-4 py-2 px-4 rounded-sm w-full bg-zinc-200">Pilih Paket</button>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PackageListPage;
