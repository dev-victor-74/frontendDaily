"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const Faq = () => {
  return (
    <div className="w-full md:w-[60%] mx-auto flex flex-col gap-2 items-center justify-center mt-10">
      <div className="w-fulll items-center justify-center">
        <h2 className="text-center text-2xl md:text-3xl text-zinc-900 font-bold md:font-extrabold">
          Frequently Asked Questions
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg text-zinc-800 font-bold text-start">
            what is frontendDaily?
          </AccordionTrigger>
          <AccordionContent className="text-sm font-semibold text-neutral-800">
            It is a platform to practice & build frontend projects.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg text-zinc-800 font-bold text-start">
            Who can use frontendDaily?
          </AccordionTrigger>
          <AccordionContent className="text-sm font-semibold text-neutral-800">
            Anybody that wants to learn or advance their frontend knowledge.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg text-zinc-800 font-bold text-start">
            Can I access all the challenges?
          </AccordionTrigger>
          <AccordionContent className="text-sm font-semibold text-neutral-800">
            Yes there&apos;re free challenges that is free for everyone and
            premium challenges for premium members.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg text-zinc-800 font-bold text-start">
            What the benefits that comes with premium membership?
          </AccordionTrigger>
          <AccordionContent className="text-sm font-semibold text-neutral-800">
            You get access to all the challenges and you can build upto seven
            premium projects in one month.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
