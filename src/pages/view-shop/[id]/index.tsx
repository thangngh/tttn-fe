import Screen from "@/layouts/Screen";
import { getProductWithShopIdAction } from "@/redux/action/product.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import SVGLogo from "@/components/svg/Svg-logo";
export default function ViewShop() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const shop = useAppSelector((state: RootState) => state.productReducer.shop);
  const ShopNameRef = React.useRef("");
  const ShopAddressRef = React.useRef("");
  const ShopDescriptionRef = React.useRef("");
  const ShopPhoneRef = React.useRef("");
  const [product, setProduct] = React.useState<any>([]);
  React.useEffect(() => {
    const { id } = router.query;
    if (router.isReady) {
      dispatch(getProductWithShopIdAction(id as string));
    }
  }, [router.isReady]);

  React.useEffect(() => {
    const data: any[] = [];
    shop?.map((item: any) => {
      ShopNameRef.current = item.category.shop.name;
      ShopAddressRef.current = item.category.shop.address;
      ShopDescriptionRef.current = item.category.shop.description;
      ShopPhoneRef.current = item.category.shop.phone;
      data.push({
        productId: item.id,
        productName: item.name,
        productDescription: item.description,
        categoryId: item.categoryId,
        categoryName: item.category.name,
        shopId: item.category.shopId,
        shopName: item.category.shop.name,
        productInventory: item.productInventory.map((product: any) => ({
          id: product.id,
          quantity: product.quantity,
          price: product.price,
          image: product.image,
        })),
      });
    });
    setProduct(data);
  }, [shop]);

  const settings: Settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Screen>
      <div className="w-full mx-auto max-w-7xl bg-white">
        <div className="container mx-auto mb-10 px-4 relative ">
          <div className=" flex space-x-2  items-center">
            <SVGLogo />
            <span className="text-xl font-medium">| Shop Information</span>
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
        <div className="w-screen sm:container mx-auto mb-10 px-4 relative ">
          <div className="flex space-x-2 items-center">
            <span className="text-xl font-medium">
              Name Shop: {ShopNameRef.current}
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="text-xl font-medium">
              địa chỉ:{" "}
              {/* {`thành phố ${shop?.address?.city}, đường ${shop?.address?.street}, tỉnh ${shop?.address?.district}`} */}
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="text-xl font-medium">
              Mô tả: {ShopDescriptionRef.current}
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="text-xl font-medium">
              số điện thoại: {ShopPhoneRef.current}
            </span>
          </div>
        </div>
        <div className="w-screen sm:container space-y-4 space-x-3  mx-auto px-4 relative ">
          <span>Shop Product</span>

          <div>
            <div className="flex flex-wrap -mx-4">
              {product.map((item: any) => (
                <div
                  key={item.productId}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {
                      <Slider {...settings}>
                        {item.productInventory.map((product: any) => (
                          <div
                            key={product.id}
                            className="relative pb-48 max-h-48 max-w-48 overflow-hidden"
                          >
                            <Image
                              className="inset-0 h-full w-full object-cover"
                              src={`${process.env.API_URL}/product/get-image/${product.image}`}
                              alt=""
                              width={400}
                              height={400}
                            />

                            <div className="absolute inset-0 bg-black opacity-25"></div>

                            <div className="absolute bottom-0 left-0 w-full py-4 px-6 bg-gray-900 bg-opacity-75">
                              <h4 className="text-white text-lg max-w-full truncate  font-semibold mb-2">
                                {item.productName}
                              </h4>
                              <p className="text-gray-200  text-sm">
                                {product.price} <i>đ</i>
                              </p>

                              <div className="flex items-center mt-4">
                                <div className="flex items-center">
                                  <button>
                                    <span className="text-white badge badge-lg">
                                      Add to cart
                                    </span>
                                  </button>
                                </div>

                                <div className="flex items-center ml-auto">
                                  <button className="text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                                    <svg
                                      className="h-6 w-6 fill-current"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
