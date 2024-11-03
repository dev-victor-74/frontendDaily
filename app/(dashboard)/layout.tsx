import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { getUser } from "@/utils/actions/getUser";
import { getCustomer } from "@/utils/getCustomer";
import { createClient } from "@/utils/supabase/server";

import React, { ReactNode } from "react";

interface dashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: dashboardLayoutProps) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const dBuser = await getUser(data.user?.id);

  const subscription = await getCustomer();
  const {
    email_token,
    next_payment_date,
    subscription_code,
    status,
    createdAt,
  } = subscription;

  const { data: apiLimit } = await supabase
    .from("user_api_limit")
    .select("*")
    .eq("user_id", data?.user?.id);

  return (
    <div className="w-full h-screen flex">
      <div className="fixed h-full w-[220px] hidden md:flex bg-[#fff] ring-1 ring-[#e2ddf0] px-2 py-3 shadow-md">
        <Sidebar
          count={apiLimit && apiLimit[0]?.count}
          email_token={email_token}
          next_payment_date={next_payment_date}
          status={status}
          subscription_code={subscription_code}
          createdAt={createdAt}
          user={data?.user}
          dBuser={dBuser}
        />
      </div>
      <div className="w-full pl-0 md:pl-[220px] h-screen md:pr-1">
        <div className="w-full md:w-[98%] mx-auto px-2 md:px-0">
          <DashboardNavbar
            user={data?.user}
            count={apiLimit && apiLimit[0]?.count}
            email_token={email_token}
            next_payment_date={next_payment_date}
            status={status}
            subscription_code={subscription_code}
            createdAt={createdAt}
            dBuser={dBuser}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
