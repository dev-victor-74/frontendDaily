import { paystack } from "@/utils/paystack";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if (!body.code) return NextResponse.json("Missing Fields", { status: 404 });
  try {
    const res1 = await paystack.subscription.generateSubscriptionLink(
      body.code
    );

    // const res = await paystack.subscription.disable({
    //   code: body.code,
    //   token: body.email_token,
    // });

    return NextResponse.json(res1, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
