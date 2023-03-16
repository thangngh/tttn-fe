import { useRouter } from 'next/router';

const User = () => {
    const router = useRouter();
    console.log({ router });
};

export default User;
