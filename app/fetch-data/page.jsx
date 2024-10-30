import Form from "next/form";
import { fetchSampleData, revalidateSampleData } from "./server";
import RefreshOnTabFocus from "./RefreshOnTabFocus";

export default async function Page({ searchParams }) {
  const { simulateError, simulateDelay } = await searchParams;
  const sampleData = await fetchSampleData({ simulateError, simulateDelay });
  return (
    <>
      <RefreshOnTabFocus />
      <pre className="text-xs">{JSON.stringify(sampleData, null, 2)}</pre>
      <hr />
      <Form action={revalidateSampleData}>
        <button type="submit">Revalidate</button>
      </Form>
    </>
  );
}
