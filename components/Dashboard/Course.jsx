import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Formik/FormikControl';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { jwtService } from '../../services';
import nanoId from 'nano-id';
import useSWR from 'swr';

const semesterOptions = [
    {
        value: 4,
        key: '4',
    },
    {
        value: 8,
        key: '8',
    },
];

const initialValues = {
    name: '',
    code: nanoId(4),
    semestercount: '',
};

const validationSchema = Yup.object({
    name: Yup.string().required().max(30),
    code: Yup.string().required().max(20),
    semestercount: Yup.number().required(),
});

const fetcher = async () => {
    const response = await axios
        .get('http://127.0.0.1:5000/api/course')
        .catch((error) => error.response);
    return response.data;
};

const Course = () => {
    const { data: session } = useSession();

    const { data: rows, error } = useSWR('courses', fetcher);

    const handleSubmit = async (values) => {
        const { code, name, semestercount } = values;

        //GENERATE A TOKEN FOR SEND TO BACKEND FOR AUTH
        const token = jwtService.sign({
            _id: session.user.id,
            role: session.user.role,
        });

        const response = await axios
            .post(
                'http://127.0.0.1:5000/api/course',
                {
                    code,
                    name,
                    semestercount,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            .catch((err) => err.response);
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

            <div className="overflow-x-auto card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100 my-6">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr key={'header'}>
                            <th></th>
                            <th>code</th>
                            <th>name</th>
                            <th>semester count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows
                            ? rows.map((row, index) => {
                                  return (
                                      <tr key={row.code}>
                                          <th>{index + 1}</th>
                                          <td>{row.code}</td>
                                          <td>{row.name}</td>
                                          <td>{row.semestercount}</td>
                                      </tr>
                                  );
                              })
                            : 'No Data To Display'}
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
                            <div className="grid gap-y-6 grid-rows-1 grid-cols-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Course Code
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="code"
                                        label=""
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Course Name
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="name"
                                        label="civil engineering"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Semester Count
                                        </span>
                                    </label>
                                    <FormikControl
                                        label="Semester Count"
                                        name="semestercount"
                                        control="select"
                                        options={semesterOptions}
                                    />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary w-fit gap-2"
                                    type="submit"
                                >
                                    Add New Course
                                    <PlusIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Course;
