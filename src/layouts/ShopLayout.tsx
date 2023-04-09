import CustomSideBar from "@/components/mui/CustomSideBar";
import { useAppDispatch } from "@/redux/hook";

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
    id: 1,
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
];

const PrivateRoute = ["/shop"];

export default function ShopLayout({ children }: IProp) {
  const dispatch = useAppDispatch();
  return (
    <div className="min-h-screen w-full  h-full flex bg-white  text-black dark:text-white">
      <CustomSideBar data={ShopMenu} />
      {children}
    </div>
  );
}
