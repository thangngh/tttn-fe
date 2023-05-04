import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/redux/hook";
import { sendMailResetPasswordAction } from "@/redux/action/auth.action";
import { toast } from "react-toastify";
interface ISendMail {
  email: string;
}

const schemaValidation = Yup.object({
  email: Yup.string()
    .required("Email is requested")
    .trim("Email is requested")
    .max(50, "Email to long")
    .matches(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm, {
      message: "Email not matches",
    }),
});
export default function ResetPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schemaValidation),
  });
  const dispatch = useAppDispatch();
  const handleSendMail = async (data: ISendMail) => {
    try {
      dispatch(
        sendMailResetPasswordAction({
          email: data.email,
        })
      );

      toast.success("send mail success!");
      let redirect = setTimeout(() => router.push("/login"));

      return () => {
        clearTimeout(redirect);
      };
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <body className="antialiased bg-slate-200">
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Reset password</h1>
        <form className="my-10" onSubmit={handleSubmit(handleSendMail as any)}>
          <div className="flex flex-col space-y-5">
            <p className="font-medium text-slate-700 pb-2">Email address</p>
            <input
              type="email"
              {...register("email")}
              className={`
                ${errors.email ? "ring-red-500" : "ring-green-200"} 
                w-full py-3 border border-slate-200 bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow
                `}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-0">
                {(errors as any).email.message}
              </p>
            )}
            <button className="w-full py-3 font-medium text-white btn bg-primary-focus btn-outline  inline-flex space-x-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Reset password</span>
            </button>
            <p className="text-center">
              Not registered yet?{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-primary font-medium inline-flex space-x-1 items-center cursor-pointer hover:underline"
              >
                <span>Register now </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </span>
            </p>
          </div>
        </form>
      </div>
    </body>
  );
}
