import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
interface IProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

export default function CartComponent({ openModal, handleCloseModal }: IProps) {
  const router = useRouter();

  const [data, setData] = React.useState<any[]>([]);
  const [pay, setPay] = React.useState(0);

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
          {data ? (
            data.map((item, index) => (
              <div
                key={index}
                className="border-b my-4 space-y-4 relative before:absolute before:content-['X'] before:right-0 before:top-0"
              >
                <div className="flex gap-2 space-x-2 space-y-4 items-center justify-between flex-wrap sm:flex-nowrap">
                  <div className="flex gap-1 space-x-2">
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.image}
                        // src={"https://i.pravatar.cc/150?img=32"}
                        layout="fill"
                        alt=""
                        className="bg-cover bg-no-repeat"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex flex-col my-2 space-x-2">
                      <span className="break-normal  text-xs font-medium">
                        {item.productname}
                      </span>
                      <div className="block my-4 space-x-4">
                        {/* <button className="p-2  rounded-full bg-red-500 text-white font-semibold">
												<span className=" text-sm">+</span>
											</button> */}
                        <span>{item.amount}</span>
                        {/* <button className="p-2 rounded-full bg-red-500 text-white font-semibold">
												<span className=" text-sm">-</span>
											</button> */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">{item.price}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <h1>Data not found</h1>
            </>
          )}
          {/* <div className="border-b my-4 space-y-4 relative before:absolute before:content-['X'] before:right-0 before:top-0">
					<div className="flex gap-2 space-x-2 space-y-4 items-center justify-between flex-wrap sm:flex-nowrap">
						<div className="flex gap-1 space-x-2">
							<div className="w-24 h-24 relative">
								<Image
									src={"https://i.pravatar.cc/150?img=32"}
									layout="fill"
									alt=""
									className="bg-cover bg-no-repeat"
									objectFit="cover"
								/>
							</div>
							<div className="flex flex-col my-2 space-x-2">
								<span className="break-normal  text-xs font-medium">
									Bình Giữ Nhiệt Hiển Thị Nhiệt Độ Phong Cách Cổ Trang Chất
									Liệu Inox 304 Cao Cấp Dung Tích 500ml
								</span>
								<div className="block my-4 space-x-4">
									<button className="p-2  rounded-full bg-red-500 text-white font-semibold">
										<span className=" text-sm">+</span>
									</button>
									<span>1</span>
									<button className="p-2 rounded-full bg-red-500 text-white font-semibold">
										<span className=" text-sm">-</span>
									</button>
								</div>
							</div>
						</div>
						<div>
							<span className="text-sm font-medium">1</span>
						</div>
					</div>
				</div> */}
        </div>
        <div className="p-4">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span>Giá</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{data.length}</span>
              <span>{pay}</span>
            </div>

            <Link href="/cart">
              <span className="text-center px-5 py-3 cursor-pointer hover:underline">
                View Cart
              </span>
            </Link>
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
