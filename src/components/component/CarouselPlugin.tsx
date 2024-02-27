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
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "../ui/progress";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(6);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      opts={{ align: "center", loop: true }}
    >
      <CarouselContent className="">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index} className="pl-0 md:basis-1/2 md:pl-3">
            <div className="">
              <Link href={`/novel/${index + 1}`}>
                <Image
                  src="https://placehold.co/700x373/png"
                  alt="carousel image"
                  width={700}
                  height={373}
                />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-[1.5px] left-0 right-0 flex justify-center items-center py-2 text-sm text-muted-foreground">
        {current}/{count}
      </div>
      <Progress
        value={(current * 100) / count}
        className="absolute bottom-3 left-0 right-0 mx-auto w-[90%] md:w-[30%] opacity-20"
      />
      <CarouselPrevious className="left-4 opacity-80" />
      <CarouselNext className="right-4 opacity-80" />
    </Carousel>
  );
}
