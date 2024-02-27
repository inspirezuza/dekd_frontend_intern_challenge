"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full   "
      //   onMouseEnter={plugin.current.stop}
      //   onMouseLeave={plugin.current.reset}
      opts={{ align: "center", loop: true }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2">
            <div className="">
              <Link href={`/novel/${index + 1}`}>
                <Image
                  src="https://placehold.co/700x373/png"
                  alt="carousel image"
                  width={700}
                  height={373}
                  className="h-full w-full"
                />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 opacity-80" />
      <CarouselNext className="right-4 opacity-80" />
    </Carousel>
  );
}
