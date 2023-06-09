import { DrawerHeader } from "@/components/mui/CustomSideBar";
import ShopLayout from "@/layouts/ShopLayout";
import {
  approvedOrderAction,
  getOrderShopAction,
  shopApprovedOrderAction,
  shopRejectOrderAction,
} from "@/redux/action/cart.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

export default function Order() {
  const dispatch = useAppDispatch();
  const getOrderShop = useAppSelector(
    (state: RootState) => state.cartReducer.getOrderShop
  );
  const [data, setData] = React.useState<any[]>();
  React.useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && dispatch(getOrderShopAction());
  }, []);

  React.useEffect(() => {
    if (!Array.isArray(getOrderShop)) return;
    const data = getOrderShop.map((item) => {
      return {
        id: item.id,
        fullName: `${item?.user?.firstName} ${item?.user?.lastName}`,
        productName: item?.cart?.product?.name,
        address: {
          city: item?.userAddress?.city,
          district: item?.userAddress?.district,
          country: item?.userAddress?.country,
          street: item?.userAddress?.street,
          telephone: item.userAddress?.telephone,
        },
        total: item?.cart?.total,
        status: item.status,
        createdAt: item.createAt,
      };
    });
    setData(data);
  }, [getOrderShop]);

  const handleApproved = async (orderId: string) => {
    dispatch(shopApprovedOrderAction(orderId)).then(() => {
      window.location.reload();
    });
  };

  const handleRejected = async (orderId: string) => {
    dispatch(shopRejectOrderAction(orderId)).then(() => {
      window.location.reload();
    });
  };

  const approvedOder = async (data: string) => {
    dispatch(approvedOrderAction(data));
    window.location.reload();
  };

  return (
    <ShopLayout>
      <div className="h-full w-full  overflow-x-auto  my-4 p-4 space-y-4">
        <DrawerHeader />
        <div className="flex w-4/5 mx-auto items-baseline container justify-between border-b border-gray-200">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Order
          </h1>
        </div>
        <div className="overflow-y-auto w-[90%] h-auto max-h-80 mx-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Product Name</th>
                <th>Address</th>
                <th>Total</th>
                <th>Status</th>
                <th>Create</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item.id}>
                    {item.status === "approved" ||
                    item.status === "approved by shop" ? (
                      <td>{item.id}</td>
                    ) : (
                      <td className="cursor-pointer">
                        <Link href={`/shop/order/${item.id}`}>{item.id}</Link>
                      </td>
                    )}
                    <td>{item.fullName}</td>
                    <td>{item.productName}</td>
                    <td>{`${item.address.telephone}, ${item.address.street}, ${item.address.city}, ${item.address.district}, ${item.address.country}`}</td>
                    <td>{item.total}</td>
                    <td
                      className={` badge-info
                      ${
                        item.status === "approved"
                          ? "text-green-500"
                          : item.status === "reject"
                          ? "text-red-500"
                          : "text-primary"
                      }
                    `}
                    >
                      {item.status}
                    </td>
                    <td>
                      {format(
                        new Date(item?.createdAt),
                        "dd/MM/yyyy - HH:mm:ss"
                      )}
                    </td>
                    <td>
                      {item.status === "pending" ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleApproved(item.id)}
                            className="btn btn-primary"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejected(item.id)}
                            className="btn btn-danger"
                          >
                            Reject
                          </button>
                        </div>
                      ) : item.status === "approved by shop" ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => approvedOder(item.id)}
                            className="btn btn-primary"
                          >
                            Approve
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </ShopLayout>
  );
}
