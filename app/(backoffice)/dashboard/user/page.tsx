import React from "react";
import { DataTable } from "@/components/dataTable/DataTable";
import { API_BASE_URL } from "@/lib/config/constant";
import { columns } from "./columns";
import { Metadata } from "next";
import { userFilterConfig } from "@/lib/filterConfigFactory";

export const metadata: Metadata = {
  title: "Manage Users",
};

export default async function page() {
  return (
    <div className="container mx-auto p-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
          จัดการผู้ใช้งาน
        </h1>
        <DataTable
          columns={columns}
          apiUrl={`${API_BASE_URL}/admin/users`}
          filterableColumns={["roles", "isActive", "createdAt"]}
          filterConfig={userFilterConfig}
          createPath={"/dashboard/user/create"}
          tableKey="users"
          titleText="ผู้ใช้งาน"
        />
      </div>
    </div>
  );
}
