import { getProfileAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import React, { useRef } from "react";

interface StepTwoProps {
  onBack: () => void;
  onNext: () => void;
}

export default function ShopDetailComponent({ onNext, onBack }: StepTwoProps) {
  const userIdRef = useRef("");
  const dispatch = useAppDispatch();
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

  const handleBack = () => {
    onBack();
  };

  const handleNext = () => {
    onNext();
  };
  return (
    <div className="w-full mx-auto mb-5 max-w-7xl">
      <div className="w-screen sm:container mx-auto mb-10 px-4 relative ">
        <form>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-3">
              <label htmlFor="name">Shop Name</label>
              <input
                className={`w-full px-4 py-3 rounded-lg focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                id="name"
                value={shop?.name}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                readOnly
                value={shop?.description}
                className={`w-full px-4 py-3 rounded-lg  focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label htmlFor="phone">Phone</label>
              <input
                className={`w-full px-4 py-3 rounded-lg 
              focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                id="phone"
                readOnly
                value={shop?.phone}
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label>Address</label>
              <input
                className={`w-full px-4 py-3 rounded-lg 
              } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                placeholder="city"
                readOnly
                value={shop?.["address.city"]}
              />
              <input
                className={`w-full px-4 py-3 rounded-lg 
              } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                placeholder="district"
                readOnly
                value={shop?.["address.district"]}
              />

              <input
                className={`w-full px-4 py-3 rounded-lg
              } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                placeholder="street"
                readOnly
                value={shop?.["address.street"]}
              />

              <input
                className={`w-full px-4 py-3 rounded-lg
              } focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl`}
                type="text"
                readOnly
                placeholder="country"
                value={shop?.["address.country"]}
              />
            </div>

            <div className="flex item-center justify-between space-y-3">
              <button
                className="bg-red-500 text-white shadow-card-layout-sm block text-center 3xl:text-xl rounded-lg py-2 px-5 w-2/5  mt-4 mx-auto"
                type="submit"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="bg-red-500 text-white shadow-card-layout-sm block text-center 3xl:text-xl rounded-lg py-2 px-5 w-2/5  mt-4 mx-auto"
                type="submit"
                onClick={handleNext}
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
