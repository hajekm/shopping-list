import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faListCheck, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Menubar } from "primereact/menubar";
import { Link, Outlet } from "react-router-dom";
import { ShoppingListService } from "../Service";
import {ToggleButton} from "primereact/togglebutton";
import {useTheme} from "../bricks/ThemeProvider";
import Cookies from 'universal-cookie';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../bricks/LanguageSwitcher";

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
  const [checked, setChecked] = useState(false)
  const {changeTheme} = useTheme();
  const cookies = new Cookies();
  const { t } = useTranslation();

  useEffect(() => {
      const themeCookie = cookies.get('dark-theme');
      if (!themeCookie) {
        cookies.set('dark-theme', checked, {path: '/'});
      } else {
        setChecked(themeCookie)
      }
      changeTheme(checked ? "bootstrap4-dark-blue" : "bootstrap4-light-blue");
    ShoppingListService.getUser("abcd").then(async (response) => {
      try {
        const responseJson = await response.json();
        switch (response.status) {
          case 200:
            setUser(responseJson);
            setLabel(t('aaa'));
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

  const start = () => (
    <Link className="mr-8" to="/">
      <FontAwesomeIcon size={"3x"} icon={faListCheck} />
    </Link>
  );

  const end = () => (
    <div>
        <LanguageSwitcher/>
      <ToggleButton className={"mr-3"} onIcon={<FontAwesomeIcon icon={faMoon}/>}
                    offIcon={<FontAwesomeIcon icon={faSun}/>}
                    checked={checked} onLabel="" offLabel="" onChange={(e) => {
        cookies.set('dark-theme', !checked, {path: '/'});
        setChecked(!checked);
        changeTheme(checked ? "bootstrap4-light-blue" : "bootstrap4-dark-blue");
      }}/>
      <Button
        icon={<FontAwesomeIcon icon={faUsers} className="mr-1" />}
        label={label}
        onClick={(e) => {}}
      />
    </div>
  );

  return (
    <div className="App">
      <Menubar title={t("aaa")} start={start} end={end} />
      <Outlet />
    </div>
  );
}
export default Header;
