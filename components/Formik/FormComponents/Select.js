import { Field, ErrorMessage } from 'formik';
import React from 'react';
// import TextError from "../ErrorComponent";
// import { Select, Option } from "@material-tailwind/react";

const MySelect = (propes) => {
    const { label, name, options, ...rest } = propes;

    return (
        <>
            <Field
                as="select"
                className="select select-bordered w-full max-w-xs"
                name={name}
                id={name}
                {...rest}
            >
                <option defaultValue={null}>{label}</option>
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    );
                })}
            </Field>
        </>
    );
};

export default MySelect;
