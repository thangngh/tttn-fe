import { Button, CircularProgress, Input } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import Screen from "@/layouts/Screen";
import SVGLogo from "@/components/svg/Svg-logo";
const schemaValidation = Yup.object({
  passwordCurrent: Yup.string()
    .required("Password is requested")
    .trim("Password is requested")
    .max(20, " to long")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
      {
        message:
          "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
      }
    ),
  rePassword: Yup.string()
    .required("re-Password is requested")
    .trim("re-Password  is requested")
    .oneOf([Yup.ref("passwordCurrent")], "Passwords not match"),
});

export default function ResetPassword() {
  const router = useRouter();
  const token = router.query.token;
  const dispatch = useAppDispatch();
  // const success = useAppSelector(
  //   (state: RootState) => state.userReducer.success
  // );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schemaValidation),
  });

  const handleResetPassword = (data: any) => {
    // dispatch();
  };

  return (
    <Screen>
      <div className="container mx-auto max-w-7xl bg-white">
        <div className="container mx-auto mb-10 px-4 relative ">
          <div className=" flex space-x-2  items-center">
            <SVGLogo />
            <span className="text-xl font-medium">| Change password</span>
          </div>
          <div className="mt-4 cursor-pointer">
            <span
              className="text-md font-semibold"
              onClick={() => router.back()}
            >
              {"< back"}
            </span>
          </div>
        </div>
        <div className="container mx-auto px-4 relative">
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="space-4 py-3 mt-4 w-[90%] mx-auto"
          >
            <div className="flex space-x-4 justify-center ">
              <div className="space-y-5">
                <div className="flex flex-col">
                  <label htmlFor="passwordCurrent">New password</label>
                  <input
                    type="password"
                    {...register("passwordCurrent")}
                    id="passwordCurrent"
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                  {errors.passwordCurrent && (
                    <p className="text-red-500 text-sm">
                      {errors.passwordCurrent.message as any}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="rePassword">New password again</label>
                  <input
                    type="password"
                    {...register("rePassword")}
                    id="rePassword"
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                  {errors.rePassword && (
                    <p className="text-red-500 text-sm">
                      {errors.rePassword.message as any}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <button type="submit">
                    <span className="text-sm font-normal text-white bg-red-400 rounded-md px-4 py-3 ">
                      Change password
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Screen>
  );
}
