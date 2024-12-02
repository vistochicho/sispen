import React from "react";
import PackageListPage from "./components/package-list-page";

const PackageList = () => {
  return (
    <main className="bg-white h-auto">
      <div className="p-6">
        <PackageListPage />
      </div>
    </main>
  );
};

export default PackageList;
