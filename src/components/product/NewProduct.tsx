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
    <div className="container w-full h-full bg-white">
      <span className="stat-value stat ">New Product</span>
      {
        <Slider {...settings}>
          {product.map((item: any) => {
            return (
              <div key={item.id}>
                <div className="w-full h-full max-h-96  relative">
                  <Image
                    src={`${process.env.API_URL}/product/get-image/${item.image}`}
                    alt=""
                    width={400}
                    height={400}
                    className="bg-cover w-full bg-no-repeat"
                  />

                  <div className="stats bg-primary text-primary-content absolute bottom-0 left-0">
                    <div className="stat">
                      <div className="stat-value">{item.name}</div>
                    </div>
                  </div>
                  {/* <div className="stats bg-primary text-primary-content absolute bottom-0 right-0">
                    <div className="stat">
                      <div className="stat-value">{item.description}</div>
                    </div>
                  </div> */}
                  <div className="stat-actions text-primary-focus absolute left-0 top-0">
                    <button className="btn btn-sm">
                      <Link href={`/product/item/${item.id}`}>
                        <span>View</span>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      }
    </div>
  );
}
