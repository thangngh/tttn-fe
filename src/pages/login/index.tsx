import React, { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin, ILoginGoogle, IRole } from "@/type/auth.interface";
import { getRoleAction } from "@/redux/action/user.action";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signIn, getSession } from "next-auth/react";
import { AuthAPI } from "../../../api-client/auth.api";
import { toast } from "react-toastify";
import { ISession } from "../api/auth/[...nextauth]";
const schemaValidation = Yup.object({
  username: Yup.string()
    .required("username is requested")
    .trim("username is requested"),
  password: Yup.string()
    .required("password is requested")
    .trim("password is requested"),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [redirect, setRedirect] = React.useState("/");
  const role = useAppSelector((state: RootState) => state.userReducer.role);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(schemaValidation),
  });

  React.useEffect(() => {
    (async () => {
      const session = await getSession();
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        session &&
          onLoginGoogle({
            accessToken: (session.user as ISession).accessToken,
          });
      }
      //  else {
      //   router.push("/");
      // }
    })();
  }, []);

  React.useEffect(() => {
    if (router.isReady) {
      if (router.query && router.query.url) {
        setRedirect(router.query.url as string);
      }
    }
  }, [router.isReady]);

  const roleRef = useRef("");

  const handleRedirect = () => {
    const query = new URLSearchParams(router.asPath);
    const url = query.has("/login?url")
      ? (query.get("/login?url") as string)
      : roleRef.current.trim() === IRole.ADMIN
      ? "/admin/dashboard"
      : redirect;

    router.push(url);
  };

  const handleRegister = () => {
    router.push({
      pathname: "/register",
      query: router.query || { url: "/" },
    });
  };

  const handleRedirectGoogle = () => {
    signIn("google");
  };

  const onLogin: SubmitHandler<ILogin> = async (data: ILogin) => {
    const { username, password } = data;
    try {
      const response = await AuthAPI.login({ username, password });
      if (response?.status === 201) {
        dispatch(getRoleAction()).then((data) => {
          roleRef.current = data?.payload?.data;
          handleRedirect();
        });
      }
    } catch (error: any) {
      toast.error(error);
      return;
    }
  };

  const onLoginGoogle = async (payload: ILoginGoogle) => {
    const { accessToken } = payload;
    try {
      const response = await AuthAPI.loginWithGoogle({ accessToken });

      if (response?.status === 201) {
        dispatch(getRoleAction()).then((data) => {
          roleRef.current = data?.payload?.data;
          handleRedirect();
        });
      }
      return;
    } catch (error: any) {
      toast.error(error);
      return;
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-white w-full max-w-sm mt-6 p-4 rounded-lg shadow-xl">
          <h1 className="text-2xl my-3 font-medium">Login account</h1>
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="flex flex-col space-y-6">
              <input
                placeholder="username"
                type="text"
                {...register("username")}
                className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
              <input
                placeholder="password"
                type="password"
                {...register("password")}
                className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white shadow-card-layout-sm block text-center 3xl:text-xl rounded-lg py-2 px-5 w-full  mt-4 mx-auto"
            >
              Sign in
            </button>
            <div onClick={handleRegister}>
              <p className="text-base text-red-500 cursor-pointer text-center my-6 hover:underline">
                Create new account?
              </p>
            </div>
          </form>
          <div className="border-t border-gray-200 mt-6">
            <p className="text-center text-gray-400 py-4">OR </p>
            <div
              onClick={handleRedirectGoogle}
              className="flex items-center space-x-3 shadow-card-layout-sm justify-center  my-2 border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100"
            >
              <GoogleIcon className="w-6 h-6 text-red-500 ml-[-14px]" />
              <span className=" font-medium text-red-500 ">
                Login with Google
              </span>
            </div>
            {/* <div
              // onClick={handleRedirectFacebook}
              // onClick={() => router.push("/login/facebook")}
              className="flex items-center space-x-3 shadow-card-layout-sm justify-center  my-2 border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100"
            >
              <FacebookIcon className="w-6 h-6 text-red-500 " />
              <span className=" font-medium text-red-500 ">
                Login with Facebook
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
