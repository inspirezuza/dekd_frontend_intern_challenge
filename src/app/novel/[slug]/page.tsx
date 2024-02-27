export default function Page({ params }: { params: { slug: string } }) {
  return <div className="p-4">นิยายเรื่องที่: {params.slug}</div>;
}
