import React from "react";
import { Tag } from "primereact/tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

function DateTag(props) {
  let current = props.date;
  if (current.includes("T")) {
    current = current.split("T")[0];
  }
  var parts = current.split("-");
  current = parts[2] + "." + parts[1] + "." + parts[0];

  return (
    <Tag
      value={current}
      icon={
        <FontAwesomeIcon
          size={"xs"}
          className={"mr-1"}
          icon={faCalendarCheck}
        />
      }
      style={{ background: "white" }}
    ></Tag>
  );
}

export default DateTag;
