import Link from "next/link";
import { FaDotCircle } from "react-icons/fa";

interface PackageListProps {
  dataPackage: GetPackageList[];
}

const PackageListPage = ({ dataPackage }: PackageListProps) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl mb-4 font-semibold">Choose a Package</h1>
      <div className="flex flex-row justify-between items-center gap-8">
        {dataPackage && dataPackage.length > 0 ? (
          <>
            {dataPackage.map(
              (data, i) =>
                data.status === "Active" && (
                  <div key={i} className="align-items text-center p-8 border border-zinc-400 bg-gray-50 rounded-sm">
                    <p className="text-md font-semibold">{data.plan}</p>
                    <h1 className="text-4xl text-black font-md py-4">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "idr" }).format(data.price)}
                    </h1>
                    <p className="text-md font-sm border-b-1 text-zinc-400">{data.description}</p>
                    <div className="space-y-4 py-4">
                      {data.benefits?.map((dataBonus: any, j: any) => (
                        <div key={j} className="flex items-center">
                          <FaDotCircle className="size-2 mr-2 text-zinc-400" />
                          <span className="text-base text-zinc-400">{dataBonus.name}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={`/dashboard/package-list/package-form/${data.id}`}>
                      <button className="border border-zinc-200 mt-4 py-2 px-4 rounded-sm w-full bg-zinc-200">Pilih Paket</button>
                    </Link>
                  </div>
                )
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PackageListPage;
