import React from "react";
import {Tag} from "primereact/tag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarCheck} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

function DateTag(props) {
    const {i18n} = useTranslation();
    let current = props.date;
    if (current.includes("T")) {
        current = current.split("T")[0];
    }
    var parts = current.split("-");
    if (i18n.language === "cs") {
        current = parts[2] + "." + parts[1] + "." + parts[0];
    } else {
        current = parts[1] + "/" + parts[2] + "/" + parts[0];
    }
    return (
        <Tag
            className="m-1"
            value={current}
            icon={
                <FontAwesomeIcon
                    size={"xs"}
                    className={"mr-1"}
                    icon={faCalendarCheck}
                />
            }
        ></Tag>
    );
}

export default DateTag;
