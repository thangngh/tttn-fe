import { DrawerHeader } from "@/components/mui/CustomSideBar";
import { EditableCell } from "@/components/table/table-edit.cell";
import { ColumnTypes } from "@/components/table/table-type";
import AdminLayout from "@/layouts/AdminLayout";
import { getAllUserAction } from "@/redux/action/user.action";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { Form, Table, Checkbox, Input, Button } from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useRef } from "react";

interface DataType {
  id?: string;
  gender?: string;
  name?: string;
  address?: any;
  phone?: string;
  username: string;
  email?: string;
  createAt?: Date;
  isActive: boolean;
  role: any;
}

const PAGE_SIZE = 10;

const UserList = () => {
  const [editingKey, setEditingKey] = React.useState<string>("");
  const router = useRouter();
  const [forms] = Form.useForm();
  const dispatch = useAppDispatch();
  const listUser = useAppSelector(
    (state: RootState) => state.userReducer.listUser
  );
  const { Search } = Input;
  const [open, setOpen] = React.useState(false);
  const [dataSource, setDataSource] = React.useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const roleRef = useRef("");
  const handleOpen = () => setOpen(true);

  const onPageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      dispatch(
        getAllUserAction({
          page: currentPage,
          limit: PAGE_SIZE,
          //   role: roleRef.current,
        })
      );
    },
    [currentPage, dispatch]
  );

  const onSearch = (value: string) => console.log(value);

  React.useEffect(() => {
    dispatch(
      getAllUserAction({
        page: currentPage,
        limit: PAGE_SIZE,
        // role: roleRef.current,
      })
    );
  }, [currentPage, dispatch]);

  React.useEffect(() => {
    if (!Array.isArray(listUser.results)) return;
    const listData: DataType[] = [];
    listUser.results.forEach((item) => {
      listData.push({
        id: item.id,
        name: `${item.firstName} ${item.lastName}`,
        gender: item.gender,
        address: item.address,
        phone: item.phone,
        email: item.email,
        createAt: item.createAt,
        isActive: item.isActive,
        role: item?.role?.name,
        username: item.username,
      });
    });
    setDataSource(listData);
  }, [listUser]);

  const handleClose = () => {
    forms.resetFields();
    setOpen(false);
  };

  const isEditing = (record: DataType) => record.id === editingKey;

  const edit = (record: DataType) => {
    forms.setFieldsValue({
      name: "",
      ...record,
    });
    setEditingKey(record.id as string);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const columns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "NAME", dataIndex: "name", key: "name", editable: true },
    {
      title: "USER NAME",
      dataIndex: "username",
      key: "username",
      editable: true,
    },
    { title: "PHONE", dataIndex: "phone", key: "phone", editable: true },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      editable: true,
    },
    { title: "GENDER", dataIndex: "gender", key: "gender", editable: true },
    { title: "ROLE", dataIndex: "role", key: "role", editable: true },
    {
      title: "CREATE AT",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (value: boolean, record: object, index: number) => {
        const typedRecord = record as DataType;
        const { id, isActive } = typedRecord;
        const editable = isEditing(typedRecord);
        return editable ? (
          <Checkbox
            checked={value}
            //   onChange={() => handleCheckboxChange(id as number)}
          />
        ) : (
          <div className="cursor-not-allowed">
            <Checkbox checked={value} />
          </div>
        );
      },
    },
  ];

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
      email: "${label} is not a valid email!",
    },
  };

  return (
    <AdminLayout>
      <div className="h-full w-full min-w-[1200px] overflow-x-auto  my-4 p-4 space-y-4">
        <DrawerHeader />
        <div className="flex items-baseline justify-between border-b border-gray-200">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            User
          </h1>
          <div className="flex items-center">
            <Search
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
            />
          </div>
          {/* <div className="flex items-center">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  id="menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  Sort
                  <svg
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="font-medium text-gray-900 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    Most Popular
                  </a>

                  <a
                    href="#"
                    className="text-gray-500 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                  >
                    Best Rating
                  </a>

                  <a
                    href="#"
                    className="text-gray-500 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-2"
                  >
                    Newest
                  </a>

                  <a
                    href="#"
                    className="text-gray-500 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-3"
                  >
                    Price: Low to High
                  </a>

                  <a
                    href="#"
                    className="text-gray-500 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-4"
                  >
                    Price: High to Low
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="flex space-x-2">
          <button className="px-3 py-2 bg-gray-100 rounded-md shadow-md">
            All
          </button>
          <button className="px-3 py-2 bg-gray-100 rounded-md shadow-md">
            Active
          </button>
          <button className="px-3 py-2 bg-gray-100 rounded-md shadow-md">
            Completed
          </button>
        </div> */}
        <React.Fragment>
          <Form form={forms} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              pagination={{
                onChange: onPageChange,
                current: currentPage,
                pageSize: PAGE_SIZE,
                defaultPageSize: PAGE_SIZE,
                total: listUser.total,
              }}
              bordered
              dataSource={dataSource}
              columns={mergedColumns as ColumnTypes}
            />
          </Form>
        </React.Fragment>
      </div>
    </AdminLayout>
  );
};

export default UserList;
