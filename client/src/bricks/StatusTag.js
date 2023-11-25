import React from "react";
import { Tag } from "primereact/tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

function StatusTag(props) {
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
          value="Hotový"
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
          value="Zrušený"
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
          value="Nový"
          rounded
          icon={
            <FontAwesomeIcon size={"xs"} className={"mr-1"} icon={faSpinner} />
          }
          severity={getSeverity(props.status)}
        ></Tag>
      );
  }
}

export default StatusTag;
