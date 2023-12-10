import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import ShoppingLists from "./routes/ShoppingLists";
import Header from "./routes/Header";
import ItemsList from "./bricks/ItemsList";

const router = createBrowserRouter([
  {
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ShoppingLists />,
        index: true,
      },
      {
        path: "/list/:id",
        element: <ItemsList />,
      },
      // {
      //   path: "/ingredients",
      //   element: <Ingredients />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
