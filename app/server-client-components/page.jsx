import { ClientButton } from "./ClientButton";

export default async function Page() {
  return (
    <>
      <ul>
        <li>
          Components in the app directory (such as this `page.jsx`) are React
          Server Components by default.
        </li>
        <li>
          Client components can be imported into server components, but not the
          other way around.
        </li>
      </ul>
      <hr />
      <ClientButton />
    </>
  );
}
