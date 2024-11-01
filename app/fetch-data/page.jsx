"use server";
import Form from "next/form";
import { fetchSampleData, revalidateSampleData } from "./server";
import { Suspense } from "react";
import RevalidateOnFocus from "./RevalidateOnFocus";

async function Data({ props }) {
  const { simulateError, simulateDelay } = props;
  const sampleData = await fetchSampleData({ simulateError, simulateDelay });
  return <pre className="text-xs">{JSON.stringify(sampleData, null, 2)}</pre>;
}

export default async function Page({ searchParams }) {
  const props = await searchParams;
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Data props={props} />
      </Suspense>
      <hr />
      <Form action={revalidateSampleData}>
        <button type="submit">Revalidate</button>
      </Form>
      <RevalidateOnFocus />
    </>
  );
}
