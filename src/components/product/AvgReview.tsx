import { getRatingProductAction } from "@/redux/action/shop.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { Progress } from "antd";
import React from "react";

interface IProp {
  productId: string;
}

export default function AvgReview({ productId }: IProp) {
  const dispatch = useAppDispatch();
  const avgRef = React.useRef("");
  const [data, setData] = React.useState<any[]>([]);
  const getRating = useAppSelector(
    (state: RootState) => state.shopReducer.getRatingProduct
  );

  React.useEffect(() => {
    if (getRating) {
      avgRef.current = Math.abs(getRating.avg).toFixed(1);
      setData(getRating?.dataRate);
    }
  }, [getRating]);

  React.useEffect(() => {
    if (productId) {
      dispatch(getRatingProductAction(productId));
    }
  }, [dispatch, productId]);
  return (
    <div className="text-gray-700">
      <div className="flex flex-col sm:flex-row">
        <h1 className="max-w-sm text-3xl font-bold text-blue-900">
          What people think <br />
          about product
        </h1>
        <div className="my-4 rounded-xl bg-white py-2 px-4 shadow sm:my-0 sm:ml-auto">
          <div className="flex h-16 items-center text-2xl font-bold text-blue-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {avgRef.current}
          </div>
          <p className="text-sm text-gray-500">Average User Rating</p>
        </div>
      </div>
      <p className="font-medium">Reviews</p>
      <ul className="mb-6 mt-2 space-y-2">
        {data &&
          data.map((item, index) => (
            <li key={index} className="flex items-center text-sm font-medium">
              <span className="w-3">{item?.rating}</span>
              <span className="mr-4 text-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
              <Progress percent={item?.count} />
              {/* <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
            <div className="h-full w-10/12 bg-yellow-400"></div>
          </div> */}
              <span className="w-3">{item?.count}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
