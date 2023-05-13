import FeedBack from "@/components/feedback/FeedBack";
import OrderCompleted from "@/components/order/OderCompleted";
import OrderApprovedByShop from "@/components/order/OrderApprovedByShop";
import OrderDetail from "@/components/order/OrderDetail";
import OrderPending from "@/components/order/OrderPending";
import OrderRejectByShop from "@/components/order/OrderRejectByShop";
import OrderRejected from "@/components/order/OrderRejected";
import ProfileLayout from "@/layouts/ProfileLayout";
import { AppBar, Box, Tab, Tabs, useTheme } from "@mui/material";
import { Modal } from "antd";
import React from "react";
import SwipeableViews from "react-swipeable-views";

const TabData = [
  {
    id: 1,
    label: "All",
    component: <OrderDetail />,
  },
  {
    id: 2,
    label: "Completed",
    component: <OrderCompleted />,
  },
  {
    id: 3,
    label: "Pending",
    component: <OrderPending />,
  },
  {
    id: 4,
    label: "Approved By Shop",
    component: <OrderApprovedByShop />,
  },
  {
    id: 5,
    label: "Rejected By Shop",
    component: <OrderRejectByShop />,
  },
  {
    id: 6,
    label: "Reject",
    component: <OrderRejected />,
  },
];

const arrComponent = [
  {
    id: 1,
    component: <FeedBack />,
  },
  {
    id: 2,
    component: <></>,
  },
];

export default function Order() {
  const theme = useTheme();
  const [value, setValueMenu] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueMenu(newValue);
  };

  const randomize = (myArray: any) => {
    return myArray[Math.floor(Math.random() * myArray.length)];
  };
  const [feedBack, setFeedBack] = React.useState(true);
  const handleChangeIndex = (index: number) => {
    setValueMenu(index);
  };
  return (
    <ProfileLayout>
      {/* <Modal
        open={feedBack}
        onCancel={() => setFeedBack(false)}
        className="w-full min-w-[1200px]"
        footer={null}
      >
        <FeedBack />
      </Modal> */}
      <Box>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            className="bg-primary"
            variant="fullWidth"
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
