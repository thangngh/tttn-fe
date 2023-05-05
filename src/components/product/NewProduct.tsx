import { getProductInMonth } from "@/redux/action/product.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React from "react";
import Slider, { Settings } from "react-slick";
import Link from "next/link";
export default function NewProduct() {
  const dispatch = useAppDispatch();
  const productInMonth = useAppSelector(
    (state: RootState) => state.productReducer.productInMonth
  );
  const [product, setProduct] = React.useState<any[]>([]);

  React.useEffect(() => {
    dispatch(getProductInMonth());
  }, []);

  React.useEffect(() => {
    const data: any[] = [];
    productInMonth?.map((item: any) => {
      data.push({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.productInventory[0].image,
      });
    });
    setProduct(data);
  }, [productInMonth]);

  const settings: Settings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full h-full bg-gray-800">
      {
        <Slider {...settings}>
          {product.map((item: any) => {
            return (
              <div key={item.id} className="!flex">
                <div className="w-full relative">
                  <div className="flex items-start w-4/5 justify-center">
                    <div className="w-2/3">
                      <Image
                        src={`${process.env.API_URL}/product/get-image/${item.image}`}
                        alt=""
                        width={400}
                        height={400}
                        className="bg-cover w-80 max-w-full mx-auto  h-80 bg-no-repeat"
                      />
                    </div>
                    <div className="w-1/3 flex flex-col">
                      <div className="p-3 w-full relative block">
                        <h1 className="text-primary font-medium text-2xl md:text-5xl">
                          {item.name}
                        </h1>
                      </div>
                      <div className="p-3">
                        <div className="text-primary font-medium text-base">
                          {item.description}
                        </div>
                      </div>
                      <div className=" p-3">
                        <button className="btn btn-sm btn-outline">
                          <Link href={`/product/item/${item.id}`}>
                            <span className="text-primary">Read more</span>
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className=" text-primary-content">
                    <div className="">
                      <div className="text-primary">{item.name}</div>
                    </div>
                  </div>
                  <div className=" text-primary-content ">
                    <div className="">
                      <div className="text-primary">{item.description}</div>
                    </div>
                  </div>
                  <div className=" text-primary-focus 0">
                    <button className="btn btn-sm">
                      <Link href={`/product/item/${item.id}`}>
                        <span className="text-primary">View</span>
                      </Link>
                    </button>
                  </div> */}
                </div>
              </div>
            );
          })}
        </Slider>
      }
    </div>
  );
}
