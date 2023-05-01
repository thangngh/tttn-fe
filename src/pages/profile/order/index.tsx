import OrderDetail from "@/components/order/OrderDetail";
import ProfileLayout from "@/layouts/ProfileLayout";
import { AppBar, Box, Tab, Tabs, useTheme } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";

const TabData = [
  {
    id: 1,
    label: "All",
    component: <h1>All</h1>,
  },
  {
    id: 2,
    label: "Completed",
    component: <h1>Completed</h1>,
  },
  {
    id: 3,
    label: "Pending",
    component: <h1>Pending</h1>,
  },
  {
    id: 4,
    label: "Reject",
    component: <h1>Reject</h1>,
  },
];

export default function Order() {
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
