import { Field, ErrorMessage } from "formik";
// import TextError from "../ErrorComponent";
import { Input } from "@material-tailwind/react";

const MyInput = (propes) => {
  const { label, name, type, className, ...rest } = propes;

  return (
    <>
      <Field
        as={Input}
        size="md"
        label={label}
        type={type}
        name={name}
        className="bg-white  text-base text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out  rounded-lg w-full border outline-none"
        {...rest}
      />
      {/* <ErrorMessage name={name} component={TextError} /> */}
    </>
  );
};

export default MyInput;
