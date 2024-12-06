import React from "react";
import PackageListPage from "./components/package-list-page";

const PackageList = async () => {
  const fetchPackageList = async (): Promise<GetPackageList[]> => {
    return [
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
  };

  const data = await fetchPackageList();

  return (
    <div className="bg-white h-auto">
      <div className="p-6">
        <PackageListPage dataPackage={data} />
      </div>
    </div>
  );
};

export default PackageList;
