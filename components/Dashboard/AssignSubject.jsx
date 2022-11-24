import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Formik/FormikControl';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { jwtService, selectionUserMaker, selectionMaker } from '../../services';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, setCourses } from '../../redux/courseSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const initialValues = {
    teacher: '',
    subject: '',
};

const validationSchema = Yup.object({
    teacher: Yup.string().required(),
    subject: Yup.string().required(),
});

const AssignSubject = () => {

    const { data: session } = useSession();
    const dispatch = useDispatch();
    const subjects = useSelector(state => state.subject.data);
    const teachers = useSelector(state => state.teacher.data);

    console.log(teachers);

    const handleSubmit = async (values, { resetForm }) => {
        const { teacher, subject } = values;

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


    return (
        <>
            <ToastContainer position="top-left" theme='dark' />

            <div className="card flex-shrink-0 w-full max-w-full shadow-2xl bg-base-100">
                <h2 className='my-2 text-secondary text-2xl'>Assign Subject To Facultie</h2>
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
                                            Select Facltie
                                        </span>
                                    </label>
                                    <FormikControl
                                        label="Select Facltie"
                                        name="teacher"
                                        control="select"
                                        options={selectionUserMaker(teachers)}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Select Subject
                                        </span>
                                    </label>
                                    <FormikControl
                                        label="Select Subject"
                                        name="subject"
                                        control="select"
                                        options={selectionMaker(subjects)}
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

export default AssignSubject;
