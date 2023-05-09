import { Button, Form, Input, Modal } from "antd";
import React from "react";
import AddNewAddress from "./newAddress/AddNewAddress";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import {
  getAddressUserAction,
  getProfileAction,
  setDefaultUserAddressAction,
} from "@/redux/action/user.action";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { IUser, IUserAddress } from "@/type/user.interface";
import { toast } from "react-toastify";

interface IProp {
  [key: string]: any;
}

export default function AddAddress({
  openModal,
  handleCloseModal,
  handleOpenModal,
}: IProp) {
  const [forms] = Form.useForm();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
  };
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState<IUser>();
  const [data, setData] = React.useState<IUserAddress[]>([]);
  const userAddressRef = React.useRef<string>("");
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  const listAddressUser = useAppSelector(
    (state: RootState) => state.userReducer.userAddress
  );

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getProfileAction());
  }, []);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getAddressUserAction());
  }, []);

  React.useEffect(() => {
    if (!Array.isArray(listAddressUser)) return;
    const listData: IUserAddress[] = [];
    listAddressUser.forEach((item) => {
      listData.push({
        id: item.id,
        city: item.city,
        district: item.district,
        street: item.street,
        country: item.country,
        telephone: item.telephone,
        // user: `${(item?.user as any)?.firstName} ${
        //   (item?.user as any)?.lastName
        // }`,
        isDefault: item.isDefault,
      });
    });
    setData(listData);
  }, [listAddressUser]);

  React.useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  const handleSetDefaultAddress = (addressId: string) => {
    try {
      dispatch(setDefaultUserAddressAction(addressId)).then(() => {
        dispatch(getAddressUserAction());
      });
    } catch (error: any) {
      toast.error(error);
    }
  };
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [openAddAddressModal, setOpenAddAddressModal] = React.useState(false);
  const handleOpenAddAddressModal = () => {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    }
    setOpenAddAddressModal(true);
  };

  const handleCloseAddAddressModal = () => {
    document.body.style.overflow = "unset";
    document.body.style.pointerEvents = "auto";
    setOpenAddAddressModal(false);
  };

  const onCreateAddressUser = async () => {};
  return (
    <Modal
      open={openModal}
      onCancel={handleCloseModal}
      centered
      footer={[
        <Button
          className="btn btn-outline btn-warning"
          key="back"
          onClick={handleCloseModal}
        >
          Close
        </Button>,
        <Button
          className="btn btn-outline btn-accent"
          key="submit"
          onClick={() => {
            window.location.reload();
          }}
        >
          Approved
        </Button>,
      ]}
      className="overflow-auto"
    >
      <div className="relative p-4 border-b-2 border-primary py-2">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className="card-body my-3 shadow-lg bg-slate-100"
            >
              <div className="flex -mx-6 space-x-2 justify-between">
                <div className="space-y-2">
                  <div>
                    <p>
                      <span className="text-sm font-medium">
                        {user && `${user.firstName} ${user.lastName}`}
                      </span>{" "}
                      {/* | <span>(+84) 393271417</span> */}|{" "}
                      <span>{item.telephone}</span>
                    </p>
                  </div>
                  <div className="">
                    {`
                ${item.street}, ${item.district}, ${item.city}, ${item.country}
                `}
                  </div>
                  {item.isDefault && (
                    <span className="btn btn-primary btn-outline btn-sm text-primary">
                      Default
                    </span>
                  )}
                </div>
                <div className="space-x-2">
                  {item.isDefault === true ? (
                    <>
                      <span
                        onClick={() => {
                          handleOpenAddAddressModal();
                          setIsUpdate(true);
                          userAddressRef.current = item.id as string;
                        }}
                        className="text-sm text-primary hover:underline cursor-pointer"
                      >
                        Update
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        <div className="flex  space-x-4 py-2">
                          <span
                            onClick={() => {
                              handleOpenAddAddressModal();
                              setIsUpdate(true);
                              userAddressRef.current = item.id as string;
                            }}
                            className="text-sm text-primary hover:underline cursor-pointer"
                          >
                            Update
                          </span>
                          <span className="text-sm text-primary hover:underline cursor-pointer">
                            Delete
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            handleSetDefaultAddress(item.id as string)
                          }
                          className="btn btn-secondary btn-outline btn-sm text-primary"
                        >
                          Default
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        <div className="cart ">
          <button
            onClick={handleOpenAddAddressModal}
            className="btn btn-outline btn-success"
          >
            + Add new{" "}
          </button>
        </div>
        <AddNewAddress
          openModal={openAddAddressModal}
          handleCloseModal={handleCloseAddAddressModal}
        />
      </div>
    </Modal>
  );
}
