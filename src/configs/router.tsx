import HomeLayout from "layouts/home"
import { SignIn, SignUp } from "modules/auth/pages"
import Owners from "modules/owners/pages/Owners"
import Pets from "modules/pets/pages/Pets"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "auth",
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "",
    element: <HomeLayout />,
    children: [
      {
        path: "pets",
        element: <Pets />,
      },
      {
        path: "owners",
        element: <Owners />,
      },
    ],
  },
])
