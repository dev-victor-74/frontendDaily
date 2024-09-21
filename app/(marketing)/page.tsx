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

  const displays = [
    {
      label: "Beginners",
      description:
        "The challenges we offer, cover a range of difficulty levels, allowing users to gradually improve their skills as they progress. From basic HTML and CSS tasks to more advanced JavaScript and frontend challenges, users can choose challenges that match their current skill level and gradually advance to more complex problems.",
    },
    {
      label: "Students",
      description:
        "The platform offers practical coding challenges that allow users to apply theoretical knowledge in a real-world context. This hands-on experience is crucial for students as it reinforces learning and helps them develop problem-solving skills, a critical aspect of becoming proficient in web development.",
    },
    {
      label: "Developers",
      description:
        "For developers looking to strengthen their frontend skills, We offer a curated set of challenges spanning various difficulty levels. These challenges cover fundamental concepts as well as advanced topics, enabling developers to enhance their proficiency in HTML, CSS, JavaScript, and frontend frameworks.",
    },
  ];

  return (
    <main
      id="home"
      className="
       w-full 
    "
    >
      <Hero />
      <div className="w-full px-1 md:w-[90%] lg:w-[85%] mt-5 md:mt-10 mx-auto flex flex-col gap-4">
        <div className="w-full md:w-[60%] mx-auto">
          <h1 className=" text-2xl font-bold md:text-4xl md:font-extrabold text-center text-zinc-900">
            Boost your coding skill by building real life challenges
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displays.map((display) => (
            <div
              key={display.label}
              className=" flex flex-col gap-2 ring-2 shadow-sm rounded-sm p-2 ring-[#977fda]"
            >
              <h2 className=" text-center text-[16px] md:text-xl font-extrabold text-zinc-900">
                {display.label}
              </h2>
              <div className=" text-sm font-medium text-center text-neutral-700">
                {display.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Faq />
      <Testimonial />
    </main>
  );
}
