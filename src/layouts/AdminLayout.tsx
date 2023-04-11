import CustomSideBar from "@/components/mui/CustomSideBar";
import { getProfileAction, getRoleAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { IRole } from "@/type/auth.interface";
import { useRouter } from "next/router";
import React, { useRef } from "react";

interface IProp {
  children: React.ReactNode;
}

export const AdminMenu = [
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
    title: "user",
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
          d="M9 21v-2a3 3 0 016 0v2m-3-8a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    subItem: [
      {
        id: 1,
        title: "user-list",
        path: "/user/list",
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
        title: "group",
        path: "/user/group",
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
    ],
  },
  {
    id: 3,
    title: "inbox",
    path: "/inbox",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        ></path>
      </svg>
    ),
  },
];

const PrivateRoute = ["/admin"];

const AdminLayout = ({ children }: IProp) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
    if (isPrivateRouter && roleRef.current?.trim() !== IRole.ADMIN) {
      router.push("/not-found");
    }
  }, [role, router]);

  return (
    <div className="min-h-screen w-full  h-full flex bg-white  text-black dark:text-white">
      <CustomSideBar
        data={AdminMenu}
        title="Admin Dashboard"
        username={profile?.username}
      />
      {children}
    </div>
  );
};

export default AdminLayout;
