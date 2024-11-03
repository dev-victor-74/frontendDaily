import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface layoutProps {
  children: React.ReactNode;
}
const MatketingLayout = async ({ children }: layoutProps) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return redirect("/challenges");
  }

  return (
    <div className="w-full h-full px-2 md:px-6 md:w-[95%] mx-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MatketingLayout;
