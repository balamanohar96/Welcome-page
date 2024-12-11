import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./Welcome";
import Form from "../components/Form";
import React from "react";

const Routes = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Form />,
    },
    {
      path: "/welcome",
      element: <Welcome />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default Routes;
