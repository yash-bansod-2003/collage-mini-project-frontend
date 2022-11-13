import React from 'react';
import { Sidebar } from 'flowbite-react';
import {
    ChartPieIcon,
    ShoppingBagIcon,
    TableCellsIcon,
    ArrowSmallRightIcon,
    InboxIcon,
    UserIcon,
    AcademicCapIcon,
    FolderPlusIcon,
    PencilSquareIcon,
    BellAlertIcon,
    BookOpenIcon,
    UserGroupIcon,
    IdentificationIcon,
} from '@heroicons/react/24/solid';

const MySidebar = () => {
    return (
        <div className="w-full">
            <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup className="space-y-6">
                        <Sidebar.Item href="#" icon={AcademicCapIcon}>
                            Courses
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={IdentificationIcon}>
                            Students
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={BookOpenIcon}>
                            Subjects
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={UserGroupIcon}>
                            Faculities
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={FolderPlusIcon}>
                            Assign Subject
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={PencilSquareIcon}>
                            Enter Marks
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={InboxIcon}>
                            Post
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={BellAlertIcon}>
                            Notifications
                        </Sidebar.Item>
                        <Sidebar.Collapse
                            icon={ShoppingBagIcon}
                            label="E-commerce"
                        >
                            <Sidebar.Item href="#">Products</Sidebar.Item>
                        </Sidebar.Collapse>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
};

export default MySidebar;
