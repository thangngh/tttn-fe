import { DrawerHeader } from "@/components/mui/CustomSideBar";
import ShopLayout from "@/layouts/ShopLayout";
import { useRouter } from "next/router";

export default function ProductDetailShop() {
  const router = useRouter();
  const { id } = router.query;

  const handleBack = () => {
    router.back();
  };
  return (
    <ShopLayout>
      <div className="h-full w-full min-w-[1200px] overflow-x-auto  my-4 p-4 space-y-4">
        <DrawerHeader />
        <div className="flex items-baseline container justify-between border-b border-gray-200">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Product
          </h1>
          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <div className="space-x-6">
                <button
                  type="button"
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  id="menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span>Category</span>
                  <svg
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}
