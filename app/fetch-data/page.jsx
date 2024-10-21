import Form from "next/form";
import { fetchSampleData, revalidateSampleData } from "./actions";

export default async function Page({ searchParams }) {
  const simulateError = (await searchParams).simulateError;
  const simulateDelay = (await searchParams).simulateDelay;
  const sampleData = await fetchSampleData({ simulateError, simulateDelay });
  return (
    <>
      <pre className="text-xs">{JSON.stringify(sampleData, null, 2)}</pre>
      <hr />
      <Form action={revalidateSampleData}>
        <button type="submit">Revalidate</button>
      </Form>
    </>
  );
}
