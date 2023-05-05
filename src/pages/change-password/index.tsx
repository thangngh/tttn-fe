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
import { resetPasswordWithVerifyTokenAction } from "@/redux/action/auth.action";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schemaValidation),
  });

  React.useEffect(() => {
    if (router.isReady) {
      if (token) {
        if (customsCheckExpiredJwtToken(token as string)) {
          toast.error("Token expired!");
          router.push("/login");
        }
      }
    }
  }, [router.isReady]);

  const handleResetPassword = (data: any) => {
    const { passwordCurrent } = data;

    if (!token) {
      toast.error("Some thing went wrong!");
      return;
    }
    try {
      dispatch(
        resetPasswordWithVerifyTokenAction({
          password: passwordCurrent,
          token: token as string,
        })
      );
      toast.success("update password success!");

      let redirect = setTimeout(() => {
        localStorage.removeItem("accessToken");
        router.push("/login");
      });

      return () => {
        clearTimeout(redirect);
      };
    } catch (error) {}
  };

  return (
    <div className="h-screen w-full bg-white">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="bg-white w-full max-w-sm mt-6 p-4 rounded-lg shadow-xl">
            <h1 className="text-2xl my-3 font-medium">Change Password</h1>
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div className="flex space-x-4 justify-center ">
                <div className="space-y-5">
                  <div className="flex flex-col text-black">
                    <label htmlFor="passwordCurrent" className="">
                      New password
                    </label>
                    <input
                      type="password"
                      {...register("passwordCurrent")}
                      id="passwordCurrent"
                      className="border border-gray-300 bg-white rounded-md px-2 py-1"
                    />
                    {errors.passwordCurrent && (
                      <p className="text-red-500 text-sm">
                        {errors.passwordCurrent.message as any}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col text-black">
                    <label htmlFor="rePassword">Confirm password</label>
                    <input
                      type="password"
                      {...register("rePassword")}
                      id="rePassword"
                      className="border border-gray-300 bg-white rounded-md px-2 py-1"
                    />
                    {errors.rePassword && (
                      <p className="text-red-500 text-sm">
                        {errors.rePassword.message as any}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <button type="submit">
                      <span className="text-sm font-normal text-white bg-primary rounded-md px-4 py-3 ">
                        Change password
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const customsCheckExpiredJwtToken = (token: string) => {
  const decoded: any = jwtDecode(token);

  if (Date.now() >= decoded.exp * 1000) {
    return true;
  }
  return false;
};
