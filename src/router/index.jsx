import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginPage />
    ),
  },
  {
    path: "/user",
    element: (
      <UserPage />
    ),
  },
  {
    path: "/report",
    element: (
      <div></div>
    ),
  },
]);

export default router;