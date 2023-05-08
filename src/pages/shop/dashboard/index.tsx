import StaticCard from "@/components/admin/StaticCard";
import { DrawerHeader } from "@/components/mui/CustomSideBar";
import ShopLayout from "@/layouts/ShopLayout";
import {
  getUserNewOrderAction,
  totalFinanceShopAction,
  totalOderShopAction,
  totalParticipantVisitShopAction,
} from "@/redux/action/cart.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import React from "react";
import { formatter } from "../product/[id]";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "antd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import { format } from "date-fns";
export default function Dashboard() {
  const dispatch = useAppDispatch();

  const getTotalOrder = useAppSelector(
    (state: RootState) => state.cartReducer.totalOrder
  );
  const getTotalFinance = useAppSelector(
    (state: RootState) => state.cartReducer.totalFinance
  );
  const getTotalParticipant = useAppSelector(
    (state: RootState) => state.cartReducer.totalParticipant
  );
  const getUserNewOrder = useAppSelector(
    (state: RootState) => state.cartReducer.userNewOrder
  );
  const data = [
    {
      name: "January",
      reject: 4000,
      approved: 2400,
      amt: 2400,
    },
    {
      name: "February",
      reject: 3000,
      approved: 1398,
      amt: 2210,
    },
    {
      name: "March",
      reject: 2000,
      approved: 9800,
      amt: 2290,
    },
    {
      name: "April",
      reject: 2780,
      approved: 3908,
      amt: 2000,
    },
    {
      name: "May",
      reject: 1890,
      approved: 4800,
      amt: 2181,
    },
    {
      name: "June ",
      reject: 2390,
      approved: 3800,
      amt: 2500,
    },
    {
      name: "July",
      reject: 3490,
      approved: 4300,
      amt: 2100,
    },
    {
      name: "August",
      reject: 3490,
      approved: 4300,
      amt: 2100,
    },
    {
      name: "September",
      reject: 3490,
      approved: 1000,
      amt: 2100,
    },
    {
      name: "October",
      reject: 3490,
      approved: 4300,
      amt: 2100,
    },
    {
      name: "November ",
      reject: 3490,
      approved: 4300,
      amt: 2100,
    },
    {
      name: "December",
      reject: 3490,
      approved: 4300,
      amt: 2100,
    },
  ];

  React.useEffect(() => {
    dispatch(totalOderShopAction());
    dispatch(totalFinanceShopAction());
    dispatch(totalParticipantVisitShopAction());
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getUserNewOrderAction());
  }, [dispatch]);
  console.log(getUserNewOrder);
  return (
    <ShopLayout>
      <div className="h-full  my-4 p-4">
        <div className="h-full ml-14 mt-14 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
            <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">
                  {getTotalParticipant && formatter(getTotalParticipant)}
                </p>
                <p>Visitors</p>
              </div>
            </div>
            <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">
                  {getTotalOrder && formatter(getTotalOrder)}
                </p>
                <p>Orders</p>
              </div>
            </div>
            <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">
                  {getTotalFinance && `${formatter(getTotalFinance) + " đ"}`}
                </p>
                <p>Balances</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 ">
            <div className="w-full mx-4 lg:w-[55%] bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md p-4 gap-4 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div className="mb-[20px]">(Order)</div>
              <ResponsiveContainer aspect={2 / 1}>
                <LineChart
                  width={300}
                  height={300}
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="approved"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="reject" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full lg:w-[35%] bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md  p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div className="flex items-center justify-between ">
                <h1 className="text-base font-medium font-[Nunito,_sans-serif]">
                  New Order
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center gap-3.5 font-[Nunito,_sans-serif]">
                {getUserNewOrder &&
                  getUserNewOrder?.map((item, index) => (
                    <div
                      key={index}
                      className=" bg-white w-full text-lg py-2 font-[Nunito,_sans-serif]"
                    >
                      <div className="flex text-primary justify-between px-4 space-x-3 items-center">
                        <span>{`${item?.user?.firstName} ${item?.user?.lastName}`}</span>
                        <span>
                          {format(
                            new Date(item?.createAt),
                            "dd/MM/yyyy - HH:mm:ss"
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}
