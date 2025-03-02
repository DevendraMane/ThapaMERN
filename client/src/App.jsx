import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { SignUp } from "./pages/SignUp";
import { AppLayout } from "./components/layout/AppLayout";
import "./App.css";
import { Login } from "./pages/Login";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminContacts } from "./pages/AdminContacts";
import { AdminUpdate } from "./pages/AdminUpdate";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      errorElement: <Error />,
      children: [
        { path: "users", element: <AdminUsers /> },
        { path: "users/update/:id", element: <AdminUpdate /> },
        { path: "contacts", element: <AdminContacts /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
