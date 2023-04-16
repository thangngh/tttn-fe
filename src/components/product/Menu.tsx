import { getAllCategoryAction } from "@/redux/action/category.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import React from "react";

interface IProps {
  categoryName: (item: string) => void;
}
export default function Menu({ categoryName }: IProps) {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<any[]>([]);

  const allCategory = useAppSelector(
    (state: RootState) => state.categoryReducer.listCategory
  );

  React.useEffect(() => {
    dispatch(getAllCategoryAction());
  }, [dispatch]);
  React.useEffect(() => {
    const dataCategory = [];

    allCategory.map((category) => {
      dataCategory.push({
        id: category._id,
        name: category.name.toUpperCase(),
      });
    });

    setData([...new Set(allCategory)]);
  }, [allCategory]);

  return (
    <>
      {data?.slice(0, 5).map((category, i) => (
        <div
          key={`category-${category.name}`}
          onClick={() => categoryName(category.name)}
          className={`py-2 px-6 bg-white text-center text-gray-700 font-medium whitespace-nowrap rounded hover:bg-blue-light  transition-all cursor-pointer ease-in-out duration-200 shadow`}
        >
          {category.name}
        </div>
      ))}
    </>
  );
}
