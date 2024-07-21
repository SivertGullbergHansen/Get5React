export default function Page({ params }: { params: { map: string } }) {
  return <div>Map: {params.map}</div>;
}
