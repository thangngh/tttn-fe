import React from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IUserAddress } from "@/type/user.interface";
import { useForm } from "react-hook-form";
import { RootState } from "@/redux/store";
import {
  getAddressUserAction,
  getProfileAction,
} from "@/redux/action/user.action";
import AddAddress from "../address/AddAddress";
import AddNewAddress from "../address/newAddress/AddNewAddress";

export default function MyAddress() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  const [user, setUser] = React.useState(null);
  const [data, setData] = React.useState<IUserAddress[]>([]);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getProfileAction());
  }, []);

  const listAddressUser = useAppSelector(
    (state: RootState) => state.userReducer.userAddress
  );
  console.log("listAddressUser", listAddressUser);
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
        user: `${(item?.user as any)?.firstName} ${
          (item?.user as any)?.lastName
        }`,
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

  return (
    <div>
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
                      <span className="text-sm font-medium">{item.user}</span>{" "}
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
                      <span className="text-sm text-primary hover:underline cursor-pointer">
                        Update
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        <div className="flex  space-x-4 py-2">
                          <span className="text-sm text-primary hover:underline cursor-pointer">
                            Update
                          </span>
                          <span className="text-sm text-primary hover:underline cursor-pointer">
                            Delete
                          </span>
                        </div>
                        <button className="btn btn-secondary btn-outline btn-sm text-primary">
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
    </div>
  );
}
