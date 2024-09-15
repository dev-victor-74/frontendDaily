import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { createClient } from "@/utils/supabase/server";

import React, { ReactNode } from "react";

interface dashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout = async ({ children }: dashboardLayoutProps) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const { data: apiLimit, error } = await supabase
    .from("user_api_limit")
    .select("*")
    .eq("user_id", data?.user?.id);

  return (
    <div className="w-full h-screen flex">
      <div className="fixed h-full w-[220px] hidden md:flex bg-[#fff] ring-1 ring-[#e2ddf0] px-2 py-3 shadow-md">
        <Sidebar count={apiLimit && apiLimit[0]?.count} />
      </div>
      <div className="w-full pl-0 md:pl-[220px] h-screen pr-1">
        <div className="w-full md:w-[98%] mx-auto px-4 md:px-0">
          <DashboardNavbar user={data?.user} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
