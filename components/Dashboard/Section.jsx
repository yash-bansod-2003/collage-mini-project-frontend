import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../Formik/FormikControl';
import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { jwtService } from '../../services';
import nanoId from 'nano-id';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubjects } from '../../redux/subjectSlice';
import { fetchSections } from '../../redux/sectionSlice';

const initialValues = {
    code: nanoId(4),
    name: '',
};

const validationSchema = Yup.object({
    name: Yup.string().required().max(50),
    code: Yup.string().required().max(20),
});

const Section = () => {
    const dispatch = useDispatch();
    const rows = useSelector(state => state.section.data);

    const { data: session } = useSession();

    useEffect(() => {
        dispatch(fetchSections());
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        const { code, name, semestercount } = values;

        const token = jwtService.sign({
            _id: session.user.id,
            role: session.user.role,
        });

        const response = await axios.post('http://127.0.0.1:5000/api/section', {
            code, name
        }, { headers: { authorization: `Bearer ${token}` } }).catch(error => error.response);

        if (response.status === 200) {
            setRows([...rows, { code, name }]);
            toast('New Section Created');
        } else {
            toast(response.data.message);
        }
        resetForm();
    };

    return (
        <>
            <ToastContainer position="top-left" theme='dark' />

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
                                            Section Code
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
                                            Section Name
                                        </span>
                                    </label>
                                    <FormikControl
                                        type="text"
                                        control="input"
                                        name="name"
                                        label="computer science and engineering"
                                    />
                                </div>

                            </div>
                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary w-fit gap-2"
                                    type="submit"
                                >
                                    Add New Section
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

export default Section;
