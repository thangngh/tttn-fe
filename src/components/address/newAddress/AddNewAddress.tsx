import { Button, Modal } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { IUserAddress } from "@/type/user.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import {
  addAddressUserAction,
  getProfileAction,
} from "@/redux/action/user.action";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";

interface IProp {
  [key: string]: any;
}

const schemaValidation = Yup.object({
  city: Yup.string().required("city is requested").trim("city is requested"),
  district: Yup.string()
    .required("district is requested")
    .trim("district is requested"),
  street: Yup.string()
    .required("street is requested")
    .trim("street is requested"),
  country: Yup.string()
    .required("country is requested")
    .trim("country is requested"),
  telephone: Yup.string()
    .required("telephone is requested")
    .trim("telephone is requested"),
});

export default function AddNewAddress({
  openModal,
  handleCloseModal,
  handleUpdateData,
}: IProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserAddress>({
    resolver: yupResolver(schemaValidation),
  });
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  const [user, setUser] = React.useState<string>("");
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getProfileAction());
  }, []);

  React.useEffect(() => {
    if (profile) {
      setUser(profile.id);
    }
  }, [profile]);

  const onCreateAddressUser = async (data: IUserAddress) => {
    try {
      dispatch(
        addAddressUserAction({
          ...data,
          userId: user,
        })
      );
      handleCloseModal();
    } catch (error) {}
  };

  return (
    <Modal
      open={openModal}
      onCancel={handleCloseModal}
      centered
      footer={null}
      className="overflow-auto"
    >
      <form onSubmit={handleSubmit(onCreateAddressUser)}>
        <div className="relative p-4 border-b-2 border-primary py-2">
          <h1 className="text-lg text-primary">Add address</h1>
          <div className="-m-3  bg-white">
            <div className="py-2">
              <label className=" space-x-4">
                <div className="label">
                  <span className="label-text w-1/3">City</span>
                  <input
                    type="text"
                    {...register("city")}
                    className="input input-ghost border border-primary bg-white  max-w-full w-2/3"
                  />
                </div>
                {errors.city && (
                  <p className="text-primary text-sm">{errors.city.message}</p>
                )}
              </label>
            </div>
            <div className="py-2">
              <label className=" space-x-4">
                <div className="label">
                  <span className="label-text w-1/3">district</span>
                  <input
                    type="text"
                    {...register("district")}
                    className="input input-ghost bg-white border border-primary  max-w-full w-2/3"
                  />
                </div>
                {errors.district && (
                  <p className="text-primary text-sm">
                    {errors.district.message}
                  </p>
                )}
              </label>
            </div>
            <div className="py-2">
              <label className=" space-x-4">
                <div className="label">
                  <span className="label-text w-1/3">street</span>
                  <input
                    type="text"
                    {...register("street")}
                    className="input input-ghost bg-white border border-primary max-w-full w-2/3"
                  />
                </div>
                {errors.street && (
                  <p className="text-primary text-sm">
                    {errors.street.message}
                  </p>
                )}
              </label>
            </div>
            <div className="py-2">
              <label className=" space-x-4">
                <div className="label">
                  <span className="label-text w-1/3">country</span>
                  <input
                    type="text"
                    {...register("country")}
                    className="input input-ghost bg-white border border-primary max-w-full w-2/3"
                  />
                </div>
                {errors.country && (
                  <p className="text-primary text-sm">
                    {errors.country.message}
                  </p>
                )}
              </label>
            </div>
            <div className="py-2">
              <label className=" space-x-4">
                <div className="label">
                  <span className="label-text w-1/3">telephone</span>
                  <input
                    type="number"
                    {...register("telephone")}
                    className="input input-ghost bg-white border border-primary max-w-full w-2/3"
                  />
                </div>
                {errors.telephone && (
                  <p className="text-primary text-sm">
                    {errors.telephone.message}
                  </p>
                )}
              </label>
            </div>
            <div className="py-2">
              <button className="btn btn-outline btn-primary">Create</button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
function dispatch(
  arg0: AsyncThunkAction<
    any,
    void,
    {
      state?: unknown;
      dispatch?: Dispatch<AnyAction> | undefined;
      extra?: unknown;
      rejectValue?: unknown;
      serializedErrorType?: unknown;
      pendingMeta?: unknown;
      fulfilledMeta?: unknown;
      rejectedMeta?: unknown;
    }
  >
) {
  throw new Error("Function not implemented.");
}
