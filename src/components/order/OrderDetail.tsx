import { formatter } from "@/pages/shop/product/[id]";
import { getOrderUserAction } from "@/redux/action/cart.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function OrderDetail() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const getOrder = useAppSelector(
    (state: RootState) => state.cartReducer.getOrder
  );
  const [data, setData] = React.useState<any[]>();

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getOrderUserAction());
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
  console.log("Data order", data);
  return (
    <>
      <div className="w-screen sm:container mx-auto mb-10 px-4 relative bg-[#f5f5f5]">
        {data?.map((item) => (
          <div key={item.id} className="flex flex-col space-y-3  shadow-md">
            <div className="flex flex-col flex-auto border-b-2 border-gray-200 pt-2 px-2">
              <div className="w-full relative max-w-1/2 flex items-center justify-between">
                <span className="max-w-[100px] w-full font-mono text-primary-focus">
                  {item.shopName}
                </span>
                {item.status === "approved" ? (
                  <span className="max-w-[100px] w-full font-mono text-primary-focus">
                    {item.status}
                  </span>
                ) : (
                  <button className="btn btn-outline btn-primary">
                    {item.status}
                  </button>
                )}
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
        ))}
      </div>
    </>
  );
}
