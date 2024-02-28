import { formatDateThai } from "@/lib/formatDateThai";
import Image from "next/image";
import Link from "next/link";

interface Novel {
  author: string;
  chapter_number: number;
  last_visit: string;
  id: string;
}
export default function NovelCard({ novel }: { novel: Novel }) {
  const lorem_novel_name_thai =
    "เป็นอนุฯสุขใจยิ่ง ชื่อยาวไปๆ <我是姨娘> ยาวสุดๆเลยครับพี่ จะยาวไปไหนอะ ถามจริงเหอะ ขอร้องเลย เห้ยพอได้แล้ว!";

  return (
    <>
      <div
        className="max-w-xs w-full mb-4  h-[150px] rounded-md "
        key={novel.id}
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
          <div className="flex flex-1 flex-col justify-between w-full pl-4">
            <div>
              <Link href={`/novel/${novel.id}`}>
                <div className=" text-slate-700 mb-1 font-bold line-clamp-2 hover:underline">
                  {lorem_novel_name_thai}
                </div>
              </Link>
              <Link href={`/author/${novel.author}`}>
                <div className="text-xs hover:underline">{novel.author}</div>
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
                <div className="line-clamp-1 font-medium text-slate-400 text-sm">
                  {formatDateThai(novel.last_visit)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
