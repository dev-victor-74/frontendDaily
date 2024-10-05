"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PrivacyPolicyPage = () => {
  const router = useRouter();

  return (
    <main className="w-full h-full px-2 py-8">
      <div className="w-full relative">
        <div className="w-full relative">
          <div className=" absolute top-5 cursor-pointer left-2 bg-slate-200 rounded-full hover:bg-slate-300 p-2">
            <MoveLeft size={18} className="" onClick={() => router.back()} />
          </div>
        </div>
      </div>
      <h1 className=" text-xl md:text-3xl font-bold text-neutral-800 md:font-extrabold text-center mt-5 ">
        Privacy Policy
      </h1>
      <div className="w-full md:w-[60%] lg:w-[50%] mx-auto mt-3 flex flex-col gap-3">
        <p className="text-sm md:text-[15px] font-semibold text-zinc-700 text-justify ">
          Your privacy is important to us. It is frontendDaily&apos;s policy to
          respect your privacy regarding any information we may collect from you
          across our website, https://frontendDaily.com, and other sites we own
          and operate.
        </p>
        <p className="text-sm md:text-[15px] font-semibold text-zinc-700 text-justify ">
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we&apos;re collecting
          it and how it will be used.
        </p>
        <p className="text-sm md:text-[15px] font-semibold text-zinc-700 text-justify ">
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store,
          we&apos;ll protect within commercially acceptable means to prevent
          loss and theft, as well as unauthorised access, disclosure, copying,
          use or modification.
        </p>
        <p className="text-sm md:text-[15px] font-semibold text-zinc-700 text-justify ">
          We don&apos;t share any personally identifying information publicly or
          with third-parties, except when required to by law.
        </p>
        <p className="text-sm md:text-[15px] font-semibold text-zinc-700 text-justify ">
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites, and cannot accept responsibility or liability for
          their respective privacy policies.
        </p>
        <p className="text-sm md:text-[15px] font-semibold text-zinc-700 text-justify">
          You are free to refuse our request for your personal information (such
          as your email), with the understanding that we may be unable to
          provide you with some of your desired services.
        </p>
        <p className="text-sm md:text-[15px] font-semibold You are free to refuse our request fom text-zinc-700 text-justify ">
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </p>
        <p className="text-sm md:text-[15px] font-semibold mt-3 You are free to refuse our request fom text-zinc-800 text-justify ">
          This policy is effective as of 25 April 2024.
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
