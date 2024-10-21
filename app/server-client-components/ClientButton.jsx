"use client";

const testAlert = () => {
  alert("test");
};
export function ClientButton() {
  return <button onClick={() => testAlert()}>Alert</button>;
}
