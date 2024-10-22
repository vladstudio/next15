export default function Layout({ children }) {
  return (
    <>
      <h3>Fetch datа from server</h3>
      <hr />
      {children}
      <hr />
      <a href="/fetch-data">Reload</a>
      <a href="/fetch-data/?simulateDelay=1">Reload with slow network</a>
      <a href="/fetch-data/?simulateError=1">Reload with error</a>
    </>
  );
}
