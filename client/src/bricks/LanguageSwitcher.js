import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {ToggleButton} from "primereact/togglebutton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [checked, setChecked] = useState(false);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    return (
            <ToggleButton className={"mr-3"}
                          checked={checked} onLabel="EN" offLabel="CZ" onChange={(e) => {
                setChecked(!checked);
                changeLanguage(checked ? "cs" : "en");
            }}/>
    );
}

export default LanguageSwitcher;