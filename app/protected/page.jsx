import { getUser } from "@/utils/getUser";

export default async function Page() {
  const user = await getUser();
  return (
    <>
      <p>
        This page is protected. See <pre>/protectedPaths.js</pre>
      </p>
      <p>user: {JSON.stringify(user, null, 2)}</p>
    </>
  );
}
