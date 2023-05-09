import { DrawerHeader } from "@/components/mui/CustomSideBar";
import ShopLayout from "@/layouts/ShopLayout";
import {
  createProductInventoryAction,
  getOneProductAction,
} from "@/redux/action/product.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import React from "react";
import { ProductAPI } from "../../../../../api-client/product.api";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Button, Form, InputNumber, Modal, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IAddCart } from "@/type/cart.interface";
interface DataType {
  createAt?: Date;
  deletedAt?: Date;
  id?: string;
  image?: string;
  modifiedAt?: Date;
  price?: number;
  productId?: number;
  quantity?: number;
}
const currencies = ["₫", "$"];

export const formatter = (value: any) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function ProductDetailShop() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const productDetail = useAppSelector(
    (state: RootState) => state.productReducer.product
  );
  const productInventoryDetail = useAppSelector(
    (state: RootState) => state.productReducer.productInventory
  );
  const [currencySymbol, setCurrencySymbol] = React.useState(currencies[0]);

  const parser = (value: any) =>
    value.replace(new RegExp(`\\\\s?|(,*)`, "g"), "");
  const [product, setProduct] = React.useState<any>(null);
  const [productInventory, setProductInventory] = React.useState<any>(null);
  const [price, setPrice] = React.useState(0);
  const [openProductInventoryModal, setOpenProductInventoryModal] =
    React.useState(false);
  const [forms] = Form.useForm();
  const handleOpenProductInventoryModal = () => {
    setOpenProductInventoryModal(true);
  };
  const handleCloseProductInventoryModal = () => {
    setOpenProductInventoryModal(false);
  };

  const handleChange = (value: any) => {
    setPrice(value);
  };

  React.useEffect(() => {
    if (productDetail) {
      setProduct(productDetail);
    }
  }, [productDetail]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  React.useEffect(() => {
    if (!Array.isArray(productInventoryDetail)) return;
    const dataList: DataType[] = [];
    productInventoryDetail.forEach((item) => {
      dataList.push({
        id: item.id,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        createAt: item.createdAt,
        deletedAt: item.deletedAt,
      });
    });
    setProductInventory(dataList);
  }, [productInventoryDetail]);

  React.useEffect(() => {
    if (router.isReady) {
      dispatch(getOneProductAction(id as string));
    }
  }, [dispatch, id, router.isReady]);

  const handleBack = () => {
    router.back();
  };

  const onCreateProductInventory = async () => {
    const values = await forms.validateFields();

    try {
      const data = {
        productId: id as string,
        price: `${price} ${currencySymbol}`,
        quantity: values.quantity,
      };
      dispatch(
        createProductInventoryAction({
          ...data,
          file: values.image[0].originFileObj,
        })
      );
      handleCloseProductInventoryModal();
      forms.resetFields();
    } catch (error: any) {
      toast.error(error);
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
  };
  return (
    <ShopLayout>
      <div className="h-full w-4/5 mx-auto overflow-x-auto  my-4 p-4 space-y-4">
        <DrawerHeader />
        <button className="flex space-x-2" onClick={() => handleBack()}>
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
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span className=" text-gray-400 group-hover:text-gray-500">back</span>
        </button>
        <div className="flex items-baseline container justify-between border-b border-gray-200">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Product Detail
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
                  onClick={handleOpenProductInventoryModal}
                >
                  <span>Inventory</span>
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
        <React.Fragment>
          <div className=" border-b border-gray-200">
            <div className="flex items-baseline container justify-start flex-col mt-2 space-y-2">
              <h4 className="text-xl font-bold tracking-tight text-gray-900">
                Product Name: {product?.name}
              </h4>
              <h4 className="text-xl font-bold tracking-tight text-gray-900">
                Category Name: {product?.category?.name}
              </h4>
              <h4 className="text-xl font-bold tracking-tight text-gray-900">
                Create:{" "}
                {product?.createAt &&
                  format(new Date(product?.createAt), "dd/MM/yyyy - HH:mm:ss")}
              </h4>
            </div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {productInventory?.map((product: DataType) => (
                  <div
                    key={product.id}
                    className={`group relative shadow-lg rounded-b-md `}
                  >
                    <div
                      className={`
                      min-h-80 aspect-h-1 aspect-w-1  w-full overflow-hidden relative rounded-t-md  bg-gray-200 lg:aspect-none ${
                        product?.quantity === 0 || product?.price === 0
                          ? "group-hover:opacity-75 cursor-not-allowed"
                          : "group-hover:opacity-75"
                      } lg:h-80
                    `}
                    >
                      <Image
                        src={`${process.env.API_URL}/product/get-image/${product.image}`}
                        alt=""
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                        className="h-full  w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 px-2 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.quantity}
                        </h3>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.price && formatter(product.price)}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-baseline container justify-between mt-2 ">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                Đánh giá
              </h1>
            </div>
          </div>
        </React.Fragment>
      </div>
      <Modal
        style={{
          color: "black",
        }}
        open={openProductInventoryModal}
        onOk={handleCloseProductInventoryModal}
        onCancel={handleCloseProductInventoryModal}
        centered
        footer={[
          <Button key="back" onClick={handleCloseProductInventoryModal}>
            Close
          </Button>,
          <Button key="submit" onClick={onCreateProductInventory}>
            Add
          </Button>,
        ]}
      >
        <div>
          <h1 className="my-4 text-base font-medium">Add New Category</h1>
          <Form
            validateMessages={validateMessages}
            name="form-name"
            form={forms}
            onFinish={onCreateProductInventory}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="image">Image</label>
                <Form.Item
                  name={"image"}
                  getValueFromEvent={normFile}
                  valuePropName="fileList"
                >
                  <Upload listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity">Quantity</label>
                <Form.Item
                  name={"quantity"}
                  rules={[{ type: "number", min: 1, required: true }]}
                >
                  <InputNumber className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl" />
                </Form.Item>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price">Price</label>
                <InputNumber
                  onChange={handleChange}
                  formatter={formatter}
                  parser={parser}
                  addonAfter={
                    <Select value={currencySymbol} onChange={setCurrencySymbol}>
                      {currencies.map((currency) => (
                        <Select.Option key={currency} value={currency}>
                          {currency}
                        </Select.Option>
                      ))}
                    </Select>
                  }
                  className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300  focus:shadow-xl"
                />
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </ShopLayout>
  );
}
