import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Formik/FormikControl';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { jwtService, selectionMaker } from '../../services';
import nanoId from 'nano-id';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, setCourses } from '../../redux/courseSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    name: Yup.string().required().max(50),
    code: Yup.string().required().max(20),
    semestercount: Yup.number().required(),
});

const updateInitialValues = {
    course: '',
    degree: ''
}

const updateValidationSchema = Yup.object({
    course: Yup.string().required(),
    degree: Yup.string().required(),
});

const Course = () => {

    const { data: session } = useSession();
    const dispatch = useDispatch();
    const rows = useSelector(state => state.course.data);
    const degrees = useSelector(state => state.degree.data);
    const [columns, setColumns] = useState([]);


    useEffect(() => {
        dispatch(fetchCourses());
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        const { code, name, semestercount } = values;

        const token = jwtService.sign({
            _id: session.user.id,
            role: session.user.role,
        });

        const response = await axios.post('http://127.0.0.1:5000/api/course', {
            code, name, semestercount
        }, { headers: { authorization: `Bearer ${token}` } }).catch(error => error.response);

        response.status === 200 ? dispatch(setCourses([...rows, { code, name, semestercount }])) : null;
        resetForm();
    };

    const handleUpdateSubmit = async (values, { resetForm }) => {

        const { course, degree } = values;

        const token = jwtService.sign({
            _id: session.user.id,
            role: session.user.role,
        });

        const response = await axios.put(`http://127.0.0.1:5000/api/degree/${degree}`, {
            course
        }, { headers: { authorization: `Bearer ${token}` } }).catch(error => error.response);

        response?.status === 200 ? toast('Course Added To Degree') : toast(response.data.message);
        resetForm();
    }

    return (
        <>
            <ToastContainer position="top-left" theme='dark' />

            <div className="card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100">
                <h2 className='my-2 text-secondary text-2xl'>Create New Course</h2>
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
                                        label="computer science and engineering"
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

            <div className="card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100 my-6">
                <h2 className='my-2 text-secondary text-2xl'>Add Course To Degree</h2>
                <div className="card-body">
                    <Formik
                        initialValues={updateInitialValues}
                        validationSchema={updateValidationSchema}
                        onSubmit={handleUpdateSubmit}
                    >
                        <Form>
                            <div className="grid gap-y-6 grid-rows-1 grid-cols-3">

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Select Course
                                        </span>
                                    </label>
                                    <FormikControl
                                        label="Select Course"
                                        name="course"
                                        control="select"
                                        options={selectionMaker(rows)}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Select Degree
                                        </span>
                                    </label>
                                    <FormikControl
                                        label="Select Degree"
                                        name="degree"
                                        control="select"
                                        options={selectionMaker(degrees)}
                                    />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary w-fit gap-2"
                                    type="submit"
                                >
                                    add course to degree
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
                                    <th>sr no</th>
                                    <th>code</th>
                                    <th>name</th>
                                    <th>semester count</th>
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
                                                <td>{row.semestercount}</td>
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

export default Course;
