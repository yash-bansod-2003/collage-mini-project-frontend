import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Formik/FormikControl';

const Student = () => {
    const initialValues = {
        name: {
            first: '',
            middle: '',
            last: '',
        },
        email: '',
    };

    const validationSchema = Yup.object({
        // first: Yup.string().required().lowercase(),
        // middle: Yup.string().required().lowercase(),
        // last: Yup.string().required().lowercase(),
    });

    const handleSubmit = async (values) => {
        console.log(values);
    };

    return (
        <>
            <div className="text-xl breadcrumbs border-b mb-3">
                <ul>
                    <li>
                        <a>Dashboard</a>
                    </li>
                    <li>Students</li>
                </ul>
            </div>

            <div className="card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100">
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="flex justify-between">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            First Name
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="name.first"
                                        label="Yash"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Middle Name
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="name.middle"
                                        label="Gajanan"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Last Name
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="name.last"
                                        label="Bansod"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <FormikControl
                                    type="email"
                                    control="input"
                                    name="email"
                                    label="yashbansod2020@gmail.com"
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Student;
