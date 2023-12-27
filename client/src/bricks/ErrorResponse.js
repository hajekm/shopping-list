import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSadCry} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

function ErrorResponse(props) {
    const {t} = useTranslation();
    return (
        <div className="flex flex-column mt-8 align-items-center justify-content-center">
            <h2>{t('errorTitle')}</h2>
            <FontAwesomeIcon icon={faFaceSadCry} size="4x"/>
            <h4>
                {props.status} - {props.statusText}
            </h4>
            <p>{props.message}</p>
        </div>
    );
}

export default ErrorResponse;
