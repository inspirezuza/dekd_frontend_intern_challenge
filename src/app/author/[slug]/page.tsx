export default function Page({ params }: { params: { slug: string } }) {
  return <div className="p-4">ผู้แต่ง: {params.slug}</div>;
}
