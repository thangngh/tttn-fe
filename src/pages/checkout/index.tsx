import SVGLogo from "@/components/svg/Svg-logo";
import Screen from "@/layouts/Screen";
import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import AddAddress from "@/components/address/AddAddress";
import GuardLayout from "@/layouts/GuardLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { formatter } from "../shop/product/[id]";
import { findAllProductCartUserAction } from "@/redux/action/cart.action";
import { getProfileAction } from "@/redux/action/user.action";
export default function Checkout() {
  const router = useRouter();
  const [openAddAddressModal, setOpenAddAddressModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<any[]>([]);
  const getAllProductCartUser = useAppSelector(
    (state: RootState) => state.cartReducer.cartProduct
  );
  const totalPriceSelector = useAppSelector(
    (state: RootState) => state.cartReducer.totalPrice
  );

  const profile = useAppSelector((state: RootState) => state.userReducer.user);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getProfileAction());
  }, [dispatch]);

  const shopNameRef = React.useRef("");
  const [totalPrice, setTotalPrice] = React.useState(0);
  React.useEffect(() => {
    const product: any[] = [];
    getAllProductCartUser?.map((item: any, index) => {
      shopNameRef.current = item.product.category.shop.name;
      product.push({
        id: item.id,
        total: item.total,
        price: formatter(item.price) + " đ",
        image: item.productInventory?.image,
        productName: item?.product?.name,
        productDes: item?.product?.description,
        productPrice: formatter(item?.productInventory?.price),
        shopName: item.product.category.shop.name,
      });
    });
    setData(product);
  }, [getAllProductCartUser]);

  React.useEffect(() => {
    setTotalPrice(totalPriceSelector);
  }, [totalPriceSelector]);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(findAllProductCartUserAction());
  }, [dispatch]);

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
    <Screen>
      <GuardLayout>
        <div className="w-full mx-auto  max-w-7xl bg-white">
          <div className="w-screen sm:container mx-auto mb-10 px-4 relative ">
            <div className=" flex space-x-2 items-center">
              <SVGLogo />
              <span className="text-xl font-medium">| Checkout</span>
            </div>
            <div className="mt-4 cursor-pointer">
              <span className="text-md font-semibold">{"< quay lại"}</span>
            </div>
          </div>
          <div className="w-screen sm:container mx-auto mb-10 px-4 relative ">
            <div className="flex space-x-2 py-3 my-4 items-center flex-wrap bg-[#f5f5f5] text-black">
              <div className="flex items-center gap-x-3   ">
                <SVGLogo />
                <span>Address</span>
              </div>
              <div className="flex items-center space-x-2">
                <h1>Họ Tên (số điện thoại)</h1>
                <span>Địa chỉ a. xóm b, làng c</span>
                <span className="border border-primary cursor-pointer px-2 text-primary">
                  default
                </span>
                <span
                  className="text-secondary cursor-pointer"
                  onClick={handleOpenAddAddressModal}
                >
                  change
                </span>
              </div>
            </div>
          </div>
          <div className="w-screen sm:container mx-auto mb-10 px-4 relative bg-[#f5f5f5] text-black">
            <div className="block">
              <div className="flex justify-between flex-auto">
                <div className="w-full max-w-1/2">
                  <div className="space-x-3 flex items-center">
                    <span className="max-w-[100px] w-full font-mono">
                      product
                    </span>
                  </div>
                </div>
                <div className="w-full max-w-1/2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-mono max-w-[100px] w-full">
                      price
                    </span>
                    <span className="text-base font-mono max-w-[100px] w-full">
                      total
                    </span>
                    <span className="text-base font-mono max-w-[100px] w-full">
                      pay
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen sm:container mx-auto mb-10 px-4 relative bg-[#f5f5f5] text-black">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between flex-auto">
                <div className="w-full max-w-1/2">
                  <span className="max-w-[100px] w-full font-mono">
                    Tên Shop
                  </span>
                </div>
              </div>
              {data && data.length > 0 ? (
                data.map((item) => (
                  <div key={item.id} className="flex justify-between flex-auto">
                    <div className="w-full max-w-1/2">
                      <div className="space-x-3 my-2 flex items-center">
                        <div className="flex justify-between space-x-2">
                          <div className="relative w-20 h-20">
                            <Image
                              src={`${process.env.API_URL}/product/get-image/${item?.image}`}
                              alt=""
                              width={400}
                              height={400}
                              className="bg-cover h-full w-full bg-no-repeat"
                            />
                          </div>
                          <div className="flex flex-col max-w-sm space-y-2 justify-start">
                            <span className="sm:truncate break-inside-auto text-sm font-medium">
                              {item.productDes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full max-w-1/2">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-mono max-w-[100px] w-full">
                          {item.productPrice}
                        </span>
                        <span className="text-base font-mono max-w-[100px] w-full">
                          {item.total}
                        </span>
                        <span className="text-base font-mono max-w-[100px] w-full">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <h1>Data not found</h1>
                </>
              )}
            </div>
          </div>
          <div className="w-screen sm:container mx-auto my-2 bg-[#f5f5f5] p-4  bottom-0 border-t-2 text-black">
            <div className="block">
              <div className="flex justify-between flex-auto">
                <div className="w-full max-w-1/2">
                  <div className="flex items-center justify-end space-x-4">
                    <div className="flex items-center justify-between ">
                      <span className="text-base font-mono  ">
                        Tổng Thanh Toán (1 sản phẩm):
                      </span>{" "}
                      <span className="text-base font-mono text-primary">
                        {formatter(totalPrice) + " đ"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen sm:container mx-auto my-2 bg-[#f5f5f5] p-4  bottom-0 border-t-2 text-black">
            <div className="block">
              <div className="flex justify-between flex-auto">
                <div className="w-full max-w-1/2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-between ">
                      <span className="text-base font-mono  ">
                        Xác nhận vận chuyển:
                      </span>{" "}
                      <div className="form-control">
                        <label className="label cursor-pointer space-x-3">
                          <span className="label-text">Được kiểm hàng</span>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen sm:container mx-auto  bg-[#f5f5f5] p-4  bottom-0 border-t-2">
            <div className="flex justify-end">
              <button className="btn btn-outline btn-primary">Checkout</button>
            </div>
          </div>
        </div>
        <AddAddress
          openModal={openAddAddressModal}
          handleCloseModal={handleCloseAddAddressModal}
        />
      </GuardLayout>
    </Screen>
  );
}
