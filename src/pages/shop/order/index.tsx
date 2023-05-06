import { DrawerHeader } from "@/components/mui/CustomSideBar";
import ShopLayout from "@/layouts/ShopLayout";

export default function Order() {
  return (
    <ShopLayout>
      <div className="h-full w-full  overflow-x-auto  my-4 p-4 space-y-4">
        <DrawerHeader />
        <div className="flex items-baseline container justify-between border-b border-gray-200">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Order
          </h1>
        </div>
      </div>
    </ShopLayout>
  );
}
