import CustomSideBar from "@/components/mui/CustomSideBar";
import { getProfileAction, getRoleAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { IRole } from "@/type/auth.interface";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import GuardLayout from "./GuardLayout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Dashboard,
  Message,
  Person,
  Shop,
  ShoppingBagOutlined,
  PermIdentity,
} from "@mui/icons-material";
interface IProp {
  children: React.ReactNode;
}

export const AdminMenu = [
  {
    id: 1,
    title: "dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    id: 2,
    title: "user",
    icon: <Person />,
    subItem: [
      {
        id: 1,
        title: "user-list",
        path: "/user/list",
        icon: <PermIdentity />,
      },
      {
        id: 2,
        title: "group",
        path: "/user/group",
        icon: <PeopleAltIcon />,
      },
    ],
  },
  {
    id: 3,
    title: "inbox",
    path: "/inbox",
    icon: <Message />,
  },
  {
    id: 4,
    title: "order",
    path: "/order",
    icon: <ShoppingBagOutlined />,
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
    <GuardLayout>
      <div className="min-h-screen w-full  h-full flex bg-white  text-black dark:text-white">
        <CustomSideBar
          data={AdminMenu}
          title="Admin Dashboard"
          username={profile?.username}
        />
        {children}
      </div>
    </GuardLayout>
  );
};

export default AdminLayout;
