import { DrawerHeader } from "@/components/mui/CustomSideBar";
import ProductItem from "@/components/product/ProductItem";
import SVGLogo from "@/components/svg/Svg-logo";
import Screen from "@/layouts/Screen";
import { getAllCategoryAction } from "@/redux/action/category.action";
import { getProductByCategoryAction } from "@/redux/action/product.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { Select, Space } from "antd";
import { useRouter } from "next/router";
import React from "react";

export default function Product() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = React.useState(0);
  // const productByCategory = useAppSelector(
  //   (state: RootState) => state.productReducer.productByCategory
  // );
  const [data, setData] = React.useState<any[]>([]);
  const allCategory = useAppSelector(
    (state: RootState) => state.categoryReducer.listCategory
  );

  React.useEffect(() => {
    if (router.isReady) {
      setCurrentPage(router.query?.page as unknown as number);
    }
  }, [router.isReady, router.query?.page]);

  React.useEffect(() => {
    const datas: any[] = [];

    allCategory?.map((category) => {
      datas.push(category.name.toUpperCase());
    });

    setData([...new Set(datas)]);
  }, [allCategory]);

  React.useEffect(() => {
    dispatch(getAllCategoryAction());
  }, []);

  // React.useEffect(() => {
  //   if (router.isReady) {
  //     const getProduct = setTimeout(() => {
  //       dispatch(
  //         getProductByCategoryAction({
  //           categoryName: router.query.category as string,
  //         })
  //       );
  //     });

  //     return () => {
  //       clearTimeout(getProduct);
  //     };
  //   }
  // }, [router.isReady, dispatch]);

  const handleSelectCategoryChange = (value: string) => {
    router.push({
      pathname: "/product",
      query: { category: value },
    });
  };
  return (
    <Screen>
      <div className="bg-white">
        <div className="w-screen sm:container mx-auto  p-4 relative ">
          <div className=" flex space-x-2 items-center">
            <SVGLogo />
            <span className="text-xl font-medium">| Product</span>
          </div>
          <div className="text-sm breadcrumbs">
            <ul>
              <li onClick={() => router.push("/")}>
                <a>Home</a>
              </li>
              <li>
                <a>Product</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full my-4  sm:container mx-auto px-4">
          <div className="space-x-3 inline-flex items-center">
            <h1>Category</h1>
            <Space wrap>
              <Select
                style={{ width: 120 }}
                defaultValue={router.query.category as string}
                onChange={handleSelectCategoryChange}
                options={data?.map((item) => ({
                  value: item.toLowerCase(),
                  label: item.toLowerCase(),
                }))}
              />
            </Space>
          </div>
          {/* <div className="space-x-3 inline-flex items-center">
          <h1>tìm kiếm theo tên</h1>
        </div> */}
        </div>
        <div className="w-full sm:container mx-auto px-4">
          <ProductItem
            categoryName={router.query?.category as string}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Screen>
  );
}
