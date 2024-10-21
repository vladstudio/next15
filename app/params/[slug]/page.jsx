import { ClientSearchParams } from "./ClientSearchParams";

export default async function Page({ params, searchParams }) {
  return (
    <>
      <p>
        server-side params: {JSON.stringify(await params, null, 2)}
      </p>
      <p>
        server-side searchParams: {JSON.stringify(await searchParams, null, 2)}
      </p>
      <p>
        client-side searchParams: <ClientSearchParams />
      </p>
    </>
  );
}
