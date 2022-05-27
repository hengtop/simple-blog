import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { routes } from "router";
import { ThemeModeProvider } from "context";

function App() {
  const router = useRoutes(routes as RouteObject[]);
  return (
    <ThemeModeProvider>
      <div className="App">{router}</div>
    </ThemeModeProvider>
  );
}

export default App;
