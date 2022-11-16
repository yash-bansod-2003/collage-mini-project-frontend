import React from 'react';
import { motion } from 'framer-motion';
import {
    AcademicCapIcon,
    UserGroupIcon,
    BookOpenIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
const Home = () => {
    return (
        <div>
            <div className="text-xl breadcrumbs border-b mb-3">
                <ul>
                    <li>
                        <a>Dashboard</a>
                    </li>
                    <li>Home</li>
                </ul>
            </div>
            <div className="w-full flex justify-between">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="card card-side bg-base-100 shadow-xl"
                >
                    <figure>
                        <AcademicCapIcon className="w-20 h-20" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Students</h2>
                        <div className="card-actions justify-end">
                            <h2 className="text-primary text-6xl font-semibold">
                                200+
                            </h2>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="card card-side bg-base-100 shadow-xl"
                >
                    <figure>
                        <UserGroupIcon className="w-20 h-20" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Faculities</h2>
                        <div className="card-actions justify-end">
                            <h2 className="text-primary text-6xl font-semibold">
                                100+
                            </h2>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="card card-side bg-base-100 shadow-xl"
                >
                    <figure>
                        <BookOpenIcon className="w-20 h-20" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Courses</h2>
                        <div className="card-actions justify-end">
                            <h2 className="text-primary text-6xl font-semibold">
                                10
                            </h2>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="card card-side bg-base-100 shadow-xl"
                >
                    <figure>
                        <AcademicCapIcon className="w-20 h-20" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">Students</h2>
                        <div className="card-actions justify-end">
                            <h2 className="text-primary text-6xl font-semibold">
                                200+
                            </h2>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
