import { BeakerIcon } from '@heroicons/react/24/solid';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
    return (
        <div className="container mx-auto my-3">
            <div className="bg-base-100 grid grid-rows-6 grid-cols-5 gap-2 shadow-xl">
                <div className="flex justify-center items-center bg-base-300">
                    <h2>Heading</h2>
                </div>
                <div className="col-span-4 flex justify-center items-center bg-base-300">
                    <h2>Oprations</h2>
                </div>
                <div className="row-span-5">
                    <Sidebar />
                </div>
                <div className="col-span-4 row-span-5 flex justify-center items-center bg-base-300">
                    <h2>Main Content</h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
