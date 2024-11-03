"use server";
import { paystack } from "./paystack";
import { createClient } from "./supabase/server";

export const getCustomer = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) return {};

  const { data: customer } = await supabase
    .from("customer")
    .select("*")
    .eq("id", data.user?.id)
    .single();

  if (customer === null) {
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
    if (newCustomer) {
      const response = await paystack.subscription.list({
        customer: newCustomer.customer_id,
      });

      //@ts-ignore
      return response.data[0];
    }
  }
  const response = await paystack.subscription.list({
    customer: customer.customer_id,
  });
  //@ts-ignore
  return response.data[0];
};
