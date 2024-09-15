import Faq from "@/components/home/faq";
import Hero from "@/components/home/hero";
import Testimonial from "@/components/home/testimonial";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return redirect("/challenges");
  }

  return (
    <main
      id="home"
      className="
       w-full 
    "
    >
      <Hero />
      <Faq />
      <Testimonial />
    </main>
  );
}
