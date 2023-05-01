import ProfileLayout from "@/layouts/ProfileLayout";
import { getProfileAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import {
  AppBar,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import MyProfileComponent from "@/components/profile/MyProfileComponent";
import MyAddress from "@/components/profile/MyAddress";
import MyPassword from "@/components/profile/MyPassword";
import SwipeableViews from "react-swipeable-views";

const TabData = [
  {
    id: 1,
    label: "My Profile",
    component: <MyProfileComponent />,
  },
  {
    id: 2,
    label: "My Address",
    component: <MyAddress />,
  },
  {
    id: 3,
    label: "My Password",
    component: <MyPassword />,
  },
];
export default function MyProfile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);

  const [user, setUser] = React.useState<any>();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<any>({
    // defaultValues: {
    //   gender: user?.gender,
    // },
  });

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getProfileAction());
  }, []);

  React.useEffect(() => {
    setUser(profile);
  }, [profile]);

  const theme = useTheme();
  const [value, setValueMenu] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueMenu(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValueMenu(index);
  };

  return (
    <ProfileLayout>
      <div className="w-full h-full relative bg-white py-4 shadow-xl">
        {/* <div className="w-full sm:container  px-4  relative flex items-center  flex-wrap sm:flex-nowrap justify-end container mx-[15px] sm:mx-auto space-3">
          <div
            onClick={() => router.push("/create-shop")}
            className="px-2 py-2 bg-red-500 text-white font-semibold cursor-pointer rounded-md"
          >
            <span>My Shop</span>
          </div>
          <div className="block w-44 flex-shrink-0 "></div>
        </div> */}
        <div className="w-full bg-white rounded-sm shadow-xl">
          <div className="card-body  -px-4 ">
            {/* <h2 className="card-title">My profile</h2> */}
            <Box>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  className="bg-primary"
                >
                  {TabData.map(({ label }, i) => (
                    <Tab label={label} key={i} />
                  ))}
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                {TabData.map(({ component }, i) => (
                  <TabPanel value={value} index={i} key={i}>
                    {component}
                  </TabPanel>
                ))}
              </SwipeableViews>
            </Box>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
