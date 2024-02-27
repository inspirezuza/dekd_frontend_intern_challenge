"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

function formatDateThai(dateString: string) {
  const monthsThai = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear() + 543; // Convert to Thai year
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const thaiDate = `${day} ${monthsThai[monthIndex]} ${year}`;
  const time = `${hours}:${minutes < 10 ? "0" : ""}${minutes} น.`;

  return `${thaiDate} / ${time}`;
}

interface Novel {
  author: string;
  chapter_number: number;
  last_visit: string;
  id: string;
}

export default function NovelSection({ novels }: { novels: Novel[] }) {
  const lorem_novel_name_thai =
    "เป็นอนุฯสุขใจยิ่ง ชื่อยาวไปๆ <我是姨娘> ยาวสุดๆเลยครับพี่ จะยาวไปไหนอะ ถามจริงเหอะ ขอร้องเลย เห้ยพอได้แล้ว!";
  console.log("1", formatDateThai(novels[0].last_visit));
  console.log("2", formatDateThai(novels[1].last_visit));
  console.log("3", formatDateThai(novels[2].last_visit));
  return (
    <>
      <div className="md:max-w-screen-md lg:max-w-screen-lg mx-auto p-4 ">
        <div className="flex justify-between items-center py-2 md:py-5 ">
          <div className="text-sm text-slate-400">จำนวนทั้งหมด รายการ</div>
          <Button variant="outline" className="text-slate-400 rounded-full">
            แก้ไข
          </Button>
        </div>
        {/* <div className="flex flex-wrap gap-4 justify-center"> */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center animate-fade-up animate-ease-out">
          {novels.map((novel, index) => (
            <div
              className="max-w-xs w-full mb-4  h-[150px] rounded-md "
              key={index}
            >
              <div className="flex">
                <Link href={`/novel/${novel.id}`}>
                  <Image
                    src="https://placehold.co/100x150/png"
                    alt="carousel image"
                    width={100}
                    height={150}
                    className="h-full rounded-sm transition-transform transform hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between w-full px-4">
                  <div>
                    <Link href={`/novel/${novel.id}`}>
                      <div className=" text-slate-700 mb-1 font-bold line-clamp-2 hover:underline">
                        {lorem_novel_name_thai}
                      </div>
                    </Link>
                    <Link href={`/author/${novel.author}`}>
                      <div className="text-xs hover:underline">
                        {novel.author}
                      </div>
                    </Link>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={`/chapter.svg`}
                        alt="chapter icon"
                        width={14.77}
                        height={12}
                        className="mr-1 text-slate-400"
                      />

                      <div className="line-clamp-1 font-medium text-slate-400 text-sm">{`ตอนที่ ${novel.chapter_number}: ${lorem_novel_name_thai}`}</div>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src={`/bookmark.svg`}
                        alt="bookmark icon"
                        width={14.77}
                        height={12}
                        className="mr-1"
                      />
                      <div className="font-medium text-slate-400 text-sm">
                        {formatDateThai(novel.last_visit)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
