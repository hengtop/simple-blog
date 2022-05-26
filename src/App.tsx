import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { routes } from "router";

function App() {
  const router = useRoutes(routes as RouteObject[]);
  return <div className="App">{router}</div>;
}

export default App;
