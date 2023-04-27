import StaticCard from "@/components/admin/StaticCard";
import { DrawerHeader } from "@/components/mui/CustomSideBar";
import AdminLayout from "@/layouts/AdminLayout";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Area,
} from "recharts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="h-full  my-4 p-4">
        <DrawerHeader />
        <StaticCard />
        <div className="h-full ml-14 my-4  p-4 gap-4">
          <div className="flex flex-col lg:flex-row gap-5 ">
            <div className="w-full lg:w-[25%] bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md  p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div className="flex items-center justify-between ">
                <h1 className="text-base font-medium font-[Nunito,_sans-serif]">
                  Total Revenue
                </h1>
                <MoreVertIcon fontSize="small" />
              </div>
              <div className="flex flex-col items-center justify-center gap-3.5 font-[Nunito,_sans-serif]">
                <div className="h-24 w-24 font-[Nunito,_sans-serif]">
                  <CircularProgressbar
                    value={70}
                    text={"70%"}
                    strokeWidth={5}
                  />
                </div>
                <p className="font-medium ">Total sales made today</p>
                <p className="text-3xl font-[Nunito,_sans-serif]">$420</p>
                <p className="text-center text-xs font-light ">
                  Previous transactions processing. Last payments may not be
                  included.
                </p>
                <div className="flex w-full items-center justify-between font-[Nunito,_sans-serif]">
                  <div className="text-center font-[Nunito,_sans-serif]">
                    <div className="text-sm ">Target</div>
                    <div className="mt-2.5 flex items-center text-sm text-[rgba(255,0,0,1)]">
                      <KeyboardArrowDownIcon fontSize="small" />
                      <div className=" font-[Nunito,_sans-serif]">$12.4k</div>
                    </div>
                  </div>
                  <div className="text-center font-[Nunito,_sans-serif]">
                    <div className="text-sm ">Last Week</div>
                    <div className="mt-2.5 flex items-center text-sm text-[rgba(0,128,0,1)]">
                      <KeyboardArrowUpOutlinedIcon fontSize="small" />
                      <div className=" font-[Nunito,_sans-serif]">$12.4k</div>
                    </div>
                  </div>
                  <div className="text-center font-[Nunito,_sans-serif]">
                    <div className="text-sm ">Last Month</div>
                    <div className="mt-2.5 flex items-center text-sm text-[rgba(0,128,0,1)]">
                      <KeyboardArrowUpOutlinedIcon fontSize="small" />
                      <div className=" font-[Nunito,_sans-serif]">$12.4k</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[75%] bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md  p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
              <div className="mb-[20px]">Last 6 Months (Revenue)</div>
              <ResponsiveContainer aspect={2 / 1}>
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="gray" />
                  <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Total"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#total)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
