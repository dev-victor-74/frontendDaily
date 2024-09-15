"use client";

import { useUser, UseSubscription } from "@/lib/store/modal-store";
import { getUser } from "@/utils/actions/getUser";
import { useEffect } from "react";

const UserProvider = () => {
  const { onLogin } = useUser();
  const { onLoadSubscription } = UseSubscription();

  const loadUserSubscription = async (code: string) => {
    try {
      const response = await fetch("/api/getUserSub", {
        method: "post",
        body: JSON.stringify(code),
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
      } = data.data[1];

      onLoadSubscription({
        id,
        email_token,
        amount,
        next_payment_date,
        subscription_code,
        status,
        createdAt,
      });
    } catch (error) {}
  };

  const readUserData = async () => {
    const data = await getUser();
    onLogin(data);

    if (data) {
      await loadUserSubscription(data.customer.customer_code);
    }
  };
  useEffect(() => {
    readUserData();
  }, []);

  return <></>;
};

export default UserProvider;
