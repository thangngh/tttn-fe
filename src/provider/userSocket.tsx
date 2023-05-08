import { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | undefined>(undefined);

interface IChildren {
  children: React.ReactNode;
}

const newSocket = io("", {
  transports: ["web-socket"],
  withCredentials: true,
});

function UserSocketProvider({ children }: any) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    setSocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export { newSocket, SocketContext, UserSocketProvider };
