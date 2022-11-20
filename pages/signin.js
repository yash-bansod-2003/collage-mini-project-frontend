import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/Formik/FormikControl';
import { signIn } from 'next-auth/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });

    const handleSubmit = async (values) => {
        const { email, password } = values;

        const status = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/',
        });

        if (status.error) {
            console.log(status.error);
        }

        if (status.ok) {
            router.push('/');
        } else {
            console.log(status.error);
        }
    };
    return (
        <div className="hero min-h-[88vh] bg-base-200 container mx-auto my-2">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="email"
                                        control="input"
                                        name="email"
                                        label="email"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Password
                                        </span>
                                    </label>
                                    <label className="input-group">
                                        <FormikControl
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            control="input"
                                            name="password"
                                            label="password"
                                        />
                                        <span>
                                            <div
                                                className="tooltip"
                                                data-tip={
                                                    showPassword
                                                        ? 'hide password'
                                                        : 'show password'
                                                }
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="toggle ease-in duration-300"
                                                    checked={showPassword}
                                                    onChange={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )}
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                />
                                            </div>
                                        </span>
                                    </label>
                                    <label className="label">
                                        <a
                                            href="#"
                                            className="label-text-alt link link-hover"
                                        >
                                            Forgot password?
                                        </a>
                                    </label>
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
            </div>
        </div>
    );
};

export default Signin;
