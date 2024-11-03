import { paystack } from "@/utils/paystack";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const POST = async () => {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  if (!user.data.user?.email) {
    return NextResponse.json("Missing Fields", { status: 404 });
  }

  try {
    const res = await paystack.transaction.initialize({
      email: user.data.user?.email,
      amount: "1500",
      plan: process.env.PAYSTACK_PLAN_CODE,
      channels: ["card"],
      callback_url: process.env.RETURN_URL,
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
