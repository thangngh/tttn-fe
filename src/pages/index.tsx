import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import React from "react";
import { getProfileAction } from "@/redux/action/user.action";
import Screen from "@/layouts/Screen";
import ProductFilter from "@/components/product/ProductFilter";
import NewProduct from "@/components/product/NewProduct";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
export default function Home() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getProfileAction());
    }
  }, []);
  const [isShowChat, setIsShowChat] = React.useState(false);

  const handleShowChat = () => {
    setIsShowChat(true);
  };

  const handleCloseChat = () => {
    setIsShowChat(false);
  };

  return (
    <Screen>
      <div className="bg-white ">
        <main className={styles.main}>
          <NewProduct />
          {/* <div className="h-full my-10 w-full block">
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-center text-3xl md:text-4xl lg:text-5xl poppins font-semibold text-gray-700">
                Search here
              </h1>

              <div className="rounded-full p-2 space-x-3 box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 w-full md:w-96 flex items-center">
                <input
                  type="text"
                  className=" rounded-full px-4 py-2 shadow-card-layout focus:outline-none w-full bg-transparent"
                  placeholder="Search here"
                />
                <button className="text-sm bg-red-500  shadow-card-layout border-none py-3 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform">
                  Search
                </button>
              </div>
            </div>
          </div> */}
          <div className="pb-16">
            <div className="flex justify-center items-center">
              <div className="2xl:mx-auto 2xl:container p-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                <div className="flex flex-col justify-center items-center space-y-10">
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                      Shop By Category
                    </h1>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:gap-x-8 w-full">
                    <div className="relative group flex justify-center items-center h-full w-full">
                      <img
                        className="object-center object-cover h-full w-full"
                        src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png"
                        alt="girl-image"
                      />
                      <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                        Women
                      </button>
                      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                    </div>
                    <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
                      <div className="relative group flex justify-center items-center h-full w-full">
                        <img
                          className="object-center object-cover h-full w-full"
                          src="https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png"
                          alt="shoe-image"
                        />
                        <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                          Shoes
                        </button>
                        <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                      </div>
                      <div className="relative group flex justify-center items-center h-full w-full">
                        <img
                          className="object-center object-cover h-full w-full"
                          src="https://i.ibb.co/Hd1pVxW/louis-mornaud-Ju-6-TPKXd-Bs-unsplash-1-2.png"
                          alt="watch-image"
                        />
                        <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                          Watches
                        </button>
                        <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                      </div>
                    </div>
                    <div className="relative group justify-center items-center h-full w-full hidden lg:flex">
                      <img
                        className="object-center object-cover h-full w-full"
                        src="https://i.ibb.co/PTtRBLL/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
                        alt="girl-image"
                      />
                      <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                        Women
                      </button>
                      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                    </div>
                    <div className="relative group flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden">
                      <img
                        className="object-center object-cover h-full w-full hidden md:block"
                        src="https://i.ibb.co/6FjW19n/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2.png"
                        alt="girl-image"
                      />
                      <img
                        className="object-center object-cover h-full w-full md:hidden"
                        src="https://i.ibb.co/sQgHwHn/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
                        alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
                      />
                      <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                        Women
                      </button>
                      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                    </div>
                  </div>
                  <div className="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
                    <img
                      className="object-center object-cover h-full w-full hidden md:block"
                      src="https://i.ibb.co/6FjW19n/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2.png"
                      alt="girl-image"
                    />
                    <img
                      className="object-center object-cover h-full w-full sm:hidden"
                      src="https://i.ibb.co/sQgHwHn/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
                      alt="olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-2"
                    />
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                      Women
                    </button>
                    <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductFilter />
        </main>

        {!isShowChat ? (
          <div className="absolute bottom-0 z-50 w-10 h-10 shadow-lg right-5 bg-primary">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              onClick={handleShowChat}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </div>
        ) : (
          <div className="absolute bottom-0 z-50 shadow-lg right-5 bg-primary max-w-4xl ">
            <div className="container mx-auto rounded-lg">
              <div className="px-5 py-5 flex justify-end items-center bg-white border-b-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-6 h-6"
                  onClick={handleCloseChat}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </div>
              <div className="flex flex-row justify-between bg-white">
                <div className="flex flex-col w-2/5 border-r-2 overflow-x-auto h-96">
                  <div className="border-b-2 py-4 px-2">
                    <input
                      type="text"
                      placeholder="search chatting"
                      className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                    />
                  </div>
                  <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 border-l-4 border-blue-400 relative">
                    <div className="w-1/4">
                      <img
                        src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                        className="object-cover h-10 w-10 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="w-3/4">
                      <div className="text-base font-semibold">Luis1994</div>
                      <span className="truncate w-32 inline-block">
                        Pick me at 9:00 Am thang nguyen hong thang nguyen hong
                        thang nguyen hong
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full px-5 flex flex-col justify-between">
                  <div className="flex flex-col mt-5">
                    <div className="flex justify-end mb-4">
                      <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                        Welcome to group everyone !
                      </div>
                      <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-start mb-4">
                      <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                      <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quaerat at praesentium, aut ullam delectus odio error
                        sit rem. Architecto nulla doloribus laborum illo rem
                        enim dolor odio saepe, consequatur quas?
                      </div>
                    </div>
                    <div className="flex justify-end mb-4">
                      <div>
                        <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Magnam, repudiandae.
                        </div>

                        <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Debitis, reiciendis!
                        </div>
                      </div>
                      <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-start mb-4">
                      <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                      />
                      <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        happy holiday guys!
                      </div>
                    </div>
                  </div>
                  <div className="py-5">
                    <input
                      className="w-full bg-white py-5 px-3 rounded-xl"
                      type="text"
                      placeholder="type your message here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}
