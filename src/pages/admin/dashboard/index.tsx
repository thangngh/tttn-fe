import { DrawerHeader } from '@/components/mui/CustomSideBar';
import AdminLayout from '@/layouts/AdminLayout';

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="h-full  my-4 p-4">
                <DrawerHeader />
                <h1 className="text-black">Dashboard</h1>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
