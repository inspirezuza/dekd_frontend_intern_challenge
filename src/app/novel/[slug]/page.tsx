export default function Page({ params }: { params: { slug: string } }) {
  return <div>Novel: {params.slug}</div>;
}
