export default function Page({ children }) {
  return (
    <>
      <h3>Fetch datа from server</h3>
      <hr />
      {children}
      <hr />
      <a href="/fetch-data">
        Reload
      </a>
      <hr />
      <a href="/fetch-data/?simulateError=1">
        Reload with error
      </a>
    </>
  );
}
