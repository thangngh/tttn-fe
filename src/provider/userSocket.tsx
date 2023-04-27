import { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | undefined>(undefined);

interface IChildren {
  children: React.ReactNode;
}

export default function UserSocketProvider({ children }: IChildren) {
  const [socket, setSocket] = useState<Socket>();

  // useEffect(() => {
  //   const newSocket = io("localhost:3001", {
  //     transports: ["web-socket"],
  //     withCredentials: true,
  //   });
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
