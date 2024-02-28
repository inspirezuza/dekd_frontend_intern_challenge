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

    console.log(novelData);

    try {
      await toast.promise(
        fetch("https://65de0557dccfcd562f561883.mockapi.io/api/novels", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(novelData),
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Can't add new bookmark");
          }
          return response.json();
        }),
        {
          loading: "กำลังเพิ่ม...",
          success: <b>เพิ่มที่คั่นสำเร็จ!</b>,
          error: <b>เพิ่มที่คั่นไม่สำเร็จ</b>,
        }
      );
      router.refresh();
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setIsLoading(false);
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
