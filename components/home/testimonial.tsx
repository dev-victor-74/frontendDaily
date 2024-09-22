"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emmanuel Chukwuemeka",
      path: "/chidera.webp",
      description:
        "I have been using frontendDaily for a few months now and I am blown away by how much my coding skills have improved. The coding challenges keep me on my toes and constantly learning new techniques. It has not only helped me in my current job, but also opened up new opportunities for me. Thank you frontendDaily for providing such a valuable resource!",
    },
    {
      name: "Cynthia Oluwatobi",
      path: "/cynthia.jpg",
      description:
        "As a beginner in frontend development, I struggled to find ways to practice and improve my coding skills. Thankfully, I discovered frontendDaily and it has been an amazing resource for me. The coding challenges are challenging yet manageable, ever since, my coding abilities have improved tremendously since joining this platform.",
    },
    {
      name: "Chidera Ihedi",
      path: "/emmanuel.webp",
      description:
        "I have been a frontendDaily user for the past few months now and I can confidently say that it has greatly improved my coding skills. The coding challenges are fun, challenging, and relevant to real-life projects. It's like having a personal trainer for my coding abilities! Thanks to frontendDaily, I am more confident in tackling complex coding tasks and have seen a significant improvement in the quality of my work.",
    },
    {
      name: "Zainab Amina",
      path: "/zainab.jpg",
      description:
        "I have been using frontendDaily for a few months now, and it has greatly improved my coding skills. The coding challenges are fun and challenging, keeping me on my toes and helping me stay up-to-date with the latest techniques in frontend development. I highly recommend frontendDaily to anyone looking to sharpen their coding abilities!",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center mt-10">
      <div className="w-fulll items-center justify-center">
        <h2 className=" text-center text-2xl md:text-4xl text-zinc-900 font-bold md:font-extrabold">
          Testimonials
        </h2>
      </div>
      <Carousel className="w-full max-w-xs md:max-w-[400px] mt-3">
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name}>
              <div className="p-1 ">
                <Card className="p-2">
                  <CardContent className="flex flex-col items-center justify-center h-full">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 py-5">
                      <div className=" w-full flex flex-col items-center justify-center gap-2">
                        <div className="w-[80px] h-[80px] overflow-hidden rounded-full ring-2 ring-[#542cc2] mx-auto relative">
                          <Image
                            src={testimonial.path}
                            fill
                            alt={testimonial.name}
                            className=" object-cover"
                          />
                        </div>
                        <div className="w-full text-sm font-bold text-zinc-900 flex items-center justify-center">
                          {testimonial.name}
                        </div>
                      </div>
                      <div className=" text-center text-sm font-normal text-neutral-800">
                        {testimonial.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" h-8 w-8 rounded-full ring-1 ring-[#8c78c2]" />
        <CarouselNext className=" h-8 w-8 rounded-full ring-1 ring-[#8c78c2]" />
      </Carousel>
    </div>
  );
};

export default Testimonial;
