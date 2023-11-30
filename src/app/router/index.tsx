import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { ContentPage } from "../../pages/content";
import { WithAuthProvider } from "../providers/withAuth";
import { RegisterPage } from "../../pages/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WithAuthProvider />,
    children: [
      {
        index: true,
        element: <ContentPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
