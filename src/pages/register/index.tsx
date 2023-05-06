import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegister } from "@/type/auth.interface";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { toast } from "react-toastify";
import { AuthAPI } from "../../../api-client/auth.api";

const schemaValidation = Yup.object({
  firstName: Yup.string()
    .required("firstName is requested")
    .trim("firstName is requested")
    .max(20, "firstName to long"),
  lastName: Yup.string()
    .required("lastName is requested")
    .trim("lastName is requested")
    .max(20, "lastName to long"),
  email: Yup.string()
    .required("Email is requested")
    .trim("Email is requested")
    .max(50, "Email to long")
    .matches(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm, {
      message: "Email not matches",
    }),
  username: Yup.string()
    .required("Username is requested")
    .trim("Username is requested")
    .max(20, "Username to long"),
  password: Yup.string()
    .required("Password is requested")
    .trim("Password is requested")
    .max(20, "Password to long")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
      {
        message:
          "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
      }
    ),
});
const Register = () => {
  const [redirect, setRedirect] = React.useState("/login");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver(schemaValidation),
  });

  React.useEffect(() => {
    if (router.isReady) {
      if (router.query && router.query.url) {
        setRedirect(router.query.url as string);
      }
    }
  }, [router.isReady]);

  const handleRedirectToLogin = () => {
    const query = new URLSearchParams(router.asPath);
    const url = query.has("/login?url")
      ? (query.get("/login?url") as string)
      : redirect;

    router.push(url);
  };

  const onRegister: SubmitHandler<IRegister> = async (data: IRegister) => {
    const { email, password, username, firstName, lastName } = data;
    try {
      const response = await AuthAPI.register({
        email,
        password,
        username,
        firstName,
        lastName,
      });

      if (response.status === 201) {
        handleRedirectToLogin();
      }
    } catch (error: any) {
      toast.error(error);
      return;
    }
  };

  return (
    <div className="max-h-full h-screen w-full bg-white">
      <div className="flex flex-col justify-center  items-center h-auto">
        <div className="bg-white w-full max-w-sm  shadow-xl mt-6 p-4 rounded-lg ">
          <h1 className="text-2xl my-3 font-medium">Register new account</h1>
          <form onSubmit={handleSubmit(onRegister as any)}>
            <div className="flex flex-col space-y-6">
              <div className="space-y-6 flex-1">
                <input
                  type="text"
                  placeholder="first name"
                  {...register("firstName")}
                  className={`w-full px-4 py-3 rounded-lg bg-white ${
                    errors.firstName ? "ring-red-200" : "ring-green-200"
                  } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                />
                {errors.firstName && (
                  <p className="text-primary text-sm mt-0">
                    {errors.firstName.message}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="last name"
                  {...register("lastName")}
                  className={`w-full px-4 py-3 rounded-lg bg-white ${
                    errors.lastName ? "ring-red-200" : "ring-green-200"
                  } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                />
                {errors.lastName && (
                  <p className="text-primary text-sm mt-0">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <input
                type="text"
                placeholder="email"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-lg  bg-white ${
                  errors.email ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
              />
              {errors.email && (
                <p className="text-primary text-sm mt-0">
                  {errors.email.message}
                </p>
              )}
              <input
                type="text"
                placeholder="username"
                {...register("username")}
                className={`w-full px-4 py-3 rounded-lg  bg-white ${
                  errors.username ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
              />
              {errors.username && (
                <p className="text-primary text-sm mt-0">
                  {errors.username.message}
                </p>
              )}
              <input
                type="password"
                placeholder="password"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-lg  bg-white ${
                  errors.password ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
              />
              {errors.password && (
                <p className="text-primary text-sm mt-0">
                  {errors.password.message}
                </p>
              )}
              {/* <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
            />
            {errors.confirmPassword && (
              <p className="text-primary text-sm">
                {errors.confirmPassword.message}
              </p>
            )} */}
            </div>
            <button
              type="submit"
              className="bg-primary btn btn-outline text-white block text-center 3xl:text-xl rounded-lg py-2 px-5 w-full shadow-lg mt-4 mx-auto"
            >
              Register
            </button>
            <Link href={"/login"}>
              <p className="text-base text-primary cursor-pointer text-center my-6 hover:underline">
                Already have an account? Log in
              </p>
            </Link>
          </form>
          <div className="border-t border-gray-200 mt-6">
            <p className="text-center text-gray-400 py-4">OR</p>
            <div className="flex shadow-card-layout-sm items-center space-x-3 justify-center my-2 border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100">
              <GoogleIcon className="w-6 h-6 text-primary ml-[-14px]" />
              <span className="font-medium text-primary">
                Login with Google
              </span>
            </div>
            {/* <div className="flex shadow-card-layout-sm items-center space-x-3 justify-center  my-2 border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100">
            <FacebookIcon className="w-6 h-6 text-primary " />
            <span className=" font-medium text-primary ">
              Đăng nhập với Facebook
            </span>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
