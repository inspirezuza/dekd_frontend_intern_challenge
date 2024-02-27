import { CarouselPlugin } from "@/components/component/CarouselPlugin";
import Image from "next/image";

export default function Test() {
  return (
    <>
      <div className="">
        {/* <Image
          src="https://placehold.co/700x373/png"
          alt="carousel image"
          width={700}
          height={373}
        /> */}
        <CarouselPlugin />
      </div>
    </>
  );
}
