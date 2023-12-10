import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { Menubar } from "primereact/menubar";
import { Link, Outlet } from "react-router-dom";
import { ShoppingListService } from "../Service";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";

let emptyMember = {
  email: "",
  created_at: "",
  avatar: "",
  id: "",
};

function Header() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(emptyMember);
  const [label, setLabel] = useState("Login");
  const [callStatus, setCallStatus] = useState({ state: "pending" });

  useEffect(() => {
    ShoppingListService.getUser("abcd").then(async (response) => {
      try {
        const responseJson = await response.json();
        switch (response.status) {
          case 200:
            setUser(responseJson);
            setLabel("Logout");
            setCallStatus({ state: "ok" });
            break;
          default:
            console.log(response);
            setLabel("Login");
            break;
        }
      } catch (error) {
        setCallStatus({ state: "error", error: error.message });
      }
    });
  }, []);
  // const items = [
  //   {
  //     label: "Recepty",
  //     icon: <FontAwesomeIcon className={"mr-3"} icon={faUtensils} />,
  //     url: "/recipes",
  //   },
  //   {
  //     label: "Ingredience",
  //     icon: <FontAwesomeIcon className={"mr-3"} icon={faLemon} />,
  //     url: "/ingredients",
  //   },
  // ];
  const start = () => (
    <Link className="mr-8" to="/">
      <FontAwesomeIcon size={"3x"} icon={faListCheck} />
    </Link>
  );

  const end = () => (
    <div>
      <span className="mr-2">{user.email}</span>
      <Button
        icon={<FontAwesomeIcon icon={faUsers} className="mr-1" />}
        label={label}
        onClick={(e) => {}}
      />
    </div>
  );

  return (
    <div className="App">
      <Menubar title="Shopping List" start={start} end={end} />
      <Outlet />
    </div>
  );
}
export default Header;
