import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "react-toastify";
import { changePasswordAction } from "@/redux/action/auth.action";

const schemaValidation = Yup.object({
  passwordCurrent: Yup.string()
    .required("Password is requested")
    .trim("Password is requested"),
  newPassword: Yup.string()
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
    .oneOf([Yup.ref("newPassword")], "Passwords not match"),
});

export default function MyPassword() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schemaValidation),
  });

  const onchangePassword = async (data: any) => {
    const { passwordCurrent, newPassword } = data;
    try {
      dispatch(
        changePasswordAction({
          oldPassword: passwordCurrent,
          newPassword: newPassword,
        })
      );
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onchangePassword)}>
        <div className="flex flex-col space-y-5">
          <label
            htmlFor="Current-password"
            className="flex items-baseline space-x-2 space-y-2 gap-2"
          >
            <span className="font-medium text-slate-700 w-1/4 ">
              Current password
            </span>
            <div className="flex flex-col w-2/4">
              <input
                id="Current-password"
                {...register("passwordCurrent")}
                type="password"
                className="w-full py-3 border border-slate-200 bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter current password"
              />
              {errors.passwordCurrent && (
                <p className="text-red-500 text-sm">
                  {errors.passwordCurrent.message as any}
                </p>
              )}
            </div>
            <span
              onClick={() => router.push("/reset-password")}
              className="hover:underline text-primary font-medium cursor-pointer"
            >
              Forgot password ?
            </span>
          </label>
          <label
            htmlFor="new-password"
            className="flex items-baseline space-x-2 space-y-2 gap-2"
          >
            <span className="font-medium text-slate-700 w-1/4  ">
              New password
            </span>
            <div className="flex flex-col w-2/4">
              <input
                id="new-password"
                {...register("newPassword")}
                type="password"
                className="w-full py-3 border border-slate-200 bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message as any}
                </p>
              )}
            </div>
          </label>
          <label
            htmlFor="confirm-password"
            className="flex items-baseline space-x-2 space-y-2 gap-2"
          >
            <span className="font-medium text-slate-700  w-1/4 ">
              Confirm password
            </span>
            <div className="flex flex-col w-2/4">
              <input
                id="confirm-password"
                {...register("rePassword")}
                type="password"
                className="w-full py-3 border border-slate-200 bg-white rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter confirm password"
              />
              {errors.rePassword && (
                <p className="text-red-500 text-sm">
                  {errors.rePassword.message as any}
                </p>
              )}
            </div>
          </label>

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
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span>Approved</span>
          </button>
        </div>
      </form>
    </div>
  );
}
