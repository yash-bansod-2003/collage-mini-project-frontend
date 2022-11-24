import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Formik/FormikControl';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { jwtService } from '../../services';
import nanoId from 'nano-id';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubjects, setSubjects } from '../../redux/subjectSlice';

const semesterOptions = [
    {
        value: 1,
        key: '1',
    }, {
        value: 2,
        key: '2',
    }, {
        value: 3,
        key: '3',
    }, {
        value: 4,
        key: '4',
    }, {
        value: 5,
        key: '5',
    }, {
        value: 6,
        key: '6',
    }, {
        value: 7,
        key: '7',
    }, {
        value: 8,
        key: '8',
    },
];

const typeOptions = [
    {
        value: 'core',
        key: 'Core',
    },
    {
        value: 'optional',
        key: 'Optional',
    },
];

const initialValues = {
    code: nanoId(4),
    name: '',
    semester: '',
    type: '',
    marks: {
        theory: '80',
        practical: '20'
    }
};

const validationSchema = Yup.object({
    name: Yup.string().required().max(50),
    code: Yup.string().required().max(20),
    semester: Yup.number().required(),
    type: Yup.string().required(),
    marks: Yup.object().required()
});

const Subject = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const rows = useSelector(state => state.subject.data);

    useEffect(() => {
        dispatch(fetchSubjects());
    }, []);


    const handleSubmit = async (values, { resetForm }) => {
        const { code, name, semester, type, marks } = values;

        const token = jwtService.sign({
            _id: session.user.id,
            role: session.user.role,
        });

        const response = await axios.post('http://127.0.0.1:5000/api/subject', {
            code, name, semester, type, marks
        }, { headers: { authorization: `Bearer ${token}` } }).catch(error => error.response);

        response.status === 200 ? dispatch(setSubjects([...rows, { code, name, semester, type, marks }])) : null;
        resetForm();
    };

    return (
        <>
            <div className="card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100">
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div className="grid gap-y-6 gap-x-6 grid-rows-1 grid-cols-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Subject Code
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
                                            Subject Name
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="name"
                                        label="computer science and engineering"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Subject Type
                                        </span>
                                    </label>
                                    <FormikControl
                                        label="Subject Type"
                                        name="type"
                                        control="select"
                                        options={typeOptions}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Semester
                                        </span>
                                    </label>
                                    <FormikControl
                                        label="Semester"
                                        name="semester"
                                        control="select"
                                        options={semesterOptions}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Subject Theory Marks
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="number"
                                        control="input"
                                        name="marks.theory"
                                        label="80"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Subject Practical Marks
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="number"
                                        control="input"
                                        name="marks.practical"
                                        label="20"
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

            <div className="overflow-x-auto card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100 my-6">
                {
                    rows.length !== 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr key={nanoId(5)}>
                                    <th></th>
                                    <th>code</th>
                                    <th>name</th>
                                    <th>semester</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rows.map((row, index) => {
                                        return (
                                            <tr key={row.code}>
                                                <th>{index + 1}</th>
                                                <td>{row.code}</td>
                                                <td>{row.name}</td>
                                                <td>{row.semester}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table> : <div className="alert shadow-lg">
                            <h2 className='text-2xl text-secondary'>No Courses To Display</h2>
                        </div>
                }

            </div>
        </>
    );
};

export default Subject;
