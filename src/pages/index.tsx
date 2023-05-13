import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import React from "react";
import {
  getMessageRoomAction,
  getMessageUserAction,
  getProfileAction,
} from "@/redux/action/user.action";
import Screen from "@/layouts/Screen";
import ProductFilter from "@/components/product/ProductFilter";
import NewProduct from "@/components/product/NewProduct";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import { SocketContext } from "@/provider/userSocket";
import Link from "next/link";
import ClientChat from "@/components/client-chat/ClientChat";
import NoData from "@/components/nodata/Nodata";
import { Modal } from "antd";
import FeedBack from "@/components/feedback/FeedBack";
export default function Home() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  const [isUser, setIsUser] = React.useState(false);
  const [isChat, setIsChat] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [listRoom, setListRoom] = React.useState<any[]>([]);
  const toIdRef = React.useRef("");
  const useSocket = React.useContext(SocketContext);

  const listRoomId = useAppSelector(
    (state: RootState) => state.userReducer.messageUser
  );

  React.useEffect(() => {
    setUser(profile);
  }, [profile]);

  React.useEffect(() => {
    setListRoom(listRoomId);
  }, [listRoomId]);

  const filterData = [...new Set(listRoom.map((item) => item.roomId))].map(
    (roomId) => {
      return listRoom.find((item) => item.roomId === roomId);
    }
  );

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getProfileAction());
      dispatch(getMessageUserAction());
      setIsUser(true);
    }
  }, [dispatch]);
  console.log("user", user);
  const [isShowChat, setIsShowChat] = React.useState(false);

  const handleShowChat = () => {
    setIsShowChat(true);
    setIsChat(false);
  };
  const [messageData, setMessageData] = React.useState<any>(null);
  const handleCloseChat = () => {
    setIsShowChat(false);
    setRoomId("");
    setMessageData(null);
  };

  React.useEffect(() => {
    useSocket.on("msg:send-message", (data) => {
      setMessageData(data);
      setIsChat(true);
    });

    return () => {
      useSocket.off("msg:send-message");
    };
  }, [useSocket]);

  const [roomId, setRoomId] = React.useState("");
  const handleOpenRoom = (id: string) => {
    setRoomId(id);
  };

  const MemoizedClientChat = React.memo(ClientChat);

  const randomize = (myArray: any) => {
    return myArray[Math.floor(Math.random() * myArray.length)];
  };

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
  const [feedBack, setFeedBack] = React.useState(true);
  return (
    <Screen>
      <div className="bg-white ">
        <main className={styles.main}>
          {/* <NewProduct /> */}
          <ProductFilter />
          {/* {
            <Modal
              open={feedBack}
              onCancel={() => setFeedBack(false)}
              className="w-full min-w-[1200px]"
              footer={null}
            >
              {randomize(arrComponent)}
            </Modal>
          } */}
        </main>

        {!isShowChat ? (
          <>
            {isUser ? (
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
                {isChat && (
                  <div className="absolute top-0 right-0 -mt-1 -mr-1">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div className="absolute bottom-0 z-50 shadow-lg right-5 w-full max-w-4xl ">
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
                  {filterData &&
                    filterData?.map((item) => {
                      return (
                        <div key={item.roomId} className="relative">
                          {item.fromId !== user?.id ||
                          item.toId !== user?.id ? (
                            <div
                              className="cursor-pointer"
                              onClick={() => handleOpenRoom(item.roomId)}
                            >
                              <div className="border-b-2 py-4 px-2"></div>
                              <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 border-l-4 border-blue-400 relative">
                                <div className="w-1/4 text-black"></div>
                                <div className="w-3/4 text-black">
                                  <div className="text-base font-semibold">{`${item?.to.firstName} ${item?.to.lastName}`}</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <h1>no data</h1>
                            </>
                          )}
                        </div>
                      );
                    })}
                </div>
                {roomId !== "" ? (
                  <MemoizedClientChat
                    messageData={messageData}
                    roomId={roomId}
                    userId={user?.id}
                  />
                ) : (
                  <div className="flex flex-col items-center mx-auto my-auto">
                    <NoData />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}
