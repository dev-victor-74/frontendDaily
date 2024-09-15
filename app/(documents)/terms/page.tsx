"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TermsOfServicePage = () => {
  const terms = [
    {
      label: "Acceptance of terms",
      desc: "By accessing or using the services provided by FrontendCoach, you agree to abide by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
    },

    {
      label: "Use of Licence",
      desc: "FrontendProjects grants users a limited license to access and use the materials provided on this website for personal, non-commercial transitory viewing only. This license does not include the right to modify or copy the materials, use them for any commercial purpose, or remove any copyright or other proprietary notations from the materials.",
    },
    {
      label: "User Account",
      desc: "Users may be required to create an account to access certain features or services on FrontendProjects. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and complete information when creating an account and to update your information as necessary to keep it accurate and current.",
    },
    {
      label: "User Conduct",
      desc: "Users are prohibited from engaging in any conduct that may disrupt or interfere with the operation of FrontendCoach or the experience of other users. This includes but is not limited to uploading or transmitting any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable",
    },
    {
      label: "Intellectual Property",
      desc: "The materials and content provided on FrontendCoach, including but not limited to text, graphics, logos, images, and software, are owned by or licensed to FrontendCoach and are protected by copyright and other intellectual property laws. Users may not reproduce, distribute, modify, transmit, display, or otherwise use any materials or content from FrontendCoach without the prior written consent of FrontendCoach.",
    },
    {
      label: "Limitation of Liability",
      desc: "FrontendProjects and its affiliates, officers, directors, employees, agents, and licensors shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of or inability to use FrontendCoach, even if FrontendCoach has been advised of the possibility of such damages.",
    },
  ];
  const router = useRouter();

  return (
    <main className="w-full h-full px-4 py-5">
      <div className="w-full relative">
        <div className=" absolute top-5 cursor-pointer left-2 bg-purple-300 rounded-full hover:bg-purple-200 p-2">
          <MoveLeft size={18} className="" onClick={() => router.back()} />
        </div>
      </div>
      <h1 className=" text-xl md:text-3xl font-bold text-neutral-800 md:font-extrabold text-center mt-5 ">
        Terms and condition
      </h1>
      <div className="w-full md:w-[60%] lg:w-[55%] mx-auto mt-3 flex flex-col gap-3">
        <div className="text-lg font-semibold text-neutral-800 text-center">
          These Terms and Conditions outline the rules and regulations for the
          use of our website and services. By accessing FrontendProjects, you
          accept these terms and conditions in full.
        </div>
        <div className="w-full mt-3 flex flex-col gap-3">
          {terms.map((term, index) => (
            <div className="w-full flex flex-col gap-1" key={term.label}>
              <h2 className=" text-xl font-extrabold text-neutral-900">
                <span className="text-sm font-semibold">
                  {index + 1}
                  {". "}
                </span>
                {term.label}
              </h2>
              <p className="text-sm md:text-[15px] font-semibold text-zinc-700 text-justify ">
                {term.desc}
              </p>
            </div>
          ))}

          <p className="text-sm md:text-[15px] font-semibold mt-3 You are free to refuse our request fom text-zinc-800 text-justify ">
            This terms is effective as of 25 April 2024.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsOfServicePage;
