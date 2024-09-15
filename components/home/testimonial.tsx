"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Testimonial = () => {
  return (
    <div className="w-full flex flex-col gap-2 items-center justify-center mt-10">
      <div className="w-fulll items-center justify-center">
        <h2 className=" text-center text-2xl md:text-4xl text-zinc-900 font-bold md:font-extrabold">
          Testimonials
        </h2>
      </div>
      <Carousel className="w-full max-w-xs md:max-w-[400px] mt-3">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1 ">
                <Card className="ring-2">
                  <CardContent className="flex aspect-square items-center justify-center flex-col p-1">
                    <span className="text-xl font-semibold">{index + 1}</span>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sit quibusdam quaerat rerum sapiente minus harum tenetur
                      cupiditate dolorum ex! Quidem aliquid soluta maiores
                      ratione? Commodi sunt voluptate deserunt sequi aliquid.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Testimonial;
