"use client";

import { faker } from "@faker-js/faker";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function AddBookMarkButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBookMark = async () => {
    setIsLoading(true);

    const novelData = {
      author: faker.internet.userName(),
      chapter_number: faker.number.int({ min: 1, max: 50 }), // Random chapter number between 1 and 50
      last_visit: new Date().toISOString(), // Random recent date
    };

    // console.log(novelData);

    try {
      // Show loading toast
      const loadingToastId = toast.loading("กำลังเพิ่ม...");

      // Set a delay before making the POST request
      const delay = 1000; // 1 second delay
      await new Promise((resolve) => setTimeout(resolve, delay));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MOCK_NOVELS_API}/api/novels`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novelData),
        }
      );
      toast.remove(loadingToastId);
      if (!response.ok) {
        toast.error("เพิ่มไม่สำเร็จ");
        throw new Error("Can't add new bookmark");
      }
      toast.success("เพิ่มที่คั่นใหม่สำเร็จ!");
      return response.json();
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <TooltipProvider delayDuration={400} skipDelayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>
          {isLoading ? (
            <Button
              disabled
              variant="outline"
              className="text-slate-400 rounded-full relative"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              กำลังเพิ่ม
            </Button>
          ) : (
            <Button
              onClick={handleAddBookMark}
              variant="outline"
              className="text-slate-400 rounded-full relative"
            >
              เพิ่ม
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent className="transition-transform transform">
          <p>เพิ่มรายการที่คั่นจำลอง</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
