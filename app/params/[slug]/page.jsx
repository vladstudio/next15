import { ClientSearchParams } from "./ClientSearchParams";

export default async function Page({ params, searchParams }) {
  const serverSideParams = await params
  return (
    <>
      <p>server-side params: {JSON.stringify(serverSideParams, null, 2)}</p>
      <p>
        server-side searchParams: {JSON.stringify(await searchParams, null, 2)}
      </p>
      <p>
        <a href={`/params/${serverSideParams.slug}/client/`}>client-side page</a>
      </p>
      <p>
        client-sid component: <ClientSearchParams />
      </p>
    </>
  );
}
