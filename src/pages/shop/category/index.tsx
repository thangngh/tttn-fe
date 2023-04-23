import { DrawerHeader } from "@/components/mui/CustomSideBar";
import { EditableCell } from "@/components/table/table-edit.cell";
import { ColumnTypes } from "@/components/table/table-type";
import ShopLayout from "@/layouts/ShopLayout";
import {
  createCategoryAction,
  getAllCategoryByShopAction,
  updateCategoryAction,
} from "@/redux/action/category.action";
import { getShopByUserAction } from "@/redux/action/shop.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

interface DataType {
  id: string;
  name?: string;
  shopId?: number;
  shopName?: string;
  isActive?: boolean;
  createAt?: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export default function Category() {
  const [editingKey, setEditingKey] = React.useState<string>("");
  const [searchKey, setSearchKey] = React.useState("");
  const router = useRouter();
  const [forms] = Form.useForm();
  const { TextArea } = Input;
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const [openCategoryModal, setOpenCategoryModal] = React.useState(false);

  const handleOpenCategoryModal = () => {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    }
    setOpenCategoryModal(true);
  };
  const handleCloseCategoryModal = () => {
    document.body.style.overflow = "unset";
    document.body.style.pointerEvents = "auto";
    setOpenCategoryModal(false);
  };

  const shopId = useAppSelector((state: RootState) => state.shopReducer.shopId);

  const listCategoryWithShop = useAppSelector(
    (state: RootState) => state.categoryReducer.category
  );

  React.useEffect(() => {
    dispatch(getShopByUserAction());
  }, []);

  React.useEffect(() => {
    dispatch(getAllCategoryByShopAction());
  }, []);

  React.useEffect(() => {
    if (!Array.isArray(listCategoryWithShop)) return;
    const listData: DataType[] = [];
    listCategoryWithShop.forEach((item) => {
      listData.push({
        id: item?.id.toString(),
        name: item?.name,
        shopName: (item as any)?.shop?.name,
        createAt: item?.createAt,
        modifiedAt: item?.modifiedAt,
      });
    });
    setDataSource(listData);
  }, [listCategoryWithShop]);

  const isEditing = (record: DataType) => record?.id === editingKey;

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: DataType) => {
    const row = await forms.validateFields();
    try {
      dispatch(
        updateCategoryAction({
          id: +key.id,
          name: row?.name,
          modifiedAt: new Date(),
        })
      );
      setEditingKey("");
    } catch (error: any) {
      toast.error(error);
    }
  };

  const edit = (record: DataType) => {
    console.log("record edit ", record);
    forms.setFieldsValue({
      name: "",
      ...record,
    });
    setEditingKey(record?.id);
  };

  const columns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    { title: "Name", dataIndex: "name", key: "name", editable: true },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      key: "shopName",
    },
    {
      title: "Created At",
      dataIndex: "createAt",
      key: "createAt",
      ellipsis: { showTitle: true },
    },
    { title: "Modified At", dataIndex: "modifiedAt", key: "modifiedAt" },
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
        );
      },
    },
  ];

  const onCreateCategory = async () => {
    try {
      const values = await forms.validateFields();

      dispatch(
        createCategoryAction({
          ...values,
          shopId,
        })
      );
      handleCloseCategoryModal();
      forms.resetFields();
    } catch (error) {
      toast.error("Failed to Create Category");
    }
  };

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

  return (
    <ShopLayout>
      <div className="h-full w-full min-w-[1200px] overflow-x-auto  my-4 p-4 space-y-4">
        <DrawerHeader />
        <div className="flex items-baseline container justify-between border-b border-gray-200">
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
                  onClick={handleOpenCategoryModal}
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
          open={openCategoryModal}
          onOk={handleCloseCategoryModal}
          onCancel={handleCloseCategoryModal}
          centered
          footer={[
            <Button key="back" onClick={handleCloseCategoryModal}>
              Close
            </Button>,
            <Button key="submit" onClick={onCreateCategory}>
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
              onFinish={onCreateCategory}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <Form.Item name={"name"} rules={[{ required: true }]}>
                    <Input className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none transition duration-300 border border-gray-300 focus:shadow-xl" />
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
