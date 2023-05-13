import { DrawerHeader } from "@/components/mui/CustomSideBar";
import NoData from "@/components/nodata/Nodata";
import AddReview from "@/components/product/AddReview";
import AvgReview from "@/components/product/AvgReview";
import Rating from "@/components/product/rating";
import Review from "@/components/product/review";
import SVGLogo from "@/components/svg/Svg-logo";
import Screen from "@/layouts/Screen";
import { formatter } from "@/pages/shop/product/[id]";
import { addProductToCartAction } from "@/redux/action/cart.action";
import {
  getOneProductAction,
  getOneProductInventoryAction,
  ownerShopProductAction,
} from "@/redux/action/product.action";
import {
  getProfileAction,
  getReviewProductAction,
} from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { resetSuccess } from "@/redux/reduce/cart.slice";
import {
  addPrice,
  deCreasePrice,
  increasePrice,
} from "@/redux/reduce/product.slice";
import { RootState } from "@/redux/store";
import { IAddCart } from "@/type/cart.interface";
import { Rate } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import Slider, { Settings } from "react-slick";
import { toast } from "react-toastify";
import { isTemplateExpression } from "typescript";

export default function ProductItem() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<any>();
  const [amount, setAmount] = React.useState<any>(1);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [totalPay, setTotalPay] = React.useState<string>("");

  const product = useAppSelector(
    (state: RootState) => state.productReducer.product
  );

  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  const getPrice = useAppSelector(
    (state: RootState) => state.productReducer.price
  );
  const [productReview, setProductReview] = React.useState<any[]>([]);
  const dataProductReview = useAppSelector(
    (state: RootState) => state.userReducer.productReview
  );

  const productIdRef = React.useRef("");
  const userIdRef = React.useRef("");

  React.useEffect(() => {
    if (!Array.isArray(dataProductReview)) return;
    const dataRw: any[] = [];
    dataProductReview.map((item: any) => {
      dataRw.push({
        id: item.id,
        rating: item.rating,
        content: item?.comment?.content,
        image: item?.comment?.lists?.map(
          (image: string) =>
            `${`${process.env.API_URL}/product/get-image/${image}`}`
        ),
        createdAt: item?.createdAt,
        user: `${item?.user?.firstName} ${item?.user?.lastName}`,
        userImage: `${`${process.env.API_URL}/user/get-image/${item.user.avatar}`}`,
      });
    });
    setProductReview(dataRw);
  }, [dataProductReview]);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getProfileAction());
    }
  }, []);

  React.useEffect(() => {
    if (profile) {
      userIdRef.current = profile.id;
    }
  }, [profile]);

  React.useEffect(() => {
    if (getPrice) {
      setTotalPay(getPrice);
    }
  }, [getPrice]);

  const handleAmountChangeInc = useCallback(
    (e: any) => {
      if (amount < quantity) {
        setAmount(amount + 1);
        dispatch(increasePrice());
      } else {
        throw toast.warning("not quantity");
      }
    },
    [amount, dispatch, quantity]
  );

  const handleAmountChangeDec = useCallback(
    (e: any) => {
      if (amount <= 1) {
        throw toast.warning("not < 1");
      } else {
        setAmount(amount - 1);
        dispatch(deCreasePrice());
      }
    },
    [amount, dispatch]
  );

  const ownerProduct = useAppSelector(
    (state: RootState) => state.productReducer.isOwnerProduct
  );

  React.useEffect(() => {
    if (
      typeof ownerProduct === "boolean" &&
      ownerProduct === true &&
      router.isReady
    ) {
      router.push(`/shop/product/${router?.query?.id as string}`);
    }
  }, [ownerProduct, router.isReady]);

  React.useEffect(() => {
    if (router.isReady) {
      dispatch(getOneProductAction(router?.query?.id as string));
      dispatch(getReviewProductAction(router?.query?.id as string));
      dispatch(ownerShopProductAction(router?.query?.id as string));
    }
  }, [router.isReady]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddProductToCart = async (body: IAddCart) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push({
        pathname: "/login",
        query: {
          redirect: router.asPath,
        },
      });
    } else {
      setIsLoading(true);
      dispatch(addProductToCartAction(body));
    }
  };

  const successAddCart = useAppSelector(
    (state: RootState) => state.cartReducer.isSuccess
  );

  React.useEffect(() => {
    if (product) {
      productIdRef.current = product.id as unknown as string;
      setData({
        id: product.id,
        productName: product.name,
        description: product.description,
        product: (product as any).productInventory.map(
          (productInventory: any) => {
            setQuantity(productInventory.quantity);
            setProductInventoryId(productInventory.id);
            return {
              id: productInventory.id,
              price: formatter(productInventory.price),
              quantity: productInventory.quantity,
              image: productInventory.image,
            };
          }
        ),
        categoryName: (product as any).category.name,
        shopName: (product as any).category.shop.name,
        shopId: (product as any).category.shop.id,
      });
    }
  }, [product]);

  React.useEffect(() => {
    let loading;
    if (successAddCart && router.isReady) {
      window.location.reload();
      loading = setTimeout(() => {
        setIsLoading(false);
        dispatch(getOneProductAction(router?.query?.id as string));
      }, 200);
    }
    clearTimeout(loading);
  }, [dispatch, router.isReady, router?.query?.id, successAddCart]);

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const sliderRef = React.useRef<any>(null);
  const [productInventoryId, setProductInventoryId] = React.useState(0);

  const handleAfterChange = useCallback(
    (oldIndex: any, newIndex: any) => {
      const currentSlide = data.product[newIndex];
      const quantity = currentSlide.quantity;
      setQuantity(quantity);
      setAmount(1);
      setProductInventoryId(currentSlide.id);
      dispatch(addPrice(currentSlide.price));
    },
    [data?.product, dispatch]
  );
  console.log(productReview);
  return (
    <Screen>
      <div className="container mx-auto bg-white flex-wrap-reverse mx-full pb-4 px-4 pt-4  sm:px-6 lg:px-8 border-b-2 border-b-gray-400">
        <div className="container mx-auto mb-10 px-4 relative ">
          <div className=" flex space-x-2  items-center">
            <SVGLogo />
            <span className="text-xl font-medium">| Product Detail</span>
          </div>
          <div className="mt-4 cursor-pointer">
            <span
              className="text-md font-semibold"
              onClick={() => router.back()}
            >
              {"< back"}
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full  justify-center">
          <Slider
            {...settings}
            className="w-full md:w-1/2"
            beforeChange={handleAfterChange}
            ref={sliderRef}
          >
            {data?.product?.map((image: any) => (
              <div key={image.id} className="inline-block relative">
                <>
                  <Image
                    src={`${process.env.API_URL}/product/get-image/${image.image}`}
                    alt=""
                    width={400}
                    height={400}
                    className="h-full card w-full max-w-96  max-h-96  object-scale-down bg-fixed rounded-md object-center bg-center"
                  />
                  <div className="flex items-center justify-around px-4">
                    <p className="text-gray-700 card-title">
                      price: {image.price}
                    </p>
                    <p className="text-gray-700 card-title">
                      quantity: {image.quantity}
                    </p>
                  </div>
                </>
              </div>
            ))}
          </Slider>
          <div className="flex py-4 items-center w-full md:w-1/2 flex-col  space-x-4">
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {data?.categoryName}
              </h2>
              <Rating />
              <p className="text-gray-500 text-sm">
                By{" "}
                <Link href="#" className="text-indigo-600 hover:underline">
                  {data?.shopName}
                </Link>
              </p>
              <p className="text-gray-500">
                Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae
                exercitationem porro saepe ea harum corrupti vero id laudantium
                enim, libero blanditiis expedita cupiditate a est.
              </p>
              <p className="text-gray-500  font-bold">
                total cost: {totalPay !== "null" ? totalPay : ""}
              </p>
            </div>
            <div className="text-base font-mono max-w-[100px] w-full">
              <div className="my-4 space-x-4 flex items-center">
                <button
                  disabled={
                    typeof totalPay === "string" && totalPay !== "null"
                      ? false
                      : true
                  }
                  onClick={handleAmountChangeInc}
                  className="p-2  rounded-full bg-indigo-600 text-white font-semibold"
                >
                  <span className=" text-sm">+</span>
                </button>
                <span>{amount}</span>
                <button
                  disabled={
                    typeof totalPay === "string" && totalPay !== "null"
                      ? false
                      : true
                  }
                  onClick={handleAmountChangeDec}
                  className="p-2 rounded-full bg-indigo-600 text-white font-semibold"
                >
                  <span className=" text-sm">-</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              disabled={
                typeof totalPay === "string" && totalPay !== "null"
                  ? false
                  : true
              }
              onClick={() =>
                handleAddProductToCart({
                  price: parseInt(totalPay.split(" ")[0].replace(/,/g, "")),
                  total: amount,
                  userId: +userIdRef.current,
                  productId: data.id,
                  productInventoryId: productInventoryId,
                })
              }
              className="h-14 px-6 py-2 text-center font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              {typeof totalPay === "string" && totalPay !== "null"
                ? "Add to Cart"
                : "Not Open"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-screen bg-gray-50">
        <div className="my-10 mx-auto max-w-screen-md px-10 py-16">
          <div className="flex w-full flex-col">
            <AvgReview productId={productIdRef.current} />
            <AddReview
              productId={productIdRef.current}
              userId={userIdRef.current}
            />
          </div>
        </div>
      </div>
      <div className="py-12 px-4 md:px-6 bg-white 2xl:px-0  2xl:mx-auto flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-[90%] mx-auto space-y-4">
          <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Reviews
          </p>
          {productReview && productReview.length > 0 ? (
            productReview.map((item) => (
              <div
                key={item.id}
                className="w-full flex justify-start items-start shadow-sm flex-col bg-gray-100 p-3"
              >
                <div className="w-full flex justify-start items-start flex-col bg-gray-50">
                  <div className="flex flex-col md:flex-row  justify-between w-full">
                    <div className="flex flex-row justify-between items-start">
                      <button className="ml-4 md:hidden">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 12.5L10 7.5L5 12.5"
                            stroke="#1F2937"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="cursor-pointer mt-2 md:mt-0">
                      <Rate value={+item.rating} disabled />
                    </div>
                  </div>
                  <div className={"md:block "}>
                    <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6">
                      {item.content}
                    </p>
                    <div className="mt-6 flex flex-row justify-start items-start space-x-4">
                      {item?.image?.map((item: string, idx: number) => (
                        <div
                          key={idx}
                          className="py-4 relative px-8 bg-gray-100"
                        >
                          <Image
                            className="h-24 w-24 "
                            src={item}
                            alt=""
                            width={400}
                            height={400}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                      <div>
                        <Image
                          src={item.userImage}
                          alt=""
                          width={400}
                          height={400}
                          className="rounded-full w-10 h-10"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start space-y-2">
                        <p className="text-base font-medium leading-none text-gray-800">
                          {item.user}
                        </p>
                        <p className="text-sm leading-none text-gray-600">
                          {`${format(
                            new Date(item.createdAt),
                            "dd/MM/yyyy - HH:mm:ss"
                          )}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center w-full">
              <NoData />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white flex-wrap-reverse mx-full pb-4 px-4 pt-4  sm:px-6 lg:px-8 border-b-2 border-b-gray-400">
        <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8"></div>
      </div>
    </Screen>
  );
}
