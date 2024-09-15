import { paystack } from "@/utils/paystack";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if (!body.code || !body.email_token)
    return NextResponse.json("Missing Fields", { status: 404 });
  try {
    const res = await paystack.subscription.disable({
      token: body.email_token,
      code: body.code,
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
