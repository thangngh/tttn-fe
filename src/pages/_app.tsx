import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import UserSocketProvider from "../provider/userSocket";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ToastContainer } from "react-toastify";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <UserSocketProvider>
        <Provider store={store}>
          {/* <LayoutGuard> */}
          <Component {...pageProps} />
          {/* </LayoutGuard> */}
        </Provider>
      </UserSocketProvider>
      <ToastContainer
        className={`rounded-3xl`}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </SessionProvider>
  );
}
