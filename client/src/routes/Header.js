import React from "react";
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
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function Header() {
  const start = (
    <Link className="mr-8" to="/">
      <FontAwesomeIcon size={"3x"} icon={faListCheck} />
    </Link>
  );

  const end = (
    <Dropdown
      icon={<FontAwesomeIcon icon={faUser} className="mr-1" />}
      // value={selectedCity}
      // onChange={(e) => setSelectedCity(e.value)}
      // options={cities}
      optionLabel="name"
      placeholder="Select a City"
      className="w-full md:w-14rem"
    />
  );
  return (
    <div className="App">
      <Menubar title="Shopping List" start={start} end={end} />
      <Outlet />
    </div>
  );
}
export default Header;
