"use client";

import { _30_DAYS_IN_MILLISECONDS } from "@/lib/constants";
import { useUser, UseSubscription } from "@/lib/store/modal-store";
import { ResetApiLimit } from "@/utils/actions/apilimit";
import { getUser } from "@/utils/actions/getUser";
import { getCustomer } from "@/utils/getCustomer";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

const UserProvider = () => {
  const { onLogin } = useUser();
  const { onLoadSubscription } = UseSubscription();
  const supabase = createClient();

  const loadUserSubscription = async (userId: string) => {
    try {
      const response = await fetch("/api/getUserSub", {
        method: "post",
        body: JSON.stringify(userId),
      });
      const data = await response.json();
      const {
        id,
        email_token,
        amount,
        next_payment_date,
        subscription_code,
        status,
        createdAt,
      } = data.data[0];

      const isPremium =
        (status === "active" &&
          new Date(next_payment_date as string).getTime() > Date.now()) ||
        ((status === "cancelled" || status === "non-renewing") &&
          new Date().getTime() - new Date(createdAt).getTime() <=
            _30_DAYS_IN_MILLISECONDS);

      onLoadSubscription({
        id,
        email_token,
        amount,
        next_payment_date,
        subscription_code,
        status,
        isPremium,
        createdAt,
      });
    } catch (error) {}
  };

  const readUserData = async () => {
    const { data: user } = await supabase.auth.getUser();
    const data = await getUser(user.user?.id);
    const customer = await getCustomer();
    onLogin(data);

    if (customer) {
      await loadUserSubscription(customer.customer_id);
    }

    if (data) {
      const { data: apilimit } = await supabase
        .from("user_api_limit")
        .select("*")
        .eq("user_id", data?.id)
        .limit(1);

      if (
        apilimit?.length &&
        new Date().getMonth() -
          new Date(apilimit[0].last_reset_date).getMonth() >=
          1
      ) {
        await ResetApiLimit(data.email);
      }
    }
  };
  useEffect(() => {
    readUserData();
  }, [supabase, onLoadSubscription, onLogin, readUserData]);

  return <></>;
};

export default UserProvider;
