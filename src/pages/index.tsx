import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import React from "react";
import { getProfileAction } from "@/redux/action/user.action";

export default function Home() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  console.log("profile", profile);
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getProfileAction());
    }
  }, []);
  return (
    <>
      <main className={styles.main}></main>
    </>
  );
}
