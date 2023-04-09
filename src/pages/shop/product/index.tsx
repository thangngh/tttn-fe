import { DrawerHeader } from "@/components/mui/CustomSideBar";
import { EditableCell } from "@/components/table/table-edit.cell";
import { ColumnTypes } from "@/components/table/table-type";
import ShopLayout from "@/layouts/ShopLayout";
import { Form, Input, Checkbox, Table, Typography, Popconfirm } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface DataType {
  id?: number;
  name?: string;
  description?: string;
  categoryId?: string;
  discountId?: string;
  createAt?: string;
  modifiedAt?: string;
  deletedAt?: string;
  isActive: boolean;
}

const mockData: DataType[] = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    categoryId: "1",
    discountId: "1",
    createAt: new Date().toString(),
    modifiedAt: new Date().toString(),
    deletedAt: new Date().toString(),
    isActive: true,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description 2",
    categoryId: "2",
    discountId: "2",
    createAt: new Date().toString(),
    modifiedAt: new Date().toString(),
    isActive: true,
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description 3",
    categoryId: "3",
    discountId: "3",
    createAt: new Date().toString(),
    modifiedAt: new Date().toString(),
    deletedAt: new Date().toString(),
    isActive: true,
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description 4",
    categoryId: "4",
    discountId: "4",
    createAt: new Date().toString(),
    modifiedAt: new Date().toString(),
    deletedAt: new Date().toString(),
    isActive: true,
  },
];

export default function Product() {
  const [editingKey, setEditingKey] = React.useState<string>("");
  const [searchKey, setSearchKey] = React.useState("");
  const router = useRouter();
  const [forms] = Form.useForm();
  const { TextArea } = Input;

  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    forms.resetFields();
    setOpen(false);
  };

  React.useEffect(() => {
    setDataSource(mockData);
  }, []);

  const isEditing = (record: DataType) => record?.id?.toString() === editingKey;

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: DataType) => {
    const row = await forms.validateFields();
  };

  const edit = (record: DataType) => {};

  const columns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      editable: false,
      render: (text) => <a>{text}</a>,
    },
    { title: "Name", dataIndex: "name", key: "name", editable: true },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "Category Id",
      dataIndex: "categoryId",
      key: "categoryId",
      editable: true,
    },
    {
      title: "Discount Id",
      dataIndex: "discountId",
      key: "discountId",
      editable: true,
    },
    { title: "Created At", dataIndex: "createAt", key: "createAt" },
    { title: "Modified At", dataIndex: "modifiedAt", key: "modifiedAt" },
    { title: "Deleted At", dataIndex: "deletedAt", key: "deletedAt" },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      editable: true,
      render: (value: boolean, record: object, index: number) => {
        const typedRecord = record as DataType;
        const { id, isActive } = typedRecord;
        const editable = isEditing(typedRecord);
        return editable ? (
          <Checkbox
            checked={value}
            onChange={() => handleCheckboxChange(id as number)}
          />
        ) : (
          <div className="cursor-not-allowed">
            <Checkbox checked={value} />
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: "20%",
      render: (record: DataType) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link
              style={{
                marginRight: 8,
              }}
            >
              <button
                onClick={() => save(record)}
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
            onClick={() => edit(record)}
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

  const handleCheckboxChange = (key: number) => {
    const newData = [...dataSource];

    const index = newData.findIndex((item) => key === item.id);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        isActive: !item.isActive,
      });
      setDataSource(newData);
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
      <div className="h-full  w-full   overflow-x-auto  my-4 p-4">
        <DrawerHeader />
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
      </div>
    </ShopLayout>
  );
}
