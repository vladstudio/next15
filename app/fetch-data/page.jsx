import Form from "next/form";
import {
  fetchSampleData,
  revalidateSampleData,
} from "@/app/server-actions/sampleData";

export default async function Page({ searchParams }) {
  const simulateError = (await searchParams).simulateError;
  const sampleData = await fetchSampleData({ simulateError });
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
