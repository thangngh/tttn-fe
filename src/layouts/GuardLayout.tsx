import { useRouter } from "next/router";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const PrivateRoute = [
  "/profile",
  "/create-shop",
  "/shop",
  "/admin",
  "/checkout",
  "/cart",
];

export default function GuardLayout({ children }: IProps) {
  const router = useRouter();

  React.useEffect(() => {
    const currentPath = router.pathname;
    const isPrivateRouter = PrivateRoute.some((url) =>
      currentPath.includes(url)
    );
    isPrivateRouter &&
      !localStorage.getItem("accessToken") &&
      router.push(`/login?url=${currentPath}`, "/login");
  }, [router]);
  return <>{children}</>;
}
