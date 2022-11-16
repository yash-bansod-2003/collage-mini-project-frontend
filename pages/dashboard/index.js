import { Tabs } from 'flowbite-react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

import {
    UserCircleIcon,
    ChartBarIcon,
    AdjustmentsHorizontalIcon,
    TableCellsIcon,
    HomeIcon,
} from '@heroicons/react/24/solid';
import TabItem from '../../components/Dashboard/TabItem';
import Home from '../../components/Dashboard/Home';

const Dashboard = () => {
    return (
        <div className="container mx-auto my-2">
            <Tabs.Group aria-label="Tabs with icons" style="underline">
                <TabItem title="Home" icon={HomeIcon}>
                    <Home />
                </TabItem>
                <TabItem title="Profile" icon={UserCircleIcon}>
                    profile
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
