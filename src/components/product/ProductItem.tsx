import {
  getAllProductAction,
  getAllProductWithShopAction,
} from "@/redux/action/product.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React from "react";
import { ProductAPI } from "../../../api-client/product.api";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";
import { formatter } from "@/pages/shop/product/[id]";
import Concurrency from "./concurrency";
import { IAddCart } from "@/type/cart.interface";
import { addProductToCartAction } from "@/redux/action/cart.action";
import StorageIcon from "@mui/icons-material/Storage";

interface IProp {
  categoryName: string;
  currentPage?: number;
}

const PAGE_SIZE = 10;

export default function ProductItem({ categoryName, currentPage }: IProp) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const profile = useAppSelector((state: RootState) => state.userReducer.user);
  const [dataSource, setDataSource] = React.useState<any[]>([]);

  const [user, setUser] = React.useState<any>();

  const product = useAppSelector(
    (state: RootState) => state.productReducer.getAllProduct
  );

  // const onPageChange = React.useCallback(
  //   (page: number) => {
  //     setCurrentPage(page);
  //     dispatch(
  //       getAllProductAction({
  //         page: currentPage,
  //         limit: PAGE_SIZE,
  //         //   role: roleRef.current,
  //       })
  //     );
  //   },
  //   [currentPage, dispatch]
  // );
  const settings: Settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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
      dispatch(addProductToCartAction(body));
    }
  };

  React.useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  const handleFormat = React.useCallback((nu: number) => {
    const wrapNumber = +nu;
    if (typeof wrapNumber !== "number" || wrapNumber < 0) {
      return false;
    }
    return true;
  }, []);

  React.useEffect(() => {
    const checkFormatPage = handleFormat(currentPage as number);
    console.log(checkFormatPage, currentPage);

    if (checkFormatPage) {
      dispatch(
        getAllProductAction({
          page: (currentPage as number) || 1,
          limit: PAGE_SIZE,
          category: categoryName,
        })
      );
    }
  }, [dispatch, currentPage, categoryName]);

  React.useEffect(() => {
    const listData: any[] = [];
    product?.results?.forEach((item) => {
      listData.push({
        id: item.id,
        productName: item.name,
        description: item.description,
        product: item.productInventory.map((productInventory: any) => ({
          id: productInventory.id,
          price: productInventory.price,
          quantity: productInventory.quantity,
          image: productInventory.image,
        })),
        categoryName: item.category.name,
        shopName: item.category.shop.name,
        shopId: item.category.shop.id,
      });
    });
    setDataSource(listData);
  }, [product]);
  return (
    <div className="block relative w-full">
      {dataSource.length > 0 ? (
        <div className="grid grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 mx-auto max-w-screen-xl gap-x-6 gap-y-8">
          {dataSource.map((item) => (
            <div key={item.id}>
              <div className="card w-full h-90 max-h-full  bg-base-100 shadow-md  space-y-4 rounded-md">
                <div className="card-actions px-3 pt-3 flex flex-col h-full">
                  <h2
                    className={`${
                      !item.name ? "invisible" : "visible"
                    } card-title `}
                  >
                    {item.name}
                  </h2>
                  <p
                    className={`${
                      !item.description ? "invisible" : "visible"
                    } text-lg max-w-full truncate `}
                  >
                    {item.description}
                  </p>
                  <div className="card-actions justify-end">
                    <div
                      onClick={() => console.log("des", item.categoryName)}
                      className={`badge badge-outline`}
                    >
                      {item.categoryName}
                    </div>
                    <div className="badge badge-outline badge-secondary cursor-pointer">
                      <Link href={`/view-shop/${item.shopId}`}>
                        {item.shopName}
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    <Slider {...settings}>
                      {item.product?.length > 0 ? (
                        item.product.slice(0, 6).map((image: any) => (
                          <div
                            key={image.id}
                            className="h-full max-h-96 relative block w-full space-y-4"
                          >
                            <div className="card-title  mx-auto w-4/5">
                              <Link href={`/product/item/${item.id}`}>
                                <InfoIcon className="h-6 w-6 group-hover:opacity-50 opacity-70" />
                              </Link>
                              <button
                                className="btn btn-outline btn-primary btn-xs  "
                                disabled={
                                  image.price === 0 ||
                                  !image.price ||
                                  image.quantity === 0 ||
                                  !image.quantity
                                    ? true
                                    : false
                                }
                              >
                                {image.price === 0 || !image.price ? (
                                  "not open"
                                ) : image.quantity === 0 || !image.quantity ? (
                                  "solid"
                                ) : (
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                    onClick={() =>
                                      handleAddProductToCart({
                                        price: parseInt(
                                          image.price
                                            .split(" ")[0]
                                            .replace(/,/g, "")
                                        ),
                                        total: image.quantity,
                                        userId: user?.id,
                                        productId: item.id,
                                        productInventoryId: image.id,
                                      })
                                    }
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                    />
                                  </svg>
                                )}
                              </button>
                            </div>
                            <div className="flex items-center justify-between space-x-4 px-4">
                              <div
                                className={` ${
                                  image.price === 0 ? "invisible" : "visible"
                                }`}
                              >
                                <Concurrency
                                  concurrency={formatter(image.price)}
                                />
                              </div>
                              <div
                                className={`badge badge-outline cursor-pointer badge-success  ${
                                  image.quantity === 0 ? "invisible" : "visible"
                                }`}
                              >
                                {`${image.quantity}`}
                              </div>
                            </div>
                            <Image
                              src={`${process.env.API_URL}/product/get-image/${image.image}`}
                              alt=""
                              width={400}
                              height={400}
                              className="h-80 max-h-full bg-cover bg-center  w-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <div className="cursor-not-allowed card-side">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1"
                            width="647.63626"
                            height="632.17383"
                            viewBox="0 0 647.63626 632.17383"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="h-full  w-full object-cover rounded-md object-center lg:h-full lg:w-full"
                          >
                            <path
                              d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
                              transform="translate(-276.18187 -133.91309)"
                              fill="#f2f2f2"
                            />
                            <path
                              d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
                              transform="translate(-276.18187 -133.91309)"
                              fill="#3f3d56"
                            />
                            <path
                              d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
                              transform="translate(-276.18187 -133.91309)"
                              fill="#6c63ff"
                            />
                            <circle
                              cx="190.15351"
                              cy="24.95465"
                              r="20"
                              fill="#6c63ff"
                            />
                            <circle
                              cx="190.15351"
                              cy="24.95465"
                              r="12.66462"
                              fill="#fff"
                            />
                            <path
                              d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
                              transform="translate(-276.18187 -133.91309)"
                              fill="#e6e6e6"
                            />
                            <path
                              d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
                              transform="translate(-276.18187 -133.91309)"
                              fill="#3f3d56"
                            />
                            <path
                              d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
                              transform="translate(-276.18187 -133.91309)"
                              fill="#6c63ff"
                            />
                            <circle
                              cx="433.63626"
                              cy="105.17383"
                              r="20"
                              fill="#6c63ff"
                            />
                            <circle
                              cx="433.63626"
                              cy="105.17383"
                              r="12.18187"
                              fill="#fff"
                            />
                          </svg>
                          <p className="text-center text-primary-content">
                            No data
                          </p>
                        </div>
                      )}
                    </Slider>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          <svg
            className="w-10 h-10"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>
          <h1>Not Found</h1>
        </div>
      )}
    </div>
  );
}
