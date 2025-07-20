import React from "react";

interface ClientStatusProps {
  clientStatus: GetClientStatus[];
}

const DashboardAdmin = ({ clientStatus }: ClientStatusProps) => {
  const status = clientStatus[0];

  return (
    <div className="flex flex-col justify-center space-y-4">
      <div className="flex justify-center gap-4">
        <div className="flex flex-col items-center border border-zinc-400 bg-gray-100 p-6 w-full text-center">
          <span className="text-sm text-gray-500">Total Customer</span>
          <span className="text-2xl font-semibold text-gray-800">{status.total_customer}</span>
        </div>
        <div className="flex flex-col items-center border border-zinc-400 bg-gray-100 p-6 w-full text-center">
          <span className="text-sm text-gray-500">Total Client</span>
          <span className="text-2xl font-semibold text-gray-800">{status.total_client}</span>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex flex-col items-center border border-zinc-400 bg-gray-100 p-6 w-full text-center">
          <span className="text-sm text-gray-500">Total Need Review</span>
          <span className="text-2xl font-semibold text-gray-800">{status.total_need_review}</span>
        </div>
        <div className="flex flex-col items-center border border-zinc-400 bg-gray-100 p-6 w-full text-center">
          <span className="text-sm text-gray-500">Total On Progress</span>
          <span className="text-2xl font-semibold text-gray-800">{status.total_on_progress}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
