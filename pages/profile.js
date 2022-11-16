import React, { useEffect, useState } from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import axios from 'axios';
import { jwtService } from '../services';

const Profile = ({ user, session }) => {
    return (
        <div className="container mx-auto my-2 flex">
            <div className="w-1/2 flex justify-center">
                <div className="mt-8">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary mx-auto ring-offset-base-100 ring-offset-2">
                                <UserIcon className="w-24 h-24" />
                            </div>
                        </div>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{`${user?.name.first} ${user?.name.last}`}</h2>
                            <p>{user?.branch}</p>
                            <div className="card-actions"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 space-y-6">
                <div className="">
                    <div className="px-2 space-y-2">
                        <div className="grid w-full h-14 border-b text-primary-content place-content-center grid-cols-3">
                            <p className="col-span-1">Full Name</p>
                            <p className="col-span-2">{`${user?.name.first} ${user?.name.middle} ${user?.name.last}`}</p>
                        </div>
                        <div className="grid w-full h-14 border-b text-primary-content place-content-center grid-cols-3">
                            <p className="col-span-1">Email</p>
                            <p className="col-span-2">{user?.email}</p>
                        </div>
                        <div className="grid w-full h-14 border-b text-primary-content place-content-center grid-cols-3">
                            <p className="col-span-1">Phone</p>
                            <p className="col-span-2">+91 {user?.contact}</p>
                        </div>
                        <div className="grid w-full h-14 border-b text-primary-content place-content-center grid-cols-3">
                            <p className="col-span-1">Branch</p>
                            <p className="col-span-2">{user?.branch}</p>
                        </div>
                        <div className="grid w-full h-14 border-b text-primary-content place-content-center grid-cols-3">
                            <p className="col-span-1">Section</p>
                            <p className="col-span-2">{user?.section}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-1/2">
                        <div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                <h2>Theory Subjects</h2>
                            </div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                1
                            </div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                2
                            </div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                3
                            </div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                4
                            </div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                5
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                Practical Subjects
                            </div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                1
                            </div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                2
                            </div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                3
                            </div>
                            <div className="grid w-full h-14 border-b text-primary-content place-content-center">
                                4
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const token = jwtService.sign({
        _id: session.user.id,
        role: session.user.role,
    });

    const response = await axios
        .post('http://127.0.0.1:5000/api/me', null, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .catch((error) => error.response);

    let user = null;

    if (response?.status === 200) {
        user = response.data;
    }

    return {
        props: {
            session,
            user,
        },
    };
}
