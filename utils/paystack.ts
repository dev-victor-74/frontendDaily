import { Paystack } from "paystack-sdk";

export const paystack = new Paystack(process.env.PAYSTACK!);
