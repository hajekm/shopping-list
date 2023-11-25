import React from "react";
import ShoppingList from "../bricks/ShoppingList";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function ShoppingLists() {
  return (
    <div className="App">
      <ShoppingList />
    </div>
  );
}

export default ShoppingLists;
