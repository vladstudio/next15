export default async function Page({ searchParams }) {
  return (
    <>
      <p>searchParams: {JSON.stringify(await searchParams, null, 2)}</p>
    </>
  );
}
