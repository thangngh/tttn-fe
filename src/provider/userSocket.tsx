import { createContext, ReactNode } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001" || "", {
  transports: ["websocket"],
  withCredentials: true,
  // query: {
  //   token: localStorage.getItem("token"),
  //   deviceToken: localStorage.getItem("device-token"),
  //   platform: "BROWSER",
  // },
});
const SocketContext = createContext(socket);

function SocketProvider({ children }: any): JSX.Element {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export { socket, SocketContext, SocketProvider };
