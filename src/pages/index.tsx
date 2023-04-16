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

export default function Home() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getProfileAction());
    }
  }, []);
  return (
    <Screen>
      <div className="bg-white">
        <main className={styles.main}>
          <NewProduct />
          <div className="h-full my-10 w-full block">
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
          </div>
          <ProductFilter />
        </main>
      </div>
    </Screen>
  );
}
