import { useRouter } from "next/router";
import Screen from "./Screen";
import Link from "next/link";

interface IProps {
  children: React.ReactNode;
}
const menuData = [
  {
    id: 1,
    label: "My account",
    path: "my-profile",
  },
  {
    id: 2,
    label: "Order",
    path: "order",
  },
];
export default function ProfileLayout({ children }: IProps) {
  const router = useRouter();

  const mainPath = router.pathname.split("/")[1];
  const subPath = router.pathname.split("/")[2];
  return (
    <Screen>
      <div className="w-full h-full relative bg-white py-4 shadow-xl">
        <div className="w-full sm:container  px-4  relative flex items-center  flex-wrap sm:flex-nowrap justify-between container mx-[15px] sm:mx-auto space-3">
          <div className="text-sm breadcrumbs">
            <ul>
              <li onClick={() => router.push("/")}>
                <a>Home</a>
              </li>
              <li>
                <a>Profile</a>
              </li>
            </ul>
          </div>
          <div
            onClick={() => router.push("/create-shop")}
            className="px-2 py-2 bg-primary btn text-white font-semibold cursor-pointer rounded-md"
          >
            <span>My Shop</span>
          </div>
        </div>
      </div>
      <div className="w-full gap-2 bg-white sm:container min-w-[1200px] px-4 relative flex items-start justify-start container mx-[15px] sm:mx-auto space-3">
        <div className="w-1/4">
          <ul className="menu  w-full bg-white rounded-sm shadow-xl">
            {menuData.map((item) => (
              <Link key={item.id} href={`/${mainPath}/${item.path}`}>
                <li>
                  <span className={`${item.path === subPath ? "active" : ""} `}>
                    {" "}
                    {item.label}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="w-3/4">{children}</div>
      </div>
    </Screen>
  );
}
