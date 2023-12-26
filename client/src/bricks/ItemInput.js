import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useField } from "formik";

const ItemInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <span className="p-float-label mt-3">
        <InputText
          id={props.id}
          name={props.name}
          {...field}
          {...props}
          className={classNames({
            "p-invalid": !!(meta.touched && meta.error),
          })}
        />
        <label htmlFor={props.id || props.name}>{label}</label>
      </span>
      {!!(meta.touched && meta.error) ? (
        <small className="p-error">{meta.error}</small>
      ) : (
        <small className="p-error">&nbsp;</small>
      )}
    </>
  );
};

export default ItemInput;
