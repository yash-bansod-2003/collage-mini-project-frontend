import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Formik/FormikControl';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { jwtService } from '../../services';
import useSWR from 'swr';

const genderOptions = [
    {
        value: 'male',
        key: 'Male',
    },
    {
        value: 'female',
        key: 'Female',
    },
    {
        value: 'other',
        key: 'Other',
    },
];

const branchOptions = [
    {
        value: 'cse',
        key: 'Computer Scienece And Engineering',
    },
    {
        value: 'it',
        key: 'Information And Technology',
    },
    {
        value: 'civil',
        key: 'Civil',
    },
    {
        value: 'extc',
        key: 'Electronics And Telecommunication',
    },
];

const initialValues = {
    name: {
        first: '',
        middle: '',
        last: '',
    },
    email: '',
    contact: '',
    gender: '',
    branch: '',
    qulification: '',
    experience: '',
};

const Teacher = () => {
    const { data: session } = useSession();
    const fetcher = async () => {
        const token = jwtService.sign({
            _id: session.user.id,
            role: session.user.role,
        });

        const response = await axios
            .post('http://127.0.0.1:5000/api/teacher', null, {
                headers: { authorization: `Bearer ${token}` },
            })
            .catch((error) => error.response);
        return response.data;
    };

    const { data: rows, error } = useSWR('teachers', fetcher);

    const validationSchema = Yup.object({
        email: Yup.string().email().required().lowercase(),
        contact: Yup.string().required().lowercase(),
        gender: Yup.string().required().lowercase(),
        branch: Yup.string().required().lowercase(),
        qulification: Yup.string().required().lowercase(),
        experience: Yup.string().required().lowercase(),
    });

    const handleSubmit = async (values) => {
        const {
            name,
            email,
            contact,
            gender,
            branch,
            qulification,
            experience,
        } = values;
        const password = 'stud@123';
        const repeat_password = 'stud@123';

        const response = await axios
            .post('http://127.0.0.1:5000/api/register', {
                name,
                email,
                contact,
                gender,
                branch,
                role: 'teacher',
                qulification,
                experience,
                password,
                repeat_password,
            })
            .catch((err) => err.response);

        console.log(response);
    };

    return (
        <>
            <div className="text-xl breadcrumbs border-b mb-3">
                <ul>
                    <li>
                        <a>Dashboard</a>
                    </li>
                    <li>Faculties</li>
                </ul>
            </div>

            <div className="overflow-x-auto card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100 my-6">
                <table className="table w-full">
                    <thead>
                        <tr key="header">
                            <th></th>
                            <th>name</th>
                            <th>email</th>
                            <th>branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows
                            ? rows.map((row, index) => {
                                  return (
                                      <tr key={row.email}>
                                          <th>{index + 1}</th>
                                          <td>{`${row.name.first} ${row.name.middle} ${row.name.last}`}</td>
                                          <td>{row.email}</td>
                                          <td>{row.branch}</td>
                                      </tr>
                                  );
                              })
                            : 'Nothing'}
                    </tbody>
                </table>
            </div>

            <div className="card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100">
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="grid gap-y-6 grid-rows-3 grid-cols-3">
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
                                        label="yashbansod2020@gmail.com"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Contact
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="contact"
                                        label="9356650334"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Gender
                                        </span>
                                    </label>
                                    <FormikControl
                                        label="Select Gender"
                                        name="gender"
                                        control="select"
                                        options={genderOptions}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Branch
                                        </span>
                                    </label>
                                    <FormikControl
                                        label="Select Branch"
                                        name="branch"
                                        control="select"
                                        options={branchOptions}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Qulification
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="qulification"
                                        label="Qulification"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Experience
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="experience"
                                        label="Experience"
                                    />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <motion.button
                                    className="btn btn-primary w-fit gap-2"
                                    type="submit"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1.1 }}
                                >
                                    Add New Faculty
                                    <PlusIcon className="h-6 w-6" />
                                </motion.button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Teacher;
