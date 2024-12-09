import React from "react";
import PackageListPage from "./components/package-list-page";

const PackageList = async () => {
  const fetchPackageList = async (): Promise<GetPackageList[]> => {
    return [
      {
        id: "1",
        title: "Pembuatan CV",
        price: 3950000,
        description: "AKTA, SK, SKT, NPWP DOMISILI, NIB RBA, IJIN USAHA, API",
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
        title: "Pembuatan PT",
        price: 5350000,
        description: "AKTA, SK, SKT, NPWP DOMISILI, NIB RBA, IJIN USAHA, API",
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
        title: "Pembuatan PMA",
        price: 8150000,
        description: "AKTA, SK, SKT, NPWP DOMISILI, NIB RBA, IJIN USAHA, API",
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
  };

  const data = await fetchPackageList();

  return (
    <div className="p-6">
      <PackageListPage dataPackage={data} />
    </div>
  );
};

export default PackageList;
