import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function ServicesCarousel() {
  return (
    <Carousel
      className="lg:drop-shadow-[0_0_16px_rgba(80,20,255,0.7)]"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {Array(5)
          .fill(null)
          .map((_, n) => (
            <CarouselItem>
              <img
                src={`/images/carousel/${n + 1}.png`}
                className="p-1 bg-primary-tint-1 rounded-lg h-auto mx-auto"
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
