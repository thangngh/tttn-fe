import SVGLogo from "@/components/svg/Svg-logo";
import Screen from "@/layouts/Screen";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import {
  deleteProductToCartAction,
  findAllProductCartUserAction,
} from "@/redux/action/cart.action";
import React from "react";
import AddAddress from "@/components/address/AddAddress";
import GuardLayout from "@/layouts/GuardLayout";
import { formatter } from "../shop/product/[id]";
export default function Cart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<any[]>([]);
  const getAllProductCartUser = useAppSelector(
    (state: RootState) => state.cartReducer.cartProduct
  );
  const totalPriceSelector = useAppSelector(
    (state: RootState) => state.cartReducer.totalPrice
  );
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

  const handleRouterBack = () => {
    router.push("/");
  };

  const handleDeleteCart = async (cartId: string) => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(deleteProductToCartAction(cartId));
  };

  const handleRedirectToCheckout = () => {
    if (data.length > 0) {
      router.push({
        pathname: "/checkout",
      });
    }
  };

  return (
    <Screen>
      <GuardLayout>
        <div className="w-full mx-auto  max-w-7xl bg-white">
          <div className="w-full sm:container mx-auto mb-10 px-4 relative ">
            <div className=" flex space-x-2 items-center text-black">
              <SVGLogo />
              <span className="text-xl font-medium">| Cart</span>
            </div>
            <div className="mt-4 cursor-pointer">
              <div className="text-sm breadcrumbs text-black">
                <ul>
                  <li onClick={handleRouterBack}>
                    <a>Home</a>
                  </li>
                  <li>
                    <a>Cart</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-screen sm:container mx-auto my-4 bg-[#f5f5f5] py-2 px-4 relative">
            <div className="block">
              <div className="flex justify-between flex-auto">
                <div className="w-full max-w-1/2">
                  <div className="space-x-3 flex items-center">
                    <span className="text-black max-w-[100px] w-full font-mono">
                      Product
                    </span>
                  </div>
                </div>
                <div className="w-full max-w-1/2">
                  <div className="flex items-center justify-between">
                    <span className="text-black text-base font-mono max-w-[100px] w-full">
                      Checkout
                    </span>
                    <span className="text-black text-base font-mono max-w-[100px] w-full">
                      amount
                    </span>
                    <span className="text-black text-base font-mono max-w-[100px] w-full">
                      pay
                    </span>
                    <span className="text-black text-base font-mono max-w-[100px] w-full">
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
                    <span className="text-black max-w-[100px] w-full font-mono">
                      {shopNameRef.current}
                    </span>
                  </div>
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
                              className="bg-cover bg-no-repeat"
                            />
                          </div>
                          <div className="flex flex-col max-w-sm space-y-2 justify-start">
                            <span className="sm:truncate break-inside-auto text-sm font-medium text-black">
                              {item.productDes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full max-w-1/2">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-mono max-w-[100px] w-full text-black">
                          {item.productPrice}
                        </span>
                        <span className="text-base font-mono max-w-[100px] w-full">
                          <div className="my-4 space-x-4 flex items-center text-black">
                            <span>{item.total}</span>
                          </div>
                        </span>
                        <span className="text-base font-mono max-w-[100px] w-full text-black">
                          {item.price}
                        </span>
                        <span
                          onClick={() => handleDeleteCart(item.id)}
                          className="text-black text-base cursor-pointer font-mono max-w-[100px] w-full hover:underline"
                        >
                          delete
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
          <div className="w-screen sm:container mx-auto bg-[#f5f5f5] p-4 sticky z-20 bottom-0 border-t-2">
            <div className="block">
              <div className="flex justify-between flex-auto">
                <div className="w-full max-w-1/2">
                  <div className="space-x-3 flex items-center"></div>
                </div>
                <div className="w-full max-w-1/2">
                  <div className="flex items-center justify-end space-x-4">
                    <div className="flex items-center justify-between ">
                      <span className="text-base font-mono  text-primary">
                        Total pay ({data?.length} product):
                      </span>{" "}
                      <span className="text-base font-mono text-primary">
                        {formatter(totalPrice) + " đ"}
                      </span>
                    </div>
                    <button
                      disabled={data.length > 0 ? false : true}
                      className={`bg-primary px-6 py-3 rounded-md text-white ${
                        data.length > 0
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                      onClick={handleRedirectToCheckout}
                    >
                      <span>Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GuardLayout>
    </Screen>
  );
}
