import { DrawerHeader } from "@/components/mui/CustomSideBar";
import { EditableCell } from "@/components/table/table-edit.cell";
import { ColumnTypes } from "@/components/table/table-type";
import ShopLayout from "@/layouts/ShopLayout";
import {
  createCategoryAction,
  getAllCategoryByShopAction,
} from "@/redux/action/category.action";
import {
  createProductAction,
  deleteProductAction,
  getAllProductWithShopAction,
  updateProductAction,
} from "@/redux/action/product.action";
import { getShopByUserAction } from "@/redux/action/shop.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import {
  Form,
  Input,
  Checkbox,
  Table,
  Typography,
  Popconfirm,
  Modal,
  Button,
  InputNumber,
  Select,
  Row,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { number } from "yup";

interface DataType {
  id?: string;
  name?: string;
  description?: string;
  categoryId?: string;
  categoryName?: string;
  discountId?: string;
  createAt?: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
  isActive: boolean;
}

interface Category {
  id: number;
  name: string;
}

const PAGE_SIZE = 10;

export default function Product() {
  const [editingKey, setEditingKey] = React.useState<string>("");
  const [searchKey, setSearchKey] = React.useState("");
  const router = useRouter();
  const [forms] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const handleOpen = () => setOpen(true);

  const shopId = useAppSelector((state: RootState) => state.shopReducer.shopId);

  const listProductWithShop = useAppSelector(
    (state: RootState) => state.productReducer.productWithShop
  );

  const [category, setCategory] = React.useState<Category[]>([]);
  const [discount, setDiscount] = React.useState<Category[]>([]);
  const [categoryChange, setCategoryChange] = React.useState("");
  const [discountChange, setDiscountChange] = React.useState("");

  const listCategoryWithShop = useAppSelector(
    (state: RootState) => state.categoryReducer.category
  );

  const handleClose = () => {
    forms.resetFields();
    setOpen(false);
  };

  const onPageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      dispatch(
        getAllProductWithShopAction({
          page: currentPage,
          limit: PAGE_SIZE,
          //   role: roleRef.current,
        })
      );
    },
    [currentPage, dispatch]
  );

  React.useEffect(() => {
    if (!Array.isArray(listCategoryWithShop)) return;
    const listData: Category[] = [];
    listCategoryWithShop.forEach((item) => {
      listData.push({
        id: item.id,
        name: item.name as string,
      });
    });
    setCategory(listData);
  }, [listCategoryWithShop]);

  React.useEffect(() => {
    const accessToken =
      typeof window != undefined && localStorage.getItem("accessToken");
    accessToken &&
      dispatch(
        getAllProductWithShopAction({
          page: currentPage,
          limit: PAGE_SIZE,
        })
      );
  }, [currentPage, dispatch]);

  React.useEffect(() => {
    if (!Array.isArray(listProductWithShop.results)) return;
    const listData: DataType[] = [];
    listProductWithShop.results.forEach((item) => {
      listData.push({
        id: item?.id as unknown as string,
        name: item.name,
        description: item.description,
        categoryId: item.categoryId as unknown as string,
        categoryName: (item as any).category.name,
        discountId: item.discountId as unknown as string,
        createAt: item.createAt,
        modifiedAt: item.modifiedAt,
        deletedAt: item.deletedAt,
        isActive: item.isActive as boolean,
      });
    });
    setDataSource(listData);
  }, [listProductWithShop]);

  React.useEffect(() => {
    dispatch(getShopByUserAction());
  }, []);

  React.useEffect(() => {
    dispatch(getAllCategoryByShopAction());
  }, []);

  const isEditing = (record: DataType) => record?.id === editingKey;

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: DataType) => {
    const row = await forms.validateFields();
    try {
      dispatch(
        updateProductAction({
          id: +(key.id as string),
          name: row.name,
          description: row.description,
          categoryId: categoryChange as unknown as number,
          discountId: row.discount,
          modifiedAt: new Date(),
        })
      );
      setEditingKey("");
    } catch (error: any) {
      toast.error(error);
    }
  };

  const edit = (record: DataType) => {
    forms.setFieldsValue({
      name: "",
      description: "",
      category: "",
      ...record,
    });
    setCategoryChange(record?.categoryId as string);
    setEditingKey(record?.id as string);
  };

  const deleteProduct = (key: DataType) => {
    try {
      dispatch(deleteProductAction(key.id as string));
      setEditingKey("");
    } catch (error: any) {
      toast.error(error);
    }
  };

  const columns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      editable: false,
      render: (text) => {
        return (
          <Link href={`/shop/product/${text}`}>
            <span>{text}</span>
          </Link>
        );
      },
    },
    { title: "Name", dataIndex: "name", key: "name", editable: true },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      // editable: true,
      render: (text: string, record: object) => {
        const typedRecord = record as DataType;
        const { id, categoryName } = typedRecord;
        const editable = isEditing(typedRecord);
        return editable ? (
          <Select
            showArrow
            style={{
              width: "100%",
            }}
            onChange={(value: string) => setCategoryChange(value)}
            defaultValue={categoryName}
          >
            {category.map((item, idx) => (
              <Select.Option key={idx} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Typography>{text}</Typography>
        );
      },
    },
    // {
    //   title: "Discount Id",
    //   dataIndex: "discountId",
    //   key: "discountId",
    //   editable: true,
    // },
    { title: "Created At", dataIndex: "createAt", key: "createAt" },
    { title: "Modified At", dataIndex: "modifiedAt", key: "modifiedAt" },
    // { title: "Deleted At", dataIndex: "deletedAt", key: "deletedAt" },
    // {
    //   title: "Is Active",
    //   dataIndex: "isActive",
    //   key: "isActive",
    //   editable: true,
    //   render: (value: boolean, record: object, index: number) => {
    //     const typedRecord = record as DataType;
    //     const { id, isActive } = typedRecord;
    //     const editable = isEditing(typedRecord);
    //     return editable ? (
    //       <Checkbox
    //         checked={value}
    //         onChange={() => handleCheckboxChange(id as number)}
    //       />
    //     ) : (
    //       <div className="cursor-not-allowed">
    //         <Checkbox checked={value} />
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: "20%",
      render: (text: string, record: object) => {
        const typedRecord = record as DataType;
        const { id, isActive } = typedRecord;
        const editable = isEditing(typedRecord);

        return editable ? (
          <span>
            <Typography.Link
              style={{
                marginRight: 8,
              }}
            >
              <button
                onClick={() => save(typedRecord)}
                style={{
                  cursor: "pointer",
                  padding: "0 8px",
                }}
              >
                Save
              </button>
            </Typography.Link>
            <Popconfirm title="Are you sure?" onConfirm={cancel}>
              <button
                style={{
                  cursor: "pointer",
                  padding: "0 2px",
                }}
              >
                Cancel
              </button>
            </Popconfirm>
          </span>
        ) : (
          <Row>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(typedRecord)}
            >
              <button
                style={{
                  cursor: "pointer",
                  padding: "0 10px",
                  background: "danger",
                }}
              >
                Edit
              </button>
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => deleteProduct(typedRecord)}
            >
              <button
                style={{
                  cursor: "pointer",
                  padding: "0 10px",
                  background: "danger",
                }}
              >
                Delete
              </button>
            </Typography.Link>
          </Row>
        );
      },
    },
  ];

  // const handleCheckboxChange = (key: number) => {
  //   const newData = [...dataSource];

  //   const index = newData.findIndex((item) => key === item.id);
  //   if (index > -1) {
  //     const item = newData[index];
  //     newData.splice(index, 1, {
  //       ...item,
  //       isActive: !item.isActive,
  //     });
  //     setDataSource(newData);
  //   }
  // };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
  };

  const [OpenProductModal, setOpenProductModal] = React.useState(false);

  const handleOpenProductModal = () => {
    // if (typeof window != "undefined" && window.document) {
    //   document.body.style.overflow = "hidden";
    //   document.body.style.pointerEvents = "none";
    // }
    setOpenProductModal(true);
  };

  const handleCloseProductModal = () => {
    // document.body.style.overflow = "unset";
    // document.body.style.pointerEvents = "auto";
    setOpenProductModal(false);
  };

  const onCreateProduct = async () => {
    const values = await forms.validateFields();

    try {
      dispatch(
        createProductAction({
          name: values.name,
          description: values.description,
          categoryId: values.category,
        })
      );

      handleCloseProductModal();
      forms.resetFields();
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <ShopLayout>
      <div className="h-full w-full min-w-[1200px] overflow-x-auto  my-4 p-4 space-y-4">
        <DrawerHeader />
        <div className="flex items-baseline container w-4/5 mx-auto justify-between border-b border-gray-200">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Product
          </h1>
          <div className="flex items-center">
            {/* <Search
              allowClear
              placeholder="input search text with name"
              onSearch={onSearch}
              enterButton={<span className="">Create</span>}
              style={{
                width: 400,
                borderColor: "blue",
                boxShadow: "none",
              }}
              className="hover:border-red-500 hover:shadow-none"
            /> */}
          </div>
          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <div className="space-x-6">
                <button
                  type="button"
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  id="menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={handleOpenProductModal}
                >
                  <span>Product</span>
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
          <Form form={forms} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={dataSource}
              columns={mergedColumns as ColumnTypes}
            />
          </Form>
        </React.Fragment>
        <Modal
          style={{
            color: "black",
          }}
          open={OpenProductModal}
          onOk={handleCloseProductModal}
          onCancel={handleCloseProductModal}
          centered
          footer={[
            <Button key="back" onClick={handleCloseProductModal}>
              Close
            </Button>,
            <Button key="submit" onClick={onCreateProduct}>
              Add
            </Button>,
          ]}
        >
          <div>
            <h1 className="my-4 text-base font-medium">Add New Product</h1>
            <Form
              validateMessages={validateMessages}
              name="form-name"
              form={forms}
              onFinish={onCreateProduct}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <Form.Item name={"name"} rules={[{ required: true }]}>
                    <Input className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl" />
                  </Form.Item>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="description">description</label>
                  <Form.Item name={"description"} rules={[{ required: true }]}>
                    <Input className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl" />
                  </Form.Item>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="category">category</label>
                  <Form.Item name={"category"} rules={[{ required: true }]}>
                    <Select>
                      {category &&
                        category.map((item, idx) => (
                          <Select.Option key={idx} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </ShopLayout>
  );
}
