import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginPage />
    ),
  },
  // TODO: 페이지 추가
]);

export default router;