import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ToggleButton} from "primereact/togglebutton";

function LanguageSwitcher() {
    const {i18n} = useTranslation();
    const [checked, setChecked] = useState(i18n.language === "en");

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