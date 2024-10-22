"use client";
import { useState, useActionState, useEffect } from "react";
import { addTodoAction } from "./actions";
import Form from "next/form";

export function Client({ fetchedTodos }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    setTodos(fetchedTodos);
  }, [fetchedTodos]);

  const [newTodoText, setNewTodoText] = useState("");
  const [result, _action, isPending] = useActionState(addTodoAction, null);
  const addFutureTodo = (value) => {
    setTodos((prev) => [...prev, { text: value }]);
    setNewTodoText("");
  };
  return (
    <>
      <ul>{!!todos && todos.map((x, id) => <li key={id}>{x.text}</li>)}</ul>
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
      <p>isPending: {JSON.stringify(isPending, null, 2)}</p>
      <p>result: {JSON.stringify(result, null, 2)}</p>
    </>
  );
}
