import { fetchTodosAction } from "./actions";
import { Client } from "./Client";

export default async function Page() {
  const serverTodos = await fetchTodosAction();
  return (
    <>
      <Client serverTodos={serverTodos} />
    </>
  );
}
