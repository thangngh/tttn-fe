import Screen from "@/layouts/Screen";
import {
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import React from "react";
import { getProfileAction } from "@/redux/action/user.action";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);

  const [user, setUser] = React.useState<any>();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<any>({
    // defaultValues: {
    //   gender: user?.gender,
    // },
  });

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getProfileAction());
  }, []);

  React.useEffect(() => {
    setUser(profile);
  }, [profile]);

  return (
    <Screen>
      <div className="w-full h-full relative bg-white py-4 shadow-xl">
        <div className="w-full sm:container  px-4  relative flex items-center  flex-wrap sm:flex-nowrap justify-end container mx-[15px] sm:mx-auto space-3">
          <div
            onClick={() => router.push("/create-shop")}
            className="px-2 py-2 bg-red-500 text-white font-semibold cursor-pointer rounded-md"
          >
            <span>My Shop</span>
          </div>
          <div className="block w-44 flex-shrink-0 "></div>
        </div>
        <div className="w-full gap-2 sm:container min-w-[1200px] px-4 relative flex items-start justify-start container mx-[15px] sm:mx-auto space-3">
          <div className="w-1/4">
            <ul className="menu  w-full bg-white rounded-sm shadow-xl">
              <li>
                <a>My account</a>
              </li>
              <li>
                <a>Order</a>
              </li>
              <li>
                <a>Notification</a>
              </li>
            </ul>
          </div>
          <div className="w-3/4">
            <div className="w-full bg-white rounded-sm shadow-xl">
              <div className="card-body ">
                <h2 className="card-title">My profile</h2>
                {user && (
                  <form
                    // onSubmit={handleSubmit(onSendData)}
                    className="space-4 my-4 w-[90%] mx-auto"
                  >
                    <div className="flex space-x-4 flex-wrap-reverse sm:flex-nowrap">
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap justify-start">
                            <label htmlFor="firstname">Họ</label>
                            <input
                              type="text"
                              // {...register("firstname")}
                              id="firstname"
                              defaultValue={user?.firstname}
                              className="border border-gray-300 rounded-md px-2 py-1 w-full bg-white"
                            />
                            <label htmlFor="lastname">Tên</label>

                            <input
                              type="text"
                              // {...register("lastname")}
                              defaultValue={user?.lastname}
                              className="border border-gray-300 rounded-md px-2 py-1 w-full  bg-white"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="name">Giới tính</label>
                          <div className="flex items-center gap-x-4 justify-start">
                            <Controller
                              render={({ field }) => (
                                <RadioGroup
                                  className="flex items-center !flex-row"
                                  aria-label="gender"
                                  {...field}
                                >
                                  <FormControlLabel
                                    // value={gender.FEMALE}
                                    control={<Radio />}
                                    label="Nữ"
                                  />
                                  <FormControlLabel
                                    // value={gender.MALE}
                                    control={<Radio />}
                                    label="Nam"
                                  />
                                </RadioGroup>
                              )}
                              name="gender"
                              control={control}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="phone">Số điện thoại</label>
                          <input
                            type="text"
                            // {...register("phone")}
                            name="phone"
                            defaultValue={user?.phone as string}
                            className="border border-gray-300 rounded-md px-2 py-1  bg-white"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="email">Email</label>
                          <input
                            type="text"
                            {...register("email")}
                            name="email"
                            readOnly
                            defaultValue={user?.email}
                            className="border border-gray-300 rounded-md px-2 py-1  bg-white text-gray-300"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <label htmlFor="username">Username:</label>
                          <span>{user?.username}</span>
                        </div>
                        <div className="flex flex-col">
                          <button type="submit">
                            <span className="text-sm font-normal text-white bg-red-400 rounded-md px-4 py-3 ">
                              Thay đổi
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="block w-3/4 mx-auto ">
                        <div className="flex flex-col space-y-4 items-center">
                          <label
                            htmlFor="image"
                            className="h-24 w-24 my-4 block relative"
                          >
                            {/* {user ? (
                            <Image
                              // src={imageUrl}
                              layout="fill"
                              alt=""
                              className=" rounded-full peer"
                              objectFit="cover"
                              draggable={true}
                            />
                          ) : ( */}
                            <Image
                              src={"https://i.pravatar.cc/150?img=32"}
                              layout="fill"
                              alt=""
                              className=" rounded-full peer"
                              objectFit="cover"
                              draggable={true}
                            />
                            {/* )} */}
                          </label>
                          <input
                            id="image"
                            type="file"
                            autoComplete="off"
                            accept="image/*"
                            className="h-0 w-0 peer"
                            // onChange={handleFileChange}
                          />

                          <label
                            htmlFor="image"
                            className="text-sm font-normal text-white bg-red-400 rounded-md px-3 py-2 "
                          >
                            Chọn Ảnh
                          </label>
                          <span>
                            Dụng lượng file tối đa 1 MB <br />
                            Định dạng:.JPEG, .PNG
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
