import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Badge, Collapse } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Menu } from "./menu";
interface data {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const CustomSideBar = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const mainPath = router.pathname.split("/")[1];
  const subPath = router.pathname.split("/")[2];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubMenu = () => {
    setOpenSubMenu(!openSubMenu);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="flex justify-between items-center">
          <div className="inline-flex items-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="hidden sm:block"
            >
              Mini variant drawer
            </Typography>
          </div>
          <div className="relative flex space-x-3 items-center">
            {/* notification icon */}
            <div className="relative">
              <IconButton aria-label="show  new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <div className="absolute top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </div>
            </div>
            <Image
              src={"https://i.pravatar.cc/150?img=32"}
              alt="Picture of the author"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span>Name</span>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            style={{ width: "100%" }}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <div className="flex items-center justify-between w-full px-1">
              <span className="text-base font-semibold">LOGO</span>
              <MenuIcon />
            </div>
          </IconButton>
        </DrawerHeader>
        {Menu.map((text, index) => (
          <List key={text.id}>
            {"subItem" in text ? (
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className={` ${
                  text.title === mainPath ? " bg-gray-200 text-black" : ""
                }`}
              >
                <ListItemButton
                  onClick={handleSubMenu}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.title.toUpperCase()}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {openSubMenu ? (
                    <ExpandLess className={`${open ? "" : "hidden"}`} />
                  ) : (
                    <ExpandMore className={`${open ? "" : "hidden"}`} />
                  )}
                </ListItemButton>
                <Collapse
                  in={openSubMenu}
                  timeout="auto"
                  unmountOnExit
                  className={` ${
                    text.title === mainPath ? " bg-gray-200 text-black" : ""
                  }`}
                >
                  <List
                    component="div"
                    disablePadding
                    sx={{ pl: 4 }}
                    className={`${open ? "" : "hidden"}`}
                  >
                    {text?.subItem &&
                      text?.subItem.map((subText, index) => (
                        <ListItem
                          key={index}
                          disablePadding
                          sx={{
                            display: "block",
                          }}
                          className={` ${
                            subText.title === subPath
                              ? " bg-gray-200 text-black"
                              : ""
                          }`}
                        >
                          <Link
                            href={`/${mainPath}/${
                              text.title
                            }/${encodeURIComponent(subText.title)}`}
                          >
                            <ListItemButton
                              sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: open ? 3 : "auto",
                                  justifyContent: "center",
                                  opacity: open ? 1 : 0,
                                }}
                              >
                                {subText.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={subText.title.toUpperCase()}
                                sx={{
                                  opacity: open ? 1 : 0,
                                }}
                              />
                            </ListItemButton>
                          </Link>
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </ListItem>
            ) : (
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                className={` ${
                  text.title === subPath ? " bg-gray-200 text-black" : ""
                }`}
              >
                <Link href={`/${mainPath}/${encodeURIComponent(text.title)}`}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text.title.toUpperCase()}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            )}
          </List>
        ))}
      </Drawer>
    </div>
  );
};

export default CustomSideBar;
