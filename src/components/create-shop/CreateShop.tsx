import Screen from "@/layouts/Screen";
import { createShopAction, isShopAction } from "@/redux/action/shop.action";
import { getProfileAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { ICreateShop } from "@/type/shop.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import SVGLogo from "../svg/Svg-logo";

const schemaValidation = Yup.object({
  name: Yup.string().required("name is requested").trim("name is requested"),
  description: Yup.string()
    .required("description  is requested")
    .trim("description  is requested"),
  phone: Yup.string().required("phone is requested").trim("phone is requested"),
  address: Yup.object().shape({
    city: Yup.string(),
    district: Yup.string(),
    street: Yup.string(),
    country: Yup.string(),
  }),
  email: Yup.string()
    .required("Email is requested")
    .trim("Email is requested")
    .max(50, "Email to long")
    .matches(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm, {
      message: "Email not matches",
    }),
});

interface StepOneProps {
  onNext: () => void;
}

export default function CreateShopComponent({ onNext }: StepOneProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const shop =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("shop") as string)
      : null;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ICreateShop>({
    resolver: yupResolver(schemaValidation),
  });

  React.useEffect(() => {
    if (shop) {
      setValue("name", shop.name);
      setValue("description", shop.description);
      setValue("phone", shop.phone);
      setValue("address.city", shop?.["address.city"]);
      setValue("address.district", shop?.["address.district"]);
      setValue("address.street", shop?.["address.street"]);
      setValue("address.country", shop?.["address.country"]);
    }
  }, [getValues, setValue, shop]);

  const onCreateShop = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem("shop", JSON.stringify(data));
    onNext();
  };
  return (
    <div className="w-full mx-auto mb-5 max-w-7xl">
      <div className="w-screen sm:container mx-auto mb-10 px-4 relative ">
        <form onSubmit={onCreateShop}>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-3">
              <label htmlFor="name">Shop Name</label>
              <input
                className={`w-full px-4 py-3 rounded-lg ${
                  errors.name ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                id="name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-0">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                className={`w-full px-4 py-3 rounded-lg ${
                  errors.description ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-0">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-3">
              <label htmlFor="phone">Phone</label>
              <input
                className={`w-full px-4 py-3 rounded-lg ${
                  errors.phone ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                {...register("phone")}
                id="phone"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-0">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <label>Address</label>
              <input
                className={`w-full px-4 py-3 rounded-lg ${
                  errors.address?.city ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                placeholder="city"
                {...register("address.city")}
              />
              {errors.address?.city && (
                <p className="text-red-500 text-sm mt-0">
                  {errors.address?.city.message}
                </p>
              )}
              <input
                className={`w-full px-4 py-3 rounded-lg ${
                  errors.address?.district ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                placeholder="district"
                {...register("address.district")}
              />
              {errors.address?.district && (
                <p className="text-red-500 text-sm mt-0">
                  {errors.address?.district.message}
                </p>
              )}
              <input
                className={`w-full px-4 py-3 rounded-lg ${
                  errors.address?.street ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                placeholder="street"
                {...register("address.street")}
              />
              {errors.address?.street && (
                <p className="text-red-500 text-sm mt-0">
                  {errors.address?.street.message}
                </p>
              )}
              <input
                className={`w-full px-4 py-3 rounded-lg ${
                  errors.address?.country ? "ring-red-200" : "ring-green-200"
                } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                placeholder="country"
                {...register("address.country")}
              />
              {errors.address?.country && (
                <p className="text-red-500 text-sm mt-0">
                  {errors.address?.country.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <button
                className="bg-red-500 text-white shadow-card-layout-sm block text-center 3xl:text-xl rounded-lg py-2 px-5 w-2/5  mt-4 mx-auto"
                type="submit"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
