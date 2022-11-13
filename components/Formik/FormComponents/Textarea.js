import { Field, ErrorMessage } from 'formik';
import React from 'react';
// import TextError from "../ErrorComponent";

const MyTextarea = (propes) => {
    const { label, name, ...rest } = propes;

    return (
        <>
            <Field
                as="textarea"
                className="textarea textarea-bordered"
                placeholder={label}
                name={name}
                {...rest}
            />
            {/* <ErrorMessage name={name} component={TextError} /> */}
            {/* <ErrorMessage name={name} component={TextError} />z */}
        </>
    );
};

export default MyTextarea;
