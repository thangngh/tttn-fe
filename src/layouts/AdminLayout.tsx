import CustomSideBar from '@/components/mui/CustomSideBar';
import React from 'react';

interface IProp {
    children: React.ReactNode;
}
const AdminLayout = ({ children }: IProp) => {
    return (
        <div className="min-h-screen w-full  h-full flex bg-white  text-black dark:text-white">
            <CustomSideBar />
            {children}
        </div>
    );
};

export default AdminLayout;
