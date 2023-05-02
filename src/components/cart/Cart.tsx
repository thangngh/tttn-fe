import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import {
  deleteProductToCartAction,
  findAllProductCartUserAction,
} from "@/redux/action/cart.action";
import { formatter } from "@/pages/shop/product/[id]";
interface IProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

export default function CartComponent({ openModal, handleCloseModal }: IProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<any[]>([]);
  const [pay, setPay] = React.useState(0);

  const getAllProductCartUser = useAppSelector(
    (state: RootState) => state.cartReducer.cartProduct
  );

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && findAllProductCartUserAction();
  }, [dispatch]);

  React.useEffect(() => {
    const product: any[] = [];
    getAllProductCartUser?.map((item: any) => {
      product.push({
        id: item.id,
        total: item.total,
        price: formatter(item.price) + " đ",
        image: item.productInventory?.image,
        productName: item?.product?.name,
      });
      setPay((pre) => item.price);
    });
    setData(product);
  }, [getAllProductCartUser]);

  const handleDeleteCart = async (cartId: string) => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(deleteProductToCartAction(cartId));
  };

  return (
    <div
      className={`
		${openModal ? "block" : "hidden"}
		fixed bottom-0 flex flex-col max-w-full bg-white z-50 shadow-md bg-clip-padding outline-none translate-x-0 transition-transform duration-300 ease-in-out transform origin-top-right  text-gray-700 top-0 right-0 border-none w-[600px]
	`}
    >
      <div className=" flex items-center justify-between p-4 border-b">
        <h5 className=" mb-0 leading-normal font-semibold">Cart</h5>
        <button
          type="button"
          onClick={handleCloseModal}
          className=" box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
        >
          X
        </button>
      </div>
      <div className="h-full relative">
        <div className="p-4 max-h-full h-[calc(70vh+5px)] overflow-y-auto">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div key={item.id} className="border-b my-4 space-y-4 relative">
                <span
                  onClick={() => handleDeleteCart(item.id)}
                  className="absolute right-0 top-0 cursor-pointer"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
                <div className="flex gap-2 space-x-2 space-y-4 items-center justify-between flex-wrap sm:flex-nowrap">
                  <div className="flex gap-1 space-x-2">
                    <div className="w-24 h-24 relative">
                      <Image
                        src={`${process.env.API_URL}/product/get-image/${item?.image}`}
                        alt=""
                        width={400}
                        height={400}
                        className="bg-cover bg-no-repeat"
                      />
                    </div>
                    <div className="flex flex-col my-2 space-x-2">
                      <span className="break-normal  text-xs font-medium">
                        {item?.productName}
                      </span>
                      <div className="block my-4 space-x-4">
                        {/* <button className="p-2  rounded-full bg-red-500 text-white font-semibold">
												<span className=" text-sm">+</span>
											</button> */}
                        <span>{item?.total}</span>
                        {/* <button className="p-2 rounded-full bg-red-500 text-white font-semibold">
												<span className=" text-sm">-</span>
											</button> */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">{item?.price}</span>
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
        <div className="p-4 space-y-2">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span>Giá</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{data.length}</span>
              <span>{formatter(pay) + " đ"}</span>
            </div>
            <div className="text-center ">
              <Link href="/cart">
                <span className=" px-5 py-3 cursor-pointer hover:underline">
                  View Cart
                </span>
              </Link>
            </div>
            <button
              className="px-5 py-3 bg-red-500 text-white"
              onClick={() => router.push("/checkout")}
            >
              <span>Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
