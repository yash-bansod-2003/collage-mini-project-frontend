import { Tabs } from 'flowbite-react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

import {
    UserCircleIcon,
    ChartBarIcon,
    AcademicCapIcon,
    AdjustmentsHorizontalIcon,
    TableCellsIcon,
    UserGroupIcon,
    HomeIcon,
    PencilSquareIcon,
    BookOpenIcon,
} from '@heroicons/react/24/solid';
import TabItem from '../../components/Dashboard/TabItem';
import Home from '../../components/Dashboard/Home';
import Student from '../../components/Dashboard/Student';
import Teacher from '../../components/Dashboard/Teacher';
import Course from '../../components/Dashboard/Course';

const Dashboard = () => {
    return (
        <div className="container mx-auto my-2">
            <Tabs.Group aria-label="Tabs with icons" style="underline">
                <TabItem title="Home" icon={HomeIcon}>
                    <Home />
                </TabItem>
                <TabItem title="Courses" icon={BookOpenIcon}>
                    <Course />
                </TabItem>
                <TabItem title="Students" icon={AcademicCapIcon}>
                    <Student />
                </TabItem>
                <TabItem title="Faculties" icon={UserGroupIcon}>
                    <Teacher />
                </TabItem>
                <TabItem title="Assign Subject" icon={PencilSquareIcon}>
                    Assign Subject
                </TabItem>
            </Tabs.Group>
        </div>
    );
};
export default Dashboard;

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

    if (session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}
