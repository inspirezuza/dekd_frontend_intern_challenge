import { formatDateThai } from "@/lib/formatDateThai";

async function getNovel(id: string) {
  const url = new URL(`${process.env.MOCK_NOVELS_API}/novels/${id}`);
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
export default async function Page({ params }: { params: { slug: string } }) {
  const novel = await getNovel(params.slug);
  return (
    <>
      <div className="p-4">ID นิยาย: {params.slug}</div>
      <div className="p-4">ผู้แต่ง: {novel.author}</div>
      <div className="p-4">ตอนที่: {novel.chapter_number}</div>
      <div className="p-4">คั่นเมื่อ: {formatDateThai(novel.last_visit)}</div>
    </>
  );
}
