import { useRouter } from 'next/router';

const Admin = () => {
    const router = useRouter();
    console.log({ router });
};

export default Admin;
