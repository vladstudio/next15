"use client";

import Form from "next/form";
import { useState, useActionState } from "react";
import { addTodoAction } from "./actions";

export default function Page() {
  const [todos, setTodos] = useState([
    { text: "do this" },
    { text: "do that" },
  ]);
  const [newTodoText, setNewTodoText] = useState("");
  const [result, _action, isPending] = useActionState(addTodoAction, null);
  const addFutureTodo = (value) => {
    setTodos((prev) => [...prev, { text: value }]);
    setNewTodoText("");
  };
  return (
    <>
      <ul>
        {todos.map((x, id) => (
          <li key={id}>{x.text}</li>
        ))}
      </ul>
      <Form
        action={_action}
        onSubmit={(e) => {
          addFutureTodo(newTodoText);
        }}
        className="grid gap-2"
      >
        <p>Add todo:</p>
        <input
          name="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <p>
          <input type="checkbox" name="simulateError" value="1" /> Simulate
          error
        </p>
        <button type="submit"> Add </button>
      </Form>
      <hr />
      <p>isPending: {JSON.stringify(isPending, null, 2)}</p>
      <p>result: {JSON.stringify(result, null, 2)}</p>
    </>
  );
}
