import Image from "next/image";

export default function OrderDetail() {
  return (
    <>
      <div className="w-screen sm:container mx-auto mb-10 px-4 relative bg-[#f5f5f5]">
        <div className="flex flex-col space-y-3 ">
          <div className="flex justify-between flex-auto border-b-2 border-gray-200 pt-2 px-2">
            <div className="w-full relative max-w-1/2 flex items-center justify-between">
              <span className="max-w-[100px] w-full font-mono text-primary-focus">
                Tên Shop
              </span>
              <span className="max-w-[100px] w-full font-mono text-primary-focus">
                Trạng thái
              </span>
            </div>
          </div>
          <div className="relative flex justify-between flex-auto">
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
                  <div className="relative flex flex-col max-w-sm space-y-2 justify-start">
                    <span className="sm:truncate break-inside-auto text-sm font-medium">
                      Bình Giữ Nhiệt Hiển Thị Nhiệt Độ Phong Cách Cổ Trang Chất
                      Liệu Inox 304 Cao Cấp Dung Tích 500ml
                    </span>
                    <span className="text-base font-mono w-full">x1</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="text-base font-mono absolute top-10 right-5">
              ₫2.568.000
            </span>
          </div>
          <div className="flex justify-end flex-auto border-t-2  border-gray-200 py-2 ">
            <span className="text-base font-mono pr-4">
              <span className="text-primary-focus">total</span>| ₫2.568.000
            </span>
          </div>
          <div className="flex justify-end flex-auto  py-2 ">
            <button className="btn btn-outline btn-primary">
              Order detail
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
