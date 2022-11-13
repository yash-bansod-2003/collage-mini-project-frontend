import { Field, ErrorMessage } from "formik";
import React from "react";
// import TextError from "../ErrorComponent";
import { Textarea } from "@material-tailwind/react";

const MyTextarea = (propes) => {
  const { label, name, ...rest } = propes;

  return (
    <>
      <Field as={Textarea} label={label} id={name} name={name} {...rest} />
      {/* <ErrorMessage name={name} component={TextError} /> */}
      {/* <ErrorMessage name={name} component={TextError} />z */}
    </>
  );
};

export default MyTextarea;
