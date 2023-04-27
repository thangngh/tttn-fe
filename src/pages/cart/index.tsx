import SVGLogo from "@/components/svg/Svg-logo";
import Screen from "@/layouts/Screen";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { findAllProductCartUserAction } from "@/redux/action/cart.action";
import React from "react";
import AddAddress from "@/components/address/AddAddress";
export default function Cart() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const productCartUser = useAppSelector(
    (state: RootState) => state.cartReducer.cartProduct
  );

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    accessToken && dispatch(findAllProductCartUserAction());
  });

  const handleRouterBack = () => {
    router.back();
  };

  return (
    <Screen>
      <div className="w-full mx-auto  max-w-7xl bg-white">
        <div className="w-full sm:container mx-auto mb-10 px-4 relative ">
          <div className=" flex space-x-2 items-center">
            <SVGLogo />
            <span className="text-xl font-medium">| Cart</span>
          </div>
          <div className="mt-4 cursor-pointer">
            <span className="text-md font-semibold" onClick={handleRouterBack}>
              {"< back"}
            </span>
          </div>
        </div>

        <div className="w-screen sm:container mx-auto my-4 bg-[#f5f5f5] py-2 px-4 relative">
          <div className="block">
            <div className="flex justify-between flex-auto">
              <div className="w-full max-w-1/2">
                <div className="space-x-3 flex items-center">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="checkbox checkbox-error"
                  />
                  <span className="max-w-[100px] w-full font-mono">
                    Product
                  </span>
                </div>
              </div>
              <div className="w-full max-w-1/2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-mono max-w-[100px] w-full">
                    Checkout
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    amount
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    pay
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    action
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen sm:container mx-auto my-2 bg-[#f5f5f5] px-4 relative">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between flex-auto">
              <div className="w-full max-w-1/2">
                <div className="space-x-3 my-2 flex items-center">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="checkbox checkbox-error"
                  />
                  <span className="max-w-[100px] w-full font-mono">
                    Shop name
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-auto">
              <div className="w-full max-w-1/2">
                <div className="space-x-3 my-2 flex items-center">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="checkbox checkbox-error"
                  />
                  <div className="flex justify-between space-x-2">
                    <div className="relative w-20 h-20">
                      <Image
                        src={"https://i.pravatar.cc/150?img=32"}
                        layout="fill"
                        alt=""
                        className="bg-cover bg-no-repeat"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col max-w-sm space-y-2 justify-start">
                      <span className="sm:truncate break-inside-auto text-sm font-medium">
                        Bình Giữ Nhiệt Hiển Thị Nhiệt Độ Phong Cách Cổ Trang
                        Chất Liệu Inox 304 Cao Cấp Dung Tích 500ml
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-1/2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-mono max-w-[100px] w-full">
                    ₫2.568.000
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    <div className="my-4 space-x-4 flex items-center">
                      <button className="p-2  rounded-full bg-red-500 text-white font-semibold">
                        <span className=" text-sm">+</span>
                      </button>
                      <span>1</span>
                      <button className="p-2 rounded-full bg-red-500 text-white font-semibold">
                        <span className=" text-sm">-</span>
                      </button>
                    </div>
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    ₫2.568.000
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    delete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen sm:container mx-auto bg-[#f5f5f5] p-4 sticky z-20 bottom-0 border-t-2">
          <div className="block">
            <div className="flex justify-between flex-auto">
              <div className="w-full max-w-1/2">
                <div className="space-x-3 flex items-center">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="checkbox checkbox-error"
                  />
                  <span className="max-w-[100px] w-full font-mono">
                    Select all
                  </span>
                </div>
              </div>
              <div className="w-full max-w-1/2">
                <div className="flex items-center justify-end space-x-4">
                  <div className="flex items-center justify-between ">
                    <span className="text-base font-mono  ">
                      Total pay (1 sản phẩm):
                    </span>{" "}
                    <span className="text-base font-mono ">price</span>
                  </div>
                  <button className="bg-red-500 px-6 py-3 rounded-md text-white">
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
