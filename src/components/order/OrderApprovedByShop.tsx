import { formatter } from "@/pages/shop/product/[id]";
import { rejectOrderAction } from "@/redux/action/cart.action";
import { approvedOrderAction } from "@/redux/action/cart.action";
import { getOrderUserAction } from "@/redux/action/cart.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { IStatus } from "@/type/cart.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { memo } from "react";
import NoData from "../nodata/Nodata";
export default function OrderApprovedByShop() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const getOrder = useAppSelector(
    (state: RootState) => state.cartReducer.getOrder
  );
  const [data, setData] = React.useState<any[]>();

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const completed = IStatus["APPROVED_BY_SHOP"];
    accessToken && dispatch(getOrderUserAction(completed));
  }, []);

  React.useEffect(() => {
    if (!Array.isArray(getOrder)) return;
    const orderArr: any[] = [];
    getOrder.forEach((order) => {
      orderArr.push({
        id: order.id,
        status: order.status,
        price: order?.cart?.price,
        productName: order?.cart?.product?.name,
        des: order?.cart?.product?.description,
        total: order?.cart?.total,
        image: order?.cart?.productInventory?.image,
        shopName: order?.cart?.product?.category?.shop?.name,
      });
    });
    setData(orderArr);
  }, [getOrder]);

  const approvedOder = async (data: string) => {
    dispatch(approvedOrderAction(data));
    window.location.reload();
  };

  const rejectedOder = async (data: string) => {
    dispatch(rejectOrderAction(data));
    window.location.reload();
  };

  return (
    <>
      <div className="w-screen sm:container mx-auto mb-10 px-4 relative bg-[#f5f5f5]">
        {data && data?.length > 0 ? (
          data?.map((item) => (
            <div key={item.id} className="flex flex-col space-y-3  shadow-md">
              <div className="flex flex-col flex-auto border-b-2 border-gray-200 pt-2 px-2">
                <div className="w-full relative max-w-1/2 flex items-center justify-between">
                  <span className="max-w-[100px] w-full font-mono text-primary-focus">
                    {item.shopName}
                  </span>
                  <div className="flex items-center space-x-2 ">
                    <span className="max-w-[100px] w-full font-mono text-primary-focus">
                      {item.status === "pending" ||
                      item.status === "approved by shop"
                        ? item.status
                        : ""}{" "}
                    </span>
                    <button
                      onClick={() => rejectedOder(item.id)}
                      className="btn btn-outline btn-primary"
                    >
                      {"reject"}
                    </button>
                  </div>
                </div>
                <div className="w-full relative max-w-1/2  flex justify-between flex-auto text-black">
                  <div className="w-full max-w-1/2">
                    <div className="space-x-3 my-2 flex items-center">
                      <div className="flex justify-between space-x-2">
                        <div className="relative w-20 h-20">
                          <Image
                            src={`${process.env.API_URL}/product/get-image/${item.image}`}
                            alt=""
                            width={400}
                            height={400}
                            className="bg-cover h-full w-full bg-no-repeat"
                          />
                        </div>
                        <div className="relative flex flex-col max-w-sm space-y-2 justify-start">
                          <span className="sm:truncate break-inside-auto text-sm font-medium">
                            {item.productName}
                          </span>
                          <span className="text-base font-mono w-full">
                            x{`${item.total}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-base font-mono absolute top-10 right-5">
                    {`${formatter(item.price)} ₫`}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
