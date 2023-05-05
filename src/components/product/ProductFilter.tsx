import { useRouter } from "next/router";
import Menu from "./Menu";
import ProductItem from "./ProductItem";
import React from "react";
export default function ProductFilter() {
  const router = useRouter();
  const [category, setCategory] = React.useState<string>("");

  const getCategory = (categoryName: string) => {
    router.push({
      pathname: "/product",
      query: { category: categoryName },
    });
  };

  return (
    <div className="w-full px-6 bg-gray-100">
      <h1 className="font-medium text-2xl text-center text-gray-700  my-5">
        Product for you
      </h1>
      <div className="flex items-center w-full max-w-screen-xl sm:mb-20 mb-4 gap-4  mx-auto overflow-x-auto hideScrollBar capitalize text-sm font-medium">
        <div>
          <svg
            className="w-6 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>

        <div
          onClick={() => router.push("/product")}
          className={` py-2 px-6 bg-white text-center text-gray-700 font-medium rounded  transition-all cursor-pointer ease-in-out duration-200 shadow `}
        >
          All
        </div>
        <Menu categoryName={getCategory} />
      </div>
      <div className="grid grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 mx-auto max-w-screen-xl gap-x-6 gap-y-8">
        <ProductItem categoryName={category} />
      </div>
      <div className="text-center bg-base-content rounded-md">
        <h1 className="font-medium text-xl text-center text-gray-700  my-5 cursor-pointer">
          Load More
        </h1>
      </div>
    </div>
  );
}
