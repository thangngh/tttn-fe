import {
  getMessageRoomAction,
  getProfileAction,
} from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React from "react";
import Message from "..";
import { SocketContext } from "@/provider/userSocket";
import { toast } from "react-toastify";

export default function MessageRoom() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const messageRoom = useAppSelector(
    (state: RootState) => state.userReducer.messageRoom
  );
  const [data, setData] = React.useState<any[]>([]);
  const [user, setUser] = React.useState<any>(null);
  const [message, setMessage] = React.useState("");
  const useSocket = React.useContext(SocketContext);
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  const toIdRef = React.useRef("");
  React.useEffect(() => {
    if (!Array.isArray(messageRoom)) return;
    const messageArr: any[] = [];
    messageRoom.forEach((item) => {
      messageArr.push({
        content: item.content,
        fromId: item.fromId,
        toId: item.toId,
        id: item.id,
      });
      toIdRef.current = item.toId !== user?.id ? item.toId : item.fromId;
    });
    setData(messageArr);
  }, [messageRoom]);

  React.useEffect(() => {
    profile && setUser(profile);
  }, [profile]);
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (router.isReady || accessToken) {
      dispatch(getProfileAction());
      dispatch(getMessageRoomAction(router.query.roomId as string));
    }
  }, [dispatch, router.isReady, router.query.roomId]);

  const handleSendMessage = () => {
    setMessage("");
    if (message.trim() !== "") {
      const dataSend = {
        roomId: router.query.roomId,
        content: message.trim(),
        fromId: user?.id,
        toId: toIdRef.current,
      };
      useSocket.emit("send-message", dataSend);
      setData((prev) => [...prev, dataSend]);
    } else {
      toast.error("please insert message!");
    }
  };

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };
  return (
    <Message>
      <div className="container mx-auto rounded-lg">
        <div className="flex flex-row justify-between bg-white">
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
              {data &&
                data.map((item, index) => (
                  <div key={item.id}>
                    {item.fromId === user?.id && (
                      <div className="flex justify-end mb-4">
                        <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                          {item.content}
                        </div>
                      </div>
                    )}
                    {item.toId === user?.id && (
                      <div className="flex justify-start mb-4">
                        <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                          {item.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="py-5">
              <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                  <input
                    type="text"
                    placeholder="Write your message!"
                    onChange={handleChange}
                    value={message}
                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                  />
                  <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                    >
                      <span className="font-bold">Send</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-6 w-6 ml-2 transform rotate-90"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Message>
  );
}
