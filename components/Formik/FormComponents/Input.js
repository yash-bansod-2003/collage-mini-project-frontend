import { Field, ErrorMessage } from 'formik';
// import TextError from "../ErrorComponent";

const MyInput = (propes) => {
    const { label, name, type, className, ...rest } = propes;

    return (
        <>
            <Field
                size="md"
                placeholder={label}
                type={type}
                name={name}
                className="input input-bordered w-full max-w-xs"
                {...rest}
            />
            {/* <ErrorMessage name={name} component={TextError} /> */}
        </>
    );
};

export default MyInput;
