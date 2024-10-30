import Form from "next/form";
import { fetchSampleData, revalidateSampleData } from "./server";
import RevalidateOnFocus from "./RevalidateOnFocus";

export default async function Page({ searchParams }) {
  const { simulateError, simulateDelay } = await searchParams;
  const sampleData = await fetchSampleData({ simulateError, simulateDelay });
  return (
    <>
      <RevalidateOnFocus />
      <pre className="text-xs">{JSON.stringify(sampleData, null, 2)}</pre>
      <hr />
      <Form action={revalidateSampleData}>
        <button type="submit">Revalidate</button>
      </Form>
    </>
  );
}
