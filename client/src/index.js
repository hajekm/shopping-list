import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import ShoppingLists from "./routes/ShoppingLists";

const router = createBrowserRouter([
  {
    element: <ShoppingLists />,
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
