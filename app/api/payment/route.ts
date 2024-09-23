import { paystack } from "@/utils/paystack";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const res = await paystack.transaction.initialize({
      email: "nnamdivictor317@gmail.com",
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
