import React from "react";
import ItemsList from "../bricks/ItemsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faLemon,
  faUtensils,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Menubar } from "primereact/menubar";
import { Dropdown } from "primereact/dropdown";
import { Link, Outlet } from "react-router-dom";

function ListItems() {
  return (
    <div className="App">
      <ItemsList />
    </div>
  );
}

export default ListItems;
