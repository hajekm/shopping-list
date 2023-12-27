import React from "react";
import {Tag} from "primereact/tag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faSpinner,} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

function StatusTag(props) {
    const {t} = useTranslation();
    const getSeverity = (item) => {
        switch (item) {
            case "done":
                return "success";

            case "new":
                return "info";

            case "cancelled":
                return "danger";

            default:
                return null;
        }
    };

    switch (props.status) {
        case "done":
            return (
                <Tag
                    value={t('statusDone')}
                    rounded
                    icon={
                        <FontAwesomeIcon
                            size={"xs"}
                            className={"mr-1"}
                            icon={faCircleCheck}
                        />
                    }
                    severity={getSeverity(props.status)}
                ></Tag>
            );
        case "cancelled":
            return (
                <Tag
                    value={t('statusCancelled')}
                    rounded
                    icon={
                        <FontAwesomeIcon
                            size={"xs"}
                            className={"mr-1"}
                            icon={faCircleXmark}
                        />
                    }
                    severity={getSeverity(props.status)}
                ></Tag>
            );
        default:
            return (
                <Tag
                    value={t('statusNew')}
                    rounded
                    icon={
                        <FontAwesomeIcon size={"xs"} className={"mr-1"} icon={faSpinner}/>
                    }
                    severity={getSeverity(props.status)}
                ></Tag>
            );
    }
}

export default StatusTag;
