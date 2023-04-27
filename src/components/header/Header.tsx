import { getProfileAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import {
  ClickAwayListener,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import SVGLogo from "../svg/Svg-logo";
import Link from "next/link";
import SvgUser from "../svg/Svg-user";
import Image from "next/image";
import CartComponent from "../cart/Cart";
import { findAllProductCartUserAction } from "@/redux/action/cart.action";
import { resetSuccess } from "@/redux/reduce/cart.slice";
const theme = createTheme({
  components: {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "transparent",
          color: "#fff",
        },
        popper: {
          margin: "0px",
          top: "-10px !important",
        },
        tooltipPlacementBottom: {
          margin: "0px !important",
        },
      },
    },
  },
});

export default function Header() {
  const [isOpenHamburger, setIsOpenHamburger] = React.useState(false);
  const [showPopUp, setShowPopUp] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const router = useRouter();
  const [image, setImage] = React.useState("");
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.userReducer.user);

  const getAllProductCartUser = useAppSelector(
    (state: RootState) => state.cartReducer.cartProduct
  );

  const successAddCart = useAppSelector(
    (state: RootState) => state.cartReducer.isSuccess
  );

  React.useEffect(() => {
    if (successAddCart) {
      dispatch(findAllProductCartUserAction());
      dispatch(resetSuccess());
    }
  }, [dispatch, successAddCart]);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(findAllProductCartUserAction());
  }, [dispatch]);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getProfileAction());
    }
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);

    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);

    document.body.style.overflow = "unset";
  };

  const handleHamburger = () => {
    setIsOpenHamburger(!isOpenHamburger);
  };

  const handleShowPopUp = () => {
    setShowPopUp(!showPopUp);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className={`overlay ${
          openModal
            ? "fixed top-0 left-0 pointer-events-auto opacity-50 w-screen h-screen bg-[#000] z-50"
            : "pointer-events-none"
        }`}
      ></div>
      <div className="w-full relative mx-auto bg-white">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="w-auto max-w-full flex items-center space-x-2">
              <SVGLogo />
              <span className="text-black">LOGO</span>
            </div>
            <div className="max-w-full flex items-center justify-end space-x-4">
              <div
                onClick={handleOpenModal}
                className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 "
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span
                    className={`${
                      getAllProductCartUser?.length === 0 ? "hidden" : "block"
                    } absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white`}
                  >
                    {getAllProductCartUser?.length}
                  </span>
                </div>
                <span
                  className="text-sm font-medium"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  Cart
                </span>
              </div>
              <div className="cursor-pointer">
                <div
                  className="block px-[5px] space-y-1 cursor-pointer md:hidden"
                  onClick={handleHamburger}
                >
                  <span
                    className={`block w-6 h-[3px] bg-black   ${
                      isOpenHamburger
                        ? "transform transition duration-500 ease-in-out rotate-45 translate-y-2"
                        : "transform transition duration-500 ease-in-out "
                    }`}
                  />
                  <span
                    className={`block w-1/2 h-[3px] bg-black ${
                      isOpenHamburger
                        ? "transform transition duration-500 ease-in-out opacity-0"
                        : "transform transition duration-500 ease-in-out "
                    }`}
                  />
                  <span
                    className={`block w-6 h-[3px] bg-black  ${
                      isOpenHamburger
                        ? "transform  transition duration-500 ease-in-out -rotate-45  -translate-y-2"
                        : "transform transition duration-500 ease-in-out "
                    }`}
                  />
                </div>
                <div className="hidden relative px-1 md:block tracking-wider ">
                  {user && user?.username ? (
                    <>
                      {user.avatar ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 block relative black">
                            <Image
                              src={image || "https://i.pravatar.cc/150?img=32"}
                              alt="avatar"
                              layout="fill"
                              objectFit="cover"
                              className="rounded-full"
                            />
                          </div>
                          <ClickAwayListener onClickAway={handleClosePopUp}>
                            <div className="bg-transparent relative">
                              <Tooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                onClose={handleClosePopUp}
                                placement="bottom"
                                open={showPopUp}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={
                                  <div
                                    className={`flex flex-col font-nunito absolute z-[900] top-7 p-1 border min-w-[230px] w-full h-fit bg-white  md:right-[-20px] 
                                    ${
                                      !showPopUp ? "invisible" : "visible"
                                    }  animate-slide-in-up hover:visible text-lg rounded-lg `}
                                  >
                                    <div className="text-gray-900">
                                      <Link href="/profile">
                                        <div className="p-1 my-1 border-l-2 border-white  cursor-pointer ">
                                          <a>Profile</a>
                                        </div>
                                      </Link>
                                      <hr />
                                      <hr />
                                      <div
                                        className="p-1 my-1 border-l-2  border-white cursor-pointer "
                                        onClick={logout}
                                      >
                                        <span>Logout</span>
                                      </div>
                                    </div>
                                  </div>
                                }
                              >
                                <span
                                  className={`text-black px-2 font-normal cursor-pointer`}
                                  onClick={handleShowPopUp}
                                >
                                  {user.username}
                                </span>
                              </Tooltip>
                            </div>
                          </ClickAwayListener>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-2">
                          <div className="w-6 h-6 block relative border rounded-full border-black">
                            <SvgUser />
                          </div>
                          <ClickAwayListener onClickAway={handleClosePopUp}>
                            <div className="bg-transparent relative">
                              <Tooltip
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                onClose={handleClosePopUp}
                                placement="bottom"
                                open={showPopUp}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title={
                                  <div
                                    className={`flex flex-col font-nunito absolute z-[900] top-7 p-1 border min-w-[230px] w-full h-fit bg-white text-cyan-800 md:right-[-20px] 
                                    ${
                                      !showPopUp
                                        ? "invisible"
                                        : "visible rounded-lg"
                                    }  animate-slide-in-up hover:visible text-lg`}
                                  >
                                    <div className="text-gray-900">
                                      <Link href="/profile">
                                        <div className="p-1 my-1 border-l-2 border-white hover:border-[#848ABD] hover:text-[#848ABD] cursor-pointer ">
                                          <a>Profile</a>
                                        </div>
                                      </Link>
                                      <hr />
                                      <hr />
                                      <div
                                        className="p-1 my-1 border-l-2  border-white hover:border-[#848ABD] hover:text-[#848ABD] cursor-pointer "
                                        onClick={logout}
                                      >
                                        <span>Logout</span>
                                      </div>
                                    </div>
                                  </div>
                                }
                              >
                                <span
                                  className={`
                                          "text-black "
                                       px-2 font-semibold  cursor-pointer`}
                                  onClick={handleShowPopUp}
                                >
                                  {user.username}
                                </span>
                              </Tooltip>
                            </div>
                          </ClickAwayListener>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="inline-flex space-x-3">
                      <div className="cursor-pointer text-sm font-medium hover:underline hidden md:block">
                        <Link href={"/login"}>Login</Link>
                      </div>

                      <div className="cursor-pointer  text-sm font-medium hover:underline hidden md:block">
                        <Link href={"/register"}>Register</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CartComponent
              openModal={openModal}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
