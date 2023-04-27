import StaticCard from "@/components/admin/StaticCard";
import { DrawerHeader } from "@/components/mui/CustomSideBar";
import ShopLayout from "@/layouts/ShopLayout";

export default function Dashboard() {
  return (
    <ShopLayout>
      <div className="h-full  my-4 p-4">
        <DrawerHeader />
        <StaticCard />
      </div>
    </ShopLayout>
  );
}
