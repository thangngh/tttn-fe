import CustomSideBar from "@/components/mui/CustomSideBar";
import { getProfileAction, getRoleAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { IRole } from "@/type/auth.interface";
import { useRouter } from "next/router";
import React from "react";
import { useRef } from "react";
import GuardLayout from "./GuardLayout";

interface IProp {
  children: React.ReactNode;
}

export const ShopMenu = [
  {
    id: 1,
    title: "dashboard",
    path: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "product",
    path: "/product",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "category",
    path: "/category",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "order",
    path: "/order",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "discount",
    path: "/discount",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "message",
    path: "/message",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9l2-2m0 0l7-7 7 7M5 19v-8a2 2 0 012-2h10a2 2 0 012 2v8m-2 0a2 2 0 01-2 2H7a2 2 0 01-2-2m10 0h2m-2 0v2"
        />
      </svg>
    ),
  },
];

const PrivateRoute = ["/shop"];

export default function ShopLayout({ children }: IProp) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  const role = useAppSelector((state: RootState) => state.userReducer.role);
  const roleRef = useRef("");

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      dispatch(getProfileAction());
      dispatch(getRoleAction());
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (role) {
      roleRef.current = role?.data;
    }
  }, [role]);

  React.useEffect(() => {
    if (!role) {
      return;
    }
    const currentPath = router.pathname;
    const isPrivateRouter = PrivateRoute.some((url) =>
      currentPath.includes(url)
    );
    if (isPrivateRouter && roleRef.current.trim() !== IRole.SHOPPER) {
      console.log(isPrivateRouter && roleRef.current.trim() !== IRole.SHOPPER);
      router.push("/not-found");
    }
  }, [role, router]);

  return (
    <GuardLayout>
      <div className="min-h-screen w-full  h-full flex bg-white  text-black dark:text-white">
        <CustomSideBar
          title="Shop Dashboard"
          username={profile?.username}
          data={ShopMenu}
        />
        {children}
      </div>
    </GuardLayout>
  );
}
