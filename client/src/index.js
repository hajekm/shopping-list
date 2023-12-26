import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error-page";
import ShoppingLists from "./routes/ShoppingLists";
import Header from "./routes/Header";
import ItemsList from "./bricks/ItemsList";
import {ThemeProvider} from "./bricks/ThemeProvider";

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
    <ThemeProvider>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
