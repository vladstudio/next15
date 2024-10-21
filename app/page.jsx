import Link from "next/link";

export default async function Page() {
  return (
    <>
      <Link href="/fetch-data">Fetch data from server</Link>
      <Link href="/form">Send data using form</Link>
      <Link href="/form-optimistic">Optimistic data update</Link>
      <Link href="/protected/?123=456">Protected page</Link>
      <Link href="/params/123/?456=789">Params</Link>
      <Link href="/server-client-components">Server &amp; client components</Link>
    </>
  );
}
