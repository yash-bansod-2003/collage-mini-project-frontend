import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Formik/FormikControl';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { jwtService, selectionMaker } from '../../services';
import nanoId from 'nano-id';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers, setTeachers } from '../../redux/teacherSlice';

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
};

const validationSchema = Yup.object({
    email: Yup.string().email().required().lowercase(),
    contact: Yup.string().required().lowercase(),
    gender: Yup.string().required().lowercase(),
    branch: Yup.string().required().lowercase(),
});


const Teacher = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const rows = useSelector(state => state.teacher.data);
    const courses = useSelector(state => state.course.data);

    useEffect(() => {
        dispatch(fetchTeachers());
    }, []);

    useEffect(() => {
    }, [rows]);

    const handleSubmit = async (values, { resetForm }) => {
        const { name, email, contact, gender, branch } = values;
        const password = 'stud@123';
        const repeat_password = 'stud@123';

        const response = await axios
            .post('http://127.0.0.1:5000/api/register', {
                name,
                email,
                contact,
                gender,
                branch,
                password,
                role: 'teacher',
                repeat_password,
            })
            .catch((err) => err.response);

        response?.status === 200 ?
            dispatch(setTeachers([...rows, {
                name,
                email,
                contact,
                gender,
                branch,
                password,
                role: 'teacher',
                repeat_password,
            }])) : null;

        resetForm();
    };

    return (
        <>
            <div className="card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100">
                <h2 className='my-2 text-secondary text-2xl'>Add New Facultie</h2>
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="grid gap-y-6 gap-x-6 grid-rows-3 grid-cols-3">
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
                                        label="Neha"
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
                                        label=""
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
                                        label="Rathi"
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
                                        label="neha@gmail.com"
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
                                        options={selectionMaker(courses)}
                                    />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary w-fit gap-2"
                                    type="submit"
                                >
                                    Add New Student
                                    <PlusIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>

            <div className="overflow-x-auto card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100 my-6">
                {rows.length !== 0 ?
                    <table className="table w-full">
                        <thead>
                            <tr key={nanoId(4)}>
                                <th>sr no</th>
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
                    </table> : null}
            </div>
        </>
    );
};

export default Teacher;
