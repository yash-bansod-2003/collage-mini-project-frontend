import { Field, ErrorMessage } from 'formik';
import React from 'react';
// import TextError from "../ErrorComponent";
// import { Select, Option } from "@material-tailwind/react";

const MySelect = (propes) => {
    const { label, name, options, ...rest } = propes;

    return (
        <>
            {/* <Field as={Select} label={label} name={name} id={name} {...rest}>
        <Option>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            );
          })}
        </Option>
      </Field> */}
            {/* <ErrorMessage name={name} component={TextError} /> */}
        </>
    );
};

export default MySelect;
