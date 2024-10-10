"use client";

import { _30_DAYS_IN_MILLISECONDS } from "@/lib/constants";
import { useUser } from "@/lib/store/modal-store";
import { ResetApiLimit } from "@/utils/actions/apilimit";
import { getUser } from "@/utils/actions/getUser";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

const UserProvider = () => {
  const { onLogin } = useUser();
  const supabase = createClient();

  const readUserData = async () => {
    const { data: user } = await supabase.auth.getUser();
    const data = await getUser(user.user?.id);
    onLogin(data);

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
  }, [supabase, onLogin, readUserData]);

  return <></>;
};

export default UserProvider;
