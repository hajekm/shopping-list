import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import ListItems from "./routes/ListItems";

const router = createBrowserRouter([
  {
    element: <ListItems />,
    errorElement: <ErrorPage />,
    path: "/",
    // children: [
    //   {
    //     path: "/",
    //     element: <ListItems />,
    //     index: true,
    //   },
    //   {
    //     path: "/recipes",
    //     element: <Recipes />,
    //   },
    // {
    //   path: "/ingredients",
    //   element: <Ingredients />,
    // },
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
