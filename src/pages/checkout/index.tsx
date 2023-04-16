import SVGLogo from "@/components/svg/Svg-logo";
import Screen from "@/layouts/Screen";
import { useRouter } from "next/router";
import Image from "next/image";
export default function Checkout() {
  const router = useRouter();

  return (
    <Screen>
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
          <div className="flex space-x-2 py-3 my-4 items-center flex-wrap bg-[#f5f5f5]">
            <div className="flex items-center gap-x-3   ">
              <SVGLogo />
              <span>Địa chỉ nhận hàng</span>
            </div>
            <div className="flex items-center space-x-2">
              <h1>Họ Tên (số điện thoại)</h1>
              <span>Địa chỉ a. xóm b, làng c</span>
              <span className="border border-red-500 px-2 text-red-500">
                mặc định
              </span>
              <span className="text-blue-500 cursor-pointer">thay đổi</span>
            </div>
          </div>
        </div>
        <div className="w-screen sm:container mx-auto mb-10 px-4 relative bg-[#f5f5f5]">
          <div className="block">
            <div className="flex justify-between flex-auto">
              <div className="w-full max-w-1/2">
                <div className="space-x-3 flex items-center">
                  <span className="max-w-[100px] w-full font-mono">
                    Sản Phẩm
                  </span>
                </div>
              </div>
              <div className="w-full max-w-1/2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-mono max-w-[100px] w-full">
                    Đơn giá
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    Số lượng
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    thành tiền
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen sm:container mx-auto mb-10 px-4 relative bg-[#f5f5f5]">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between flex-auto">
              <div className="w-full max-w-1/2">
                <span className="max-w-[100px] w-full font-mono">Tên Shop</span>
              </div>
            </div>
            <div className="flex justify-between flex-auto">
              <div className="w-full max-w-1/2">
                <div className="space-x-3 my-2 flex items-center">
                  <div className="flex justify-between space-x-2">
                    <div className="relative w-20 h-20">
                      <Image
                        src={"https://i.pravatar.cc/150?img=32"}
                        alt=""
                        width={40}
                        height={40}
                        className="bg-cover h-full w-full bg-no-repeat"
                      />
                    </div>
                    <div className="flex flex-col max-w-sm space-y-2 justify-start">
                      <span className="sm:truncate break-inside-auto text-sm font-medium">
                        Bình Giữ Nhiệt Hiển Thị Nhiệt Độ Phong Cách Cổ Trang
                        Chất Liệu Inox 304 Cao Cấp Dung Tích 500ml
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-1/2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-mono max-w-[100px] w-full">
                    ₫2.568.000
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    1
                  </span>
                  <span className="text-base font-mono max-w-[100px] w-full">
                    ₫2.568.000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen sm:container mx-auto my-2 bg-[#f5f5f5] p-4  bottom-0 border-t-2">
          <div className="block">
            <div className="flex justify-between flex-auto">
              <div className="w-full max-w-1/2">
                <div className="flex items-center justify-end space-x-4">
                  <div className="flex items-center justify-between ">
                    <span className="text-base font-mono  ">
                      Tổng Thanh Toán (1 sản phẩm):
                    </span>{" "}
                    <span className="text-base font-mono text-primary">
                      thành tiền
                    </span>
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
    </Screen>
  );
}
