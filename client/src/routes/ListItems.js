import React from "react";
import ItemsList from "../bricks/ItemsList";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function ListItems() {
  return (
    <div className="App">
      <ItemsList />
    </div>
  );
}

export default ListItems;
