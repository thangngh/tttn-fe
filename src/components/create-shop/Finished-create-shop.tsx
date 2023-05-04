import { createShopAction } from "@/redux/action/shop.action";
import { getProfileAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { toast } from "react-toastify";

interface StepThreeProps {
  onBack: () => void;
}
export default function FinishedCreateShopComponent({
  onBack,
}: StepThreeProps) {
  const userIdRef = useRef("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const shop =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("shop") as string)
      : null;
  const profile = useAppSelector((state: RootState) => state.userReducer.user);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getProfileAction());
  }, []);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      userIdRef.current = profile?.id;
    }
  }, [profile?.id]);

  const handleCreateShop = async () => {
    if (!shop) {
      toast.error("some thing went wrong data not exits");
      return;
    } else {
      const newShop = {
        name: shop?.name,
        description: shop?.description,
        userId: userIdRef.current,
        phone: shop?.phone,
        address: {
          city: shop?.["address.city"],
          district: shop?.["address.district"],
          street: shop?.["address.street"],
          country: shop?.["address.country"],
        },
      };

      dispatch(createShopAction(newShop))
        .then(() => {
          localStorage.removeItem("shop");
          const redirect = setTimeout(() => router.push("/shop/dashboard"));

          clearTimeout(redirect);
        })
        .catch(() => {
          toast.error("Some thing went wrong!");
        });
    }
  };

  const handleBack = () => {
    onBack();
  };
  return (
    <div>
      <h1 className="text-center">Finished</h1>
      <button
        className="bg-green-500 text-white shadow-card-layout-sm block text-center 3xl:text-xl rounded-lg py-2 px-5 w-2/5  mt-4 mx-auto"
        onClick={() => handleCreateShop()}
      >
        Create Shop
      </button>
      <div className="flex flex-col space-y-3">
        <button
          className="bg-red-500 text-white shadow-card-layout-sm block text-center 3xl:text-xl rounded-lg py-2 px-5 w-2/5  mt-4 mx-auto"
          type="submit"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}
