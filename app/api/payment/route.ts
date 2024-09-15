import { paystack } from "@/utils/paystack";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const res = await paystack.transaction.initialize({
      email: "nnamdivictor317@gmail.com",
      amount: "1500",
      plan: "PLN_1nh7i9ft6ghao19",
      channels: ["card"],
      callback_url: "http://localhost:3000/challenges",
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
