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
              <div className="p-px bg-linear-to-b from-white/90 via-white/40 rounded-lg h-auto mx-auto">
                <img
                  src={`/images/carousel/${n + 1}.png`}
                  className="p-2 bg-black rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
