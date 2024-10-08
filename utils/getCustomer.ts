"use server";
import { paystack } from "./paystack";
import { createClient } from "./supabase/server";

export const getCustomer = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data) throw new Error("Unauthorized!");

  const { data: customer } = await supabase
    .from("customer")
    .select("*")
    .eq("id", data.user?.id)
    .single();

  if (!customer) {
    const result = await paystack.customer.create({
      email: data.user?.user_metadata.email,
      first_name: data.user?.user_metadata.user_name,
      last_name: data.user?.user_metadata.user_name,
    });

    const { data: newCustomer } = await supabase
      .from("customer")
      .insert({
        id: data.user?.id,
        customer_code: result.data?.customer_code,
        customer_id: result.data?.id,
      })
      .select()
      .single();
    return newCustomer;
  }
  return customer;
};
