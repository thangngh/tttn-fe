import ClientChat from "@/components/client-chat/ClientChat";
import { DrawerHeader } from "@/components/mui/CustomSideBar";
import ShopLayout from "@/layouts/ShopLayout";
import { getMessageUserAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React from "react";

interface IProp {
  children: React.ReactNode;
}

export default function Message({ children }: IProp) {
  const dispatch = useAppDispatch();
  const messageUser = useAppSelector(
    (state: RootState) => state.userReducer.messageUser
  );
  const [data, setData] = React.useState<any[]>([]);
  const [user, setUser] = React.useState<any>(null);
  const profile = useAppSelector((state: RootState) => state.userReducer.user);

  React.useEffect(() => {
    profile && setUser(profile);
  }, [profile]);
  React.useEffect(() => {
    setData(messageUser);
  }, [messageUser]);
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getMessageUserAction());
    }
  }, [dispatch]);
  const filterData = [...new Set(data.map((item) => item.roomId))].map(
    (roomId) => {
      return data.find((item) => item.roomId === roomId);
    }
  );

  const [showUnique, setShowUnique] = React.useState(false);
  console.log(filterData);
  return (
    <ShopLayout>
      <div className="h-full w-[90%] mx-auto  overflow-x-auto  my-4 p-4 space-y-4">
        <DrawerHeader />
        <div className="flex items-baseline container w-full flex-col justify-between border-b border-gray-200">
          <h1 className="text-primary">Message</h1>
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
                // onClick={handleCloseChat}
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
                {data &&
                  filterData.map((item) => (
                    <div key={item.roomId}>
                      {item.fromId !== user?.id ||
                        (item.toId !== user?.id && (
                          <Link href={`/shop/message/${item.roomId}`}>
                            <div className="border-b-2 py-4 px-2"></div>
                            <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 border-l-4 border-blue-400 relative">
                              <div className="w-1/4 text-black"></div>
                              <div className="w-3/4 text-black">
                                <div className="text-base font-semibold">{`${item?.to.firstName} ${item?.to.lastName}`}</div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  ))}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}
