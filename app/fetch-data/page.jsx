import Form from "next/form";
import { fetchSampleData, revalidateSampleData } from "./server";
import RevlidateOnFocus from "./ClientWrapper";

export default async function Page({ searchParams }) {
  const { simulateError, simulateDelay } = await searchParams;
  const sampleData = await fetchSampleData({ simulateError, simulateDelay });
  return (
    <>
      <RevlidateOnFocus />
      <pre className="text-xs">{JSON.stringify(sampleData, null, 2)}</pre>
      <hr />
      <Form action={revalidateSampleData}>
        <button type="submit">Revalidate</button>
      </Form>
    </>
  );
}
