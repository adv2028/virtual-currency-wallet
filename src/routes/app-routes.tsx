import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { Result } from "../pages/result";
import { NotFoundPage } from "../pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    ErrorBoundary: () => <>No se pudo cargar la pagina</>
  },
  {
    path: "/resultado",
    element: <Result />,
    ErrorBoundary: () => <>No se pudo cargar la pagina</>
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);