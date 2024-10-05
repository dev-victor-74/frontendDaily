import { paystack } from "@/utils/paystack";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const supabase = createClient();

  const body = await req.json();

  if (!body) return NextResponse.json("Missing fields", { status: 404 });
  const customer = await supabase
    .from("customer")
    .select()
    .eq("id", body)
    .single();
  if (!customer.data)
    return NextResponse.json("Missing fields", { status: 404 });

  try {
    const response = await paystack.subscription.list({
      customer: customer.data.customer_id,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
