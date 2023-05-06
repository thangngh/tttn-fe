import {
  editProfileAction,
  getProfileAction,
  uploadAvatarAction,
} from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { FormControlLabel, RadioGroup } from "@mui/material";
import React, { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "react-toastify";
import { Radio } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

enum genderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

function MyProfileComponent() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  const [user, setUser] = React.useState<any>();
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [image, setImage] = React.useState<File>();
  const [valueGender, setValueGender] = React.useState("");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      gender: profile?.gender?.toString(),
    },
  });

  React.useEffect(() => {
    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
    setValue("phone", user?.phone);
    setValue("gender", user?.gender?.toString());
    setValue("email", user?.email);
    setValue("username", user?.username);
    setValueGender(user?.gender?.toString());
  }, [getValues, setValue, user]);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getProfileAction());
  }, []);

  const onSendData = async (data: any) => {
    const { firstName, lastName, phone } = data;
    try {
      await dispatch(
        editProfileAction({ firstName, lastName, gender: valueGender, phone })
      );
    } catch (error: any) {
      toast.error(error);
    }
  };

  React.useEffect(() => {
    if (user?.avatar) {
      setImageUrl(` ${process.env.API_URL}/user/get-image/${user?.avatar}`);
    }
  }, [user]);

  const handleFileChange = (e: any) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  React.useEffect(() => {
    if (image) {
      dispatch(
        uploadAvatarAction({
          file: image,
        })
      );
    }
  }, [dispatch, image, user]);

  React.useEffect(() => {
    setUser(profile);
  }, [profile]);
  return (
    <div>
      {user && (
        <form
          onSubmit={handleSubmit(onSendData)}
          className="space-4 my-4 w-[90%] mx-auto"
        >
          <div className="flex space-x-4 w-full flex-wrap-reverse sm:flex-nowrap">
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap justify-start">
                  <label htmlFor="firstName text-sm">First Name</label>
                  <input
                    type="text"
                    {...register("firstName")}
                    id="firstName"
                    defaultValue={user?.firstName}
                    className="border border-gray-300 rounded-md px-2 py-1 w-full bg-white"
                  />
                  <label htmlFor="lastName">Last Name</label>

                  <input
                    type="text"
                    {...register("lastName")}
                    defaultValue={user?.lastName}
                    className="border border-gray-300 rounded-md px-2 py-1 w-full  bg-white"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="name">Gender</label>
                <div className="flex items-center gap-x-4 justify-start">
                  <Controller
                    render={({ field }) => (
                      <Radio.Group
                        className="flex items-center !flex-row"
                        aria-label="gender"
                        {...field}
                        onChange={(e) => {
                          setValueGender(e.target.value);
                        }}
                        value={valueGender}
                      >
                        <Radio
                          value={genderEnum.FEMALE}
                          // control={<Radio />}
                          // label="FEMALE"
                        >
                          FEMALE
                        </Radio>
                        <Radio
                          value={genderEnum.MALE}
                          // control={<Radio />}
                          // label="MALE"
                        >
                          MALE
                        </Radio>
                      </Radio.Group>
                    )}
                    name="gender"
                    control={control}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  {...register("phone")}
                  name="phone"
                  defaultValue={user?.phone as string}
                  className="border border-gray-300 rounded-md px-2 py-1  bg-white"
                />
              </div>
              <div className="flex  space-x-2">
                <label htmlFor="email">Email: </label>
                <span>{user?.email}</span>
              </div>
              <div className="flex space-x-2">
                <label htmlFor="username">Username:</label>
                <span>{user?.username}</span>
              </div>
              <div className="flex flex-col">
                <button type="submit">
                  <span className="text-sm font-normal text-white bg-primary rounded-md px-4 py-3 ">
                    Change
                  </span>
                </button>
              </div>
            </div>
            <div className="block w-2/4 mx-auto ">
              <div className="flex flex-col space-y-4 items-center">
                <label
                  htmlFor="image"
                  className="h-24 w-24 my-4 block relative"
                >
                  {user ? (
                    <Image
                      src={imageUrl}
                      width={400}
                      height={400}
                      alt=""
                      className=" rounded-full  bg-cover h-full w-full bg-no-repeat"
                      draggable={true}
                      priority={false}
                    />
                  ) : (
                    <Image
                      src={"https://i.pravatar.cc/150?img=32"}
                      layout="fill"
                      alt=""
                      className=" rounded-full peer"
                      objectFit="cover"
                      draggable={true}
                    />
                  )}
                </label>
                <input
                  id="image"
                  type="file"
                  autoComplete="off"
                  accept="image/*"
                  className="h-0 w-0 peer"
                  onChange={handleFileChange}
                />

                <label
                  htmlFor="image"
                  className="text-sm text-center font-normal text-white bg-primary rounded-md px-3 py-2 "
                >
                  Select Image
                </label>
                <span className="text-center">
                  Maximum 2 MB <br />
                  Format:.JPEG, .PNG
                </span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default memo(MyProfileComponent);
