import { CarouselPlugin } from "@/components/component/CarouselPlugin";
import NovelSection from "@/components/component/NovelSection";
import { Button } from "@/components/ui/button";

async function getNovels() {
  const url = new URL(`${process.env.MOCK_NOVELS_API}/api/novels`);
  url.searchParams.append("sortBy", "last_visit");
  url.searchParams.append("order", "desc");
  const response = await fetch(url, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Can't fetch");
  }
  return response.json();
}

export default async function Test() {
  const novels = await getNovels();
  return (
    <>
      <div className="">
        <CarouselPlugin />
        <div className="">
          <div className="md:max-w-screen-md lg:max-w-screen-lg mx-auto text-2xl md:text-3xl font-semibold text-slate-700 pb-4 pt-4 md:pt-16 px-4">
            รายการที่คั่นไว้
          </div>
          <div className="border-solid border-slate-400 opacity-10 border-b-4"></div>
          <NovelSection novels={novels} />
        </div>
      </div>
    </>
  );
}
